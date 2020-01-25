// CRA allows importing image files, which converts them to URLs. If the image is less than 10kb,
// the URL will be a data URI (i.e. the entire data contents of the image, not a path to the file
// on the server). See https://create-react-app.dev/docs/adding-images-fonts-and-files/.
import bedroom from './resized/bedroom.jpg';
import houseFront from './resized/house_front.jpg';
import kitchen from './resized/kitchen.jpg';
import lakeSailboats from './resized/lake_sailboats.jpg';
import twilight from './resized/twilight.jpg';
import winterSnow from './resized/winter_snow.jpg';

export default {
  bedroom,
  houseFront,
  kitchen,
  lakeSailboats,
  twilight,
  winterSnow
};
