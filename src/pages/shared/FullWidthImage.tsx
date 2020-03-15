import React from 'react';


// ============================ Types =========================================
export type ImageProps = {
  alt: string
  src: string
};

// ============================ Components ====================================
/**
 * Super basic component that just provides a class name to an image
 */
export const FullWidthImage: React.FC<ImageProps> = ({ alt, src }) =>
  <img alt={alt} src={src} className="full-width-image" />

// ============================ Helpers =======================================
export const makeImage = (src: string, alt: string) => ({ src, alt });
