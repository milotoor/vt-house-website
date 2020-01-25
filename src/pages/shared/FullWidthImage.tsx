import React from 'react';


export type ImageProps = {
  alt: string
  src: string
};

/**
 * Super basic component that just provides a class name to an image
 */
const Image: React.FC<ImageProps> = ({ alt, src }) =>
  <img alt={alt} src={src} className="full-width-image" />

export default Image;
