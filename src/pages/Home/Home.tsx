import * as React from 'react';
import { Carousel, PageHeader } from 'antd';

import { FullWidthImage, Paragraph } from '../shared';
import images from './img';


/** ======================== Components ==================================== */
const Home: React.FC = () =>
  <div id="home-page">
    <PageHeader title="Champlain Haven" />

    <Paragraph>
      This all-seasons lakeside house is the perfect getaway for families whether it’s a relaxing vacation, once-in-a-lifetime reunion or group event. Located at the north end of Lake Champlain’s Grand Isle it’s just 30 minutes from Burlington, less than two hours from Montreal and easy driving distance to some of Vermont’s finest ski slopes.
    </Paragraph>

    <FullWidthImage src={images.twilight} alt="Front of the house at twilight" />

    <Paragraph>
      Summer offers the opportunity for fishing, swimming, boating or just plain getting away from hectic everyday life. Along hundreds of feet of lakeshore there’s a dock, offshore swim raft, kayaks and a canoe to enjoy.
    </Paragraph>

    <FullWidthImage src={images.yardPanorama} alt="Front of the house at twilight" />

    <Paragraph>
      The large deck off the house provides the perfect place to relax and gaze out at the boats sailing Vermont's “Inland Sea” while the gas BBQ heats up for evening grilling. Several bicycles, for adults and children, are available for use to explore the island’s back roads or to reach the vegetable stand at nearby Pomykala Farm. There’s badminton, bocce and even a private clay tennis court a 5-minute walk from the house.
    </Paragraph>

    <FullWidthImage src={images.lakeSailboats} alt="View of sailboats in Lake Champlain from the back deck" />

    <Paragraph>
      In Fall and Winter, a gas fireplace, wood stove and heated floors create a cozy atmosphere after outdoor activities or while you curl up with a good book inside. You can go sledding, snowshoeing and cross-country skiing right from the front door.
    </Paragraph>

    <Carousel dotPosition="top" autoplay autoplaySpeed={10000}>
      <FullWidthImage src={images.winterSnow} alt="Snow falling off the front of the house in winter" />
      <FullWidthImage src={images.houseFront} alt="The front of the house during the day in summer" />
    </Carousel>

    <Paragraph>
      The modern 4 ½ bath, 5-bedroom house (plus “bunkroom” and den) is limited to 8 guests (or 10 with pre-teen children). The well-stocked cook’s kitchen has multiple refrigerators and dishwashers and several work areas to encourage group food prep!
    </Paragraph>


    <FullWidthImage src={images.bedroom} alt="A bedroom looking very tidy" />
  </div>;

/** ======================== Exports ======================================= */
export default Home;
