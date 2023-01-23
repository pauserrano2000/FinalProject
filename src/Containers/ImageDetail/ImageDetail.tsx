import "./ImageDetail.css";
import { FC, useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Badge } from "../../Components/Badge/Badge";
import { useAuthContext } from "../../Context/auth-context";
import { useUserContext } from "../../Context/user-context";
import { useNavigate, useOutletContext } from "react-router-dom";
import { type ImageDataFE } from "../../Services/apicalls-mapper";
import { IconHeart, IconDownload } from "../../Components/Icons/Icons";
import { useNotification } from "../../Hooks/useNotification";
import { updateFavorites, type UpdateFavoritesData } from "../../Services/apicalls";


export const ImageDetail: FC= () => {
  const { token } = useAuthContext();
  const { favorites, resetUserData } = useUserContext();
  const { selectedImage } = useOutletContext<{selectedImage: ImageDataFE}>();
  const navigate = useNavigate()
  const { showSuccesNotification, showErrorNotification } = useNotification();

  const [isFavorited, setIsFavorited] = useState(favorites.some(image => image.id === selectedImage.id));

  const favoriteHandler = async () => {
    const update: UpdateFavoritesData = {
      favorites: isFavorited
        ?
        favorites.filter(image => image.id !== selectedImage.id)
        :
        [...favorites, selectedImage]
    }
    setIsFavorited((prevState) => !isFavorited);
    if (isFavorited) {
      try {
        await updateFavorites(token!, update);
        resetUserData(); //todo changeeee
        showSuccesNotification({
          title: "Image removed from your favorites",
          message: "You can check it in the favorites section",
        });
      } catch (error) {
        console.log(error);
        showErrorNotification({
          title: "The server is not working, http requests failing",
          message: "The admin should check this...",
        });
      }
    } else {
      try {
        await updateFavorites(token!, update);
        resetUserData(); //todo changeeee
        showSuccesNotification({
          title: "Image added to your favorites",
          message: "You can check it in the favorites section",
        });
      } catch (error) {
        console.log(error);
        showErrorNotification({
          title: "The server is not working, http requests failing",
          message: "The admin should check this...",
        });
      }
    }
  }

  const downloadHandler = async () => {
    const response = await fetch(selectedImage.url, { mode: 'no-cors' }); //last resort to avoid cors policy openai api blocking the request
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedImage.description}.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <Modal onClose={() => navigate(-1)}>
      <main className="image-detail">
        <img className="image-detail__image"
          src={selectedImage.url + "&fm=jpg&q=80&w=1240&h=874&fit=max"}
          alt={selectedImage.description ?? selectedImage.altDescription}
        />
        <div className="image-detail__buttons">
          <button onClick={favoriteHandler} className="image-detail__favorite">
            <IconHeart
              color="red"
              size={70}
              stroke={1.5}
              fill={isFavorited ? "red" : "none"}
            />
          </button>
          <button onClick={downloadHandler} className="image-detail__download">
            <IconDownload color="white" size={70} stroke={1.5} />
          </button>
        </div>
        <div className="image-detail__info">
          <p className="image-detail__description">
            {selectedImage.description ?? selectedImage.altDescription}
          </p>
          <div className="image-detail__tags">
            {selectedImage.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </main>
    </Modal>
  );
};