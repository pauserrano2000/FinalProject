import "./ImageDetail.css";
import { FC, useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Badge } from "../../Components/Badge/Badge";
import { useThemeContext } from "../../Context/theme-context";
import { useNavigate } from "react-router-dom";
import { useSelectedImage } from "../Search/Search";
import { IconHeart, IconDownload } from "../../Components/Icons/Icons";
import { useNotification } from "../../Hooks/useNotification";

export const ImageDetail: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate()
  const { selectedImage } = useSelectedImage();
  const { showSuccesNotification } = useNotification();

  const [isFavorited, setIsFavorited] = useState(false);

  const favoriteHandler = () => {
    setIsFavorited((prevState) => !isFavorited);
    if (isFavorited) {
      showSuccesNotification({
        title: "Image removed from your favorites",
        message: "You can check it in the favorites section",
      });
    } else {
      showSuccesNotification({
        title: "Image added to your favorites",
        message: "You can check it in the favorites section",
      });
    }
  }

  const downloadHandler = () => {
    window.location.assign(selectedImage.url + "&dl");
  }

  return (
    <Modal onClose={() => navigate("/search")}>
      <main className="image-detail">
        <img
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