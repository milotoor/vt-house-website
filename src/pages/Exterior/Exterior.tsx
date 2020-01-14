import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Typography } from 'antd';
import images from './img';
import './Exterior.less';


const { Paragraph } = Typography;

// ============================ Components ====================================
const Exterior: React.FC = () =>
  <div>
    <ImageGallery
      items={galleryImages}
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
    />

    <Typography>
      <Paragraph>
        The house is nestled among the trees on a gently sloping hillside with expansive views of Lake Champlain. The property is about three acres with 400 feet or so of rocky beach located at the end of a private road shared by only eight other houses.
      </Paragraph>

      <Paragraph>
        A large deck off the kitchen and screened porch has ample space for relaxation, reading and sunning. A deck runs the length of the house on the second floor as well with access from all rooms on the lake side of the house. The large meadow next to the house is ideal for baseball, bocce and has even been used for a family golf putting tournament!
      </Paragraph>

      <Paragraph>
        Water activities are many. Several kayaks, a canoe and other water toys are available for use. Motorized boats can be rented from nearby marinas and parked in the boat lift attached to the dock. Or you can bring your own boat (up to 4,000 lbs.), launch it at one of several nearby public launch ramps and store it on our boat lift. A swim float is anchored offshore – the perfect perch for a rest from swimming. The shoreline is shale, not sand so water shoes are a good idea. Both life vests for boat activities and a collection of water shoes can be found on the screened porch and garage.
      </Paragraph>
    </Typography>
  </div>

// ============================ Info ==========================================
const galleryImages = [
  images.backyardFallLeaves,
  images.outdoorTwilight,
  images.lakeKayaks1,
  images.snowWalk,
  images.lakeKayaks2
].map(formatImage);

// ============================ Helpers =======================================
/**
 * Formats the image paths in the form that `react-image-gallery` wants them
 * 
 * @param image the URI of the image
 */
function formatImage (image: string) {
  return {
    original: image
  };
}

// ============================ Exports =======================================
export default Exterior;
