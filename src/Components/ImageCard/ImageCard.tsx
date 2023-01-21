import React from 'react';
import './ImageCard.css';
import { Badge } from '../Badge/Badge';

interface ImageCardProps {
  image: {
    id: string;
    url: string;
    description: string;
    altDescription: string;
    tags: string[];
  };
  onClick: ()=>void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <li className="image-card" onClick={onClick}>
      <img src={image.url} alt={image.description ?? image.altDescription} />
      <div className="image-card__tags">
        {image.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </li>
  );
};
