import "./Search.css";
import { FC, useState, useEffect, useCallback } from "react";
import { Form } from "../../Components/Form/Form";
import { ImagesWrapper } from "../../Components/ImagesWrapper/ImagesWrapper";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../Hooks/useInput";
import { useThemeContext } from "../../Context/theme-context";
import { useNotification } from "../../Hooks/useNotification";
import { searchImages } from "../../Services/apicalls";
import { type ImageDataFE } from "../../Services/apicalls-mapper";
import { validateName } from "../../Services/validate";
import { ImageCard } from "../../Components/ImageCard/ImageCard";
import { Callout } from "../../Components/Callout/Callout";
import { IconSearch } from "../../Components/Icons/Icons";


export const Search: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { showErrorNotification } = useNotification();

  const [images, setImages] = useState<ImageDataFE[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: query,
    isValid: queryIsValid,
    hasError: queryHasError,
    changeHandler: queryChangeHandler,
    blurHandler: queryBlurHandler,
    reset: queryReset } = useInput(validateName); //todo change validate

  const fetchSearchImages = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setImages(await searchImages(query));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      showErrorNotification({
        title: "Http requests to load search images failing",
        message: "You have reached the limit of 50 requests/hour",
      });
    }
  }, [showErrorNotification])

  useEffect(() => {
    //executes when the user stops writing 2 seconds
    const timer = setTimeout(() => {
      if (queryIsValid) {
        fetchSearchImages(query);
        queryReset();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [fetchSearchImages, query, queryIsValid, queryReset]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchSearchImages(query);
    queryReset();
  }

  return (
    <main className="search">
      <div className="search-input-wrapper">
        <Form direction="row" onSubmit={submitHandler}>
          <Form.Input
            type="text"
            id="query"
            value={query}
            onChange={queryChangeHandler}
            onBlur={queryBlurHandler}
            hasError={queryHasError}
            errorText="Numbers and some special characters not allowed"
          />
          <Form.Submit disabled={!queryIsValid}>
            <IconSearch size={22}/>
          </Form.Submit>
        </Form>
        <Callout to="/image-creator" textLink="Generate your own image">
          Can't find what you're looking for?
        </Callout>
      </div>
      <ImagesWrapper>
        {isLoading && <p>Loading....</p>}
        {(images !== null) && !isLoading && (
          <div>
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </ImagesWrapper>
    </main>
  );
};