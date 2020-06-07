import { configurePhotos } from '../../../rooms';
import bedroom1Full from './Bedroom-1.jpg';
import bedroom2Full from './Bedroom-2.jpg';
import bunkroom1Full from './Bunkroom-1.jpg';
import bunkroom2Full from './Bunkroom-2.jpg';

import * as thumbnails from './thumbnails';

export const bedroom1 = configurePhotos(bedroom1Full, thumbnails.bedroom1);
export const bedroom2 = configurePhotos(bedroom2Full, thumbnails.bedroom2);
export const bunkroom1 = configurePhotos(bunkroom1Full, thumbnails.bunkroom1);
export const bunkroom2 = configurePhotos(bunkroom2Full, thumbnails.bunkroom2);
