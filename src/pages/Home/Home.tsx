import * as React from 'react';
import images from './img';
import { FullWidthImage, PagePadder } from '../shared';


/** ======================== Components ==================================== */
const Home: React.FC = () => 
  <div>
    <FullWidthImage src={images.twilight} alt="Front of the house at twilight" />

    <PagePadder>
      This all-seasons lakeside house is the perfect getaway for families whether it’s a relaxing vacation, once-in-a-lifetime reunion or group event. Located at the north end of Lake Champlain’s Grand Isle it’s just 30 minutes from Burlington, less than two hours from Montreal and easy driving distance to some of Vermont’s finest ski slopes.
    </PagePadder>

    <FullWidthImage src={images.lakeSailboats} alt="View of sailboats in Lake Champlain from the back deck" />

    <PagePadder>
      Summer offers the opportunity for fishing, swimming, boating or just plain getting away from hectic everyday life. Along hundreds of feet of lakeshore there’s a dock, offshore swim raft, kayaks and canoe to enjoy. The large deck off the house provides the perfect place to relax and gaze out at the boats sailing Vermont's “Inland Sea” while the gas BBQ heats up for evening grilling. Several bicycles, for adults and children, are available for use to explore the island’s back roads or to reach the vegetable stand at nearby Pomykala Farm. There’s badminton, bocce and even a private clay tennis court a 5-minute walk from the house.
    </PagePadder>

    <FullWidthImage src={images.winterSnow} alt="Snow falling off the front of the house in winter" />

    <PagePadder>
      In Fall and Winter, a gas fireplace, wood stove and heated floors create a cozy atmosphere after outdoor activities or while you curl up with a good book inside. You can go sledding, snowshoeing and cross-country skiing right from the front door.
    </PagePadder>

    <FullWidthImage src={images.houseFront} alt="The front of the house during the day in summer" />

    <PagePadder>
      The modern 4 ½ bath, 5-bedroom house (plus “bunkroom” and den) sleeps 12 comfortably with additional mattresses and sleeping bags available for overflow. The well-appointed cook’s kitchen has multiple refrigerators and dishwashers and several work areas to encourage group food prep!
    </PagePadder>

    <FullWidthImage src={images.bedroom} alt="A bedroom looking very tidy" />
  </div>

/** ======================== Exports ======================================= */
export default Home;
