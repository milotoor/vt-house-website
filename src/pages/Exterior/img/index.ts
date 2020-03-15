import { makeImage } from '../../shared';

// CRA allows importing image files, which converts them to URLs. If the image is less than 10kb,
// the URL will be a data URI (i.e. the entire data contents of the image, not a path to the file
// on the server). See https://create-react-app.dev/docs/adding-images-fonts-and-files/.
import backyardFallLeavesImg from './full/backyard_fall_leaves.jpg';
import lakeKayaks1Img from './full/lake_kayaks_1.jpg';
import lakeKayaks2Img from './full/lake_kayaks_2.jpg';
import outdoorTwilightImg from './full/outdoor_twilight.jpg';
import snowWalkImg from './full/snow_walk.jpg';


export const backyardFallLeaves = makeImage(
  backyardFallLeavesImg,
  'The rear of the house from the bottom of the hill in Fall when golden, red and orange leaves litter the ground'
);

export const lakeKayaks1 = makeImage(
  lakeKayaks1Img,
  'Family members paddle away from the house\'s lakeshore in two kayaks and a canoe'
);

export const lakeKayaks2 = makeImage(
  lakeKayaks2Img,
  'Kids and dogs hang out on the lakeshore with several kayaks and a canoe'
);

export const outdoorTwilight = makeImage(
  outdoorTwilightImg,
  'The front of the house illuminated by lights during early twilight'
);

export const snowWalk = makeImage(
  snowWalkImg,
  'Family members go for a stroll on Grand Isle in the middle of winter with dogs and mittens'
);
