import "./Favorites.css";
import React, { FC, useState, useEffect } from "react";
import { ImagesWrapper } from "../../Components/ImagesWrapper/ImagesWrapper";
import { useNavigate, Outlet} from "react-router-dom";
import { useThemeContext } from "../../Context/theme-context";
import { useUserContext } from "../../Context/user-context";
import { type ImageDataFE } from "../../Services/apicalls-mapper";
import { ImageCard } from "../../Components/ImageCard/ImageCard";
import { Loading } from "../../Components/Loading/Loading";


export const Favorites: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const { favorites, firstName } = useUserContext();
  const [selectedImage, setSelectedImage] = useState<null | ImageDataFE>(null);

  const [isLoading, setIsLoading] = useState(false);
  const totalFavorites = favorites.length;
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 150); //Little delay (design decision)
  }, [favorites]);

  const clickImageHandler = (image: ImageDataFE) => {
    setSelectedImage(image);
    navigate(`/favorites/${image.id}`);
  }

  return (
    <main className="favorites">
      <div className={`favorites__top ${theme}-favorites__top`}>
        <h1 className="favorites__h1">
          Welcome {firstName}, your favorited images will appear here
        </h1>
        <div className="favorites__info">
          {!isLoading && favorites.length !== 0 && (
            <p className={`favorites__info__p ${theme}-favorites__info__p`}>
              Total favorites: {totalFavorites} images
            </p>
          )}
        </div>
      </div>
      {isLoading && <Loading />}
      {favorites.length === 0 &&
        <p className={`favorites__not-found ${theme}-favorites__not-found`}>
          There's no favorite images yet
        </p>}
      {!isLoading && favorites.length !== 0 && (
        <ImagesWrapper>
          {favorites.map((image) => (
            <ImageCard
              key={image.id}
              image={image} 
              onClickImage={clickImageHandler}
            />
          ))}
        </ImagesWrapper>
      )}
      <Outlet context={{selectedImage}}/>
    </main>
  );
};