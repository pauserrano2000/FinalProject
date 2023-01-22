import "./ImageDetail.css";
import { FC } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { Badge } from "../../Components/Badge/Badge";
import { useThemeContext } from "../../Context/theme-context";
import { useNavigate } from "react-router-dom";
import { useSelectedImage } from "../Search/Search";
import { IconHeart, IconDownload } from "../../Components/Icons/Icons";

export const ImageDetail: FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate()
  const { selectedImage } = useSelectedImage();

  return (
    <Modal onClose={() => navigate("/search")}>
      <main className="image-detail">
        <img src={selectedImage.url} alt={selectedImage.description ?? selectedImage.altDescription} />
        <div className="image-detail__buttons">
          <button className="image-detail__favorite">
            <IconHeart size={60} />
          </button>
          <button className="image-detail__download">
            <IconDownload size={60} />
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