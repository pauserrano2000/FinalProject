import React from 'react';
import './ImageCard.css';
import { Badge } from '../Badge/Badge';
import { type ImageDataFE } from '../../Services/apicalls-mapper';

interface ImageCardProps {
  image: {
    id: string;
    url: string;
    description: string;
    altDescription: string;
    tags: string[];
  };
  onClickImage: (image: ImageDataFE) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClickImage }) => {
  return (
    <li className="image-card" onClick={(e) => onClickImage(image)}>
      <img src={image.url} alt={image.description ?? image.altDescription} />
      <div className="image-card__tags">
        {image.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </li>
  );
};
