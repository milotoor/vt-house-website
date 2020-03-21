import * as React from 'react';
import { Carousel, Typography } from 'antd';
import * as images from './img';
import { FullWidthImage, ImageProps, PagePadder } from '../shared';
import './Exterior.less';


const { Paragraph } = Typography;

/** ======================== Types ========================================= */
type CarouselPaneProps = {
  image: ImageProps
};

/** ======================== Components ==================================== */
const CarouselPane: React.FC<CarouselPaneProps> = ({ children, image }) =>
  <div className="carousel-pane">
    <FullWidthImage {...image} />
    <div className="pane-text">{children}</div>
  </div>;

const Exterior: React.FC = () =>
  <div>
    <Carousel dotPosition="top" autoplay autoplaySpeed={10000}>
      <CarouselPane image={images.backyardFallLeaves}>
        The house is nestled among the trees on a gently sloping hillside with expansive views of Lake Champlain
      </CarouselPane>

      <CarouselPane image={images.outdoorTwilight}>
        Dusk is the best time for spotting wildlife. Deer, rabbits— even bald eagles have been spotted!
      </CarouselPane>

      <CarouselPane image={images.lakeKayaks1}>
        Several kayaks, a canoe and other water toys are available for use. Motorized boats can be rented from nearby marinas and parked in the boat lift— or bring your own!
      </CarouselPane>

      <CarouselPane image={images.snowWalk}>
        Snowy walks are a wonderful way to experience the quiet winter landscape. Warm yourself by the fireplace upon your return.
      </CarouselPane>

      <CarouselPane image={images.lakeKayaks2}>
        A swim float is anchored offshore— the perfect perch for a rest from swimming. The shoreline is shale, not sand so water shoes are a good idea.
      </CarouselPane>
    </Carousel>

    <PagePadder>
      <Typography>
        <Paragraph>
          A large deck off the kitchen and screened porch has ample space for relaxation, reading and sunning. A deck runs the length of the house on the second floor as well with access from all rooms on the lake side of the house. The large meadow next to the house is ideal for baseball, bocce and has even been used for a family golf putting tournament!
        </Paragraph>
      </Typography>
    </PagePadder>
  </div>;

/** ======================== Exports ======================================= */
export default Exterior;
