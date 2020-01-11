// CRA allows importing image files, which converts them to URLs. If the image is less than 10kb,
// the URL will be a data URI (i.e. the entire data contents of the image, not a path to the file
// on the server). See https://create-react-app.dev/docs/adding-images-fonts-and-files/.
import backyardFallLeaves from './full/backyard_fall_leaves.jpg';
import lakeKayaks1 from './full/lake_kayaks_1.jpg';
import lakeKayaks2 from './full/lake_kayaks_2.jpg';
import outdoorTwilight1 from './full/outdoor_twilight_1.jpg';
import outdoorTwilight2 from './full/outdoor_twilight_2.jpg';
import snowWalk from './full/snow_walk.jpg';

export default {
  backyardFallLeaves,
  lakeKayaks1,
  lakeKayaks2,
  outdoorTwilight1,
  outdoorTwilight2,
  snowWalk
};
