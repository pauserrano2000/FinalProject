import "./ImageGeneration.css";
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


export const ImageGeneration: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const { showErrorNotification } = useNotification();

  const [images, setImages] = useState<ImageDataFE[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const prompt = useInput(validateName); //todo change validate

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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchSearchImages(prompt.value);
    prompt.reset();
  }

  return (
    <main className="image-generation">
      <div className="image-generation-input-wrapper">
        <Form onSubmit={submitHandler}>
          <Form.Input
            type="text"
            id="prompt"
            value={prompt.value}
            onChange={prompt.changeHandler}
            onBlur={prompt.blurHandler}
            hasError={prompt.hasError}
            errorText="Numbers and some special characters not allowed"
          />
          <Form.Submit
            disabled={!prompt.isValid}
            text="Generate"
          />
        </Form>
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