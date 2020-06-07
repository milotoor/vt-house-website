import { configurePhotos } from '../../../rooms';
import bedroom1Full from './Bedroom-1.jpg';
import bedroom2Full from './Bedroom-2.jpg';
import bedroom3Full from './Bedroom-3.jpg';
import deck1Full from './Deck-1.jpg';
import deck2Full from './Deck-2.jpg';
import dining1Full from './Dining-1.jpg';
import dining2Full from './Dining-2.jpg';
import kitchen1Full from './Kitchen-1.jpg';
import kitchen2Full from './Kitchen-2.jpg';
import living1Full from './Living-1.jpg';
import living2Full from './Living-2.jpg';
import porchFull from './Porch.jpg';

import * as thumbnails from './thumbnails';

export const bedroom1 = configurePhotos(bedroom1Full, thumbnails.bedroom1);
export const bedroom2 = configurePhotos(bedroom2Full, thumbnails.bedroom2);
export const bedroom3 = configurePhotos(bedroom3Full, thumbnails.bedroom3);
export const deck1 = configurePhotos(deck1Full, thumbnails.deck1);
export const deck2 = configurePhotos(deck2Full, thumbnails.deck2);
export const dining1 = configurePhotos(dining1Full, thumbnails.dining1);
export const dining2 = configurePhotos(dining2Full, thumbnails.dining2);
export const kitchen1 = configurePhotos(kitchen1Full, thumbnails.kitchen1);
export const kitchen2 = configurePhotos(kitchen2Full, thumbnails.kitchen2);
export const living1 = configurePhotos(living1Full, thumbnails.living1);
export const living2 = configurePhotos(living2Full, thumbnails.living2);
export const porch = configurePhotos(porchFull, thumbnails.porch);
