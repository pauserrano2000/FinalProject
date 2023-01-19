import React from 'react';
import './ImageCard.css';

interface Props {
  image: {
    id: string;
    url: string;
    description: string;
    altDescription: string;
    tags: string[];
  };
}

export const ImageCard: React.FC<Props> = ({ image }) => {
  return (
    <div className="image-card">
      <img src={image.url} alt={image.altDescription} />
      <p>{image.description}</p>
      <div className="tags">
        {image.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};
