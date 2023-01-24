import {FC} from 'react';
import './ImageCard.css';
import { Badge } from '../Badge/Badge';
import { type ImageDataFE } from '../../Services/apicalls-mapper';

type ImageCardProps = {
  image: {
    id: string;
    url: string;
    description: string;
    altDescription: string;
    tags: string[];
  };
  onClickImage: (image: ImageDataFE) => void;
}

export const ImageCard: FC<ImageCardProps> = ({ image, onClickImage }) => {
  
  return (
    <li className="image-card" onClick={(e) => onClickImage(image)}>
      <img height="350px" className="image-card__image" src={image.url + "&fm=jpg&q=80&h=350&fit=max"} alt={image.description ?? image.altDescription} />
      <div className="image-card__tags">
        {image.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </li>
  );
};
