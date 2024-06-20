import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

const ImageLoader = ({ URL, skeletonStyle, imgStyle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoaded(true);
    setImageError(true);
  };
  return (
    <>
      {!imageLoaded && <Skeleton circle className={skeletonStyle} />}
      <img
        src={URL}
        alt=""
        className={imgStyle}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
    </>
  );
};

export default ImageLoader;
