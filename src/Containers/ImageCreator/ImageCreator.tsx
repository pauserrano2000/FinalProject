import "./ImageCreator.css";
import { FC, useState, useEffect, useCallback } from "react";
import { Form } from "../../Components/Form/Form";
import { ImagesWrapper } from "../../Components/ImagesWrapper/ImagesWrapper";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useNotification } from "../../Hooks/useNotification";
import { searchImages } from "../../Services/apicalls";
import { type ImageDataFE } from "../../Services/apicalls-mapper";
import { validateSearch } from "../../Services/validate";
import { ImageCard } from "../../Components/ImageCard/ImageCard";
import { Callout } from "../../Components/Callout/Callout";
import { IconRocket } from "../../Components/Icons/Icons";


export const ImageCreator: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { showErrorNotification } = useNotification();

  const promptInput = useInput(validateSearch);
  const [prompt, setPrompt] = useState(""); //stores the query for pagination since queryInput.value is reset after submit
  const [images, setImages] = useState<null | ImageDataFE[]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [totalResults, setTotalResults] = useState<null | number>(null);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchImages = useCallback(async (prompt: string, currentPage: number, perPage: number) => {
    try {
      setIsLoading(true);
      const { total, pages, images: fetchedImages } = await searchImages(prompt, currentPage, perPage)
      setImages(fetchedImages);
      if (total !== totalResults) {
        setTotalResults(total);
      }
      if (pages !== totalPages) {
        setTotalPages(pages);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      showErrorNotification({
        title: "Http requests to load search images failing",
        message: "You have reached the limit of 50 requests/hour",
      });
    }
  }, [showErrorNotification, totalResults, totalPages])

  useEffect(() => {
    if (prompt) {
      fetchSearchImages(prompt, currentPage, perPage);
    }
  }, [fetchSearchImages, prompt, currentPage, perPage]);


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrompt(promptInput.value);
    fetchSearchImages(prompt, currentPage, perPage);
    promptInput.reset();
  }

  return (
    <main className="image-creator">
      <div className={`image-creator__form-wrapper ${theme}-image-creator__form-wrapper `}>
      <div className="image-creator__form">
        <Form direction="row" onSubmit={submitHandler}>
          <Form.Input
            type="text"
            id="prompt"
            value={promptInput.value}
            onChange={promptInput.changeHandler}
            onBlur={promptInput.blurHandler}
            hasError={promptInput.hasError}
            errorText="Numbers and some special characters not allowed"
          />
          <Form.Submit disabled={!promptInput.isValid}>
            <IconRocket size={22}/>
            Create
          </Form.Submit>
        </Form>
        <Callout to="/search" textLink="Search in our wide selection (+3.48 million images) ">
          Can't find what you're looking for?
        </Callout>
        </div>
        <div className="prompt__info">
          {!isLoading && images && (<>
            <p className={`prompt__info__p ${theme}-prompt__info__p `}>
              {images.length === 0 && `No results found for "${prompt}"`}
              {images.length !== 0 && `Total "${prompt}" results: ${totalResults} images`}
            </p>
          </>)}
        </div>
      </div>
      <ImagesWrapper>
        {isLoading && <p>Loading....</p>}
        {(images !== null) && !isLoading && (
          <div>
            {images.map((image) => (
              <ImageCard key={image.id} image={image} onClick={()=>console.log("h")} />
            ))}
          </div>
        )}
      </ImagesWrapper>
    </main>
  );
};