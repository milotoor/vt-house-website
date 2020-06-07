import { configurePhotos } from '../../../rooms';
import bedroom1Full from './Bedroom-1.jpg';
import bedroom2Full from './Bedroom-2.jpg';
import den1Full from './Den-1.jpg';
import den2Full from './Den-2.jpg';
import lakeside1Full from './Lakeside-1.jpg';
import lakeside2Full from './Lakeside-2.jpg';
import master1Full from './Master-1.jpg';
import master2Full from './Master-2.jpg';
import * as thumbnails from './thumbnails';

export const bedroom1 = configurePhotos(bedroom1Full, thumbnails.bedroom1);
export const bedroom2 = configurePhotos(bedroom2Full, thumbnails.bedroom2);
export const den1 = configurePhotos(den1Full, thumbnails.den1);
export const den2 = configurePhotos(den2Full, thumbnails.den2);
export const lakeside1 = configurePhotos(lakeside1Full, thumbnails.lakeside1);
export const lakeside2 = configurePhotos(lakeside2Full, thumbnails.lakeside2);
export const master1 = configurePhotos(master1Full, thumbnails.master1);
export const master2 = configurePhotos(master2Full, thumbnails.master2);
