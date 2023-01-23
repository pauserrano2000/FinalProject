import "./ImageCreator.css";
import { FC, useState } from "react";
import { Form } from "../../Components/Form/Form";
import { ImagesWrapper } from "../../Components/ImagesWrapper/ImagesWrapper";
import { useNavigate, Outlet } from "react-router-dom";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useNotification } from "../../Hooks/useNotification";
import { createImages } from "../../Services/apicalls";
import { type ImageDataFE } from "../../Services/apicalls-mapper";
import { validateSearch } from "../../Services/validate";
import { ImageCard } from "../../Components/ImageCard/ImageCard";
import { Callout } from "../../Components/Callout/Callout";
import { IconRocket } from "../../Components/Icons/Icons";
import { Loading } from "../../Components/Loading/Loading";


export const ImageCreator: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { showErrorNotification } = useNotification();

  const [images, setImages] = useState<null | ImageDataFE[]>(null);
  const [selectedImage, setSelectedImage] = useState<null | ImageDataFE>(null);
  const promptInput = useInput(validateSearch);
  const [prompt, setPrompt] = useState(""); //stores the query for pagination since queryInput.value is reset after submit

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchCreatedImages = async (prompt: string) => {

    setIsLoading(true);
    setImages(await createImages(prompt));
    setHasError(false);
    setIsLoading(false);

  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPrompt(promptInput.value);
    fetchCreatedImages(prompt);
    promptInput.reset();
  }

  const clickImageHandler = (image: ImageDataFE) => {
    setSelectedImage(image);
    navigate(`/image-creator/${image.id}`);
  }

  return (
    <main className="image-creator">
      <div className={`image-creator__top ${theme}-image-creator__top`}>
        <h1 className="image-creator__h1">
          Create custom images
        </h1>
        <div className="image-creator__form">
          <Form direction="row" onSubmit={submitHandler}>
            <Form.Input
              type="text"
              id="prompt"
              value={promptInput.value}
              placeholder="Introduce a detailed description of your desired image"
              onChange={promptInput.changeHandler}
              onBlur={promptInput.blurHandler}
              hasError={promptInput.hasError}
              errorText="Some special characters not allowed"
            />
            <Form.Submit disabled={!promptInput.isValid}>
              <IconRocket size={22} />
              Create
            </Form.Submit>
          </Form>
          <Callout to="/search" textLink="Search in our wide selection (+3.48 million images) ">
            Can't find what you're looking for?
          </Callout>
        </div>
        <div className="prompt__info">
          {!isLoading && images && (
            <p className={`prompt__info__p ${theme}-prompt__info__p `}>
              {images.length === 0 && `No results found for "${prompt}"`}
              {images.length !== 0 && `"${prompt}" results`}
            </p>
          )}
        </div>
      </div>
      {!hasError && isLoading && <Loading />}
      {hasError &&
        <p className={`prompt__not-found ${theme}-prompt__not-found`}>
          Http requests to load the generated image failing (check the api key)
        </p>}
      {!isLoading && images && (<>
        <ImagesWrapper>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              size="image-card__image__xl"
              onClickImage={clickImageHandler}
            />
          ))}
        </ImagesWrapper>
      </>
      )}
      <Outlet context={{ selectedImage }} />
    </main>
  );
};