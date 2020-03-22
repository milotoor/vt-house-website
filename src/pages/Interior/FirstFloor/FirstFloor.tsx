import * as React from 'react';

import { Flex, Img } from '../util';
import * as img from './img';


const FirstFloor: React.FC = () =>
  <Flex className="floor-plan">
    <Flex>
      <Img src={img.outsideLeft} />
    </Flex>

    <Flex column>
      <Flex>
        <Flex>
          <Img src={img.outsideDeck} room />
        </Flex>
        <Flex column>
          <Img src={img.outsideTop} />
          <Flex>
            <Img src={img.kitchenWindow} />
            <Img src={img.outsideTopSmall} />
          </Flex>
        </Flex>
      </Flex>

      <Flex>
        <Flex column>
          <Img src={img.indoorDeck} />
          <Flex>
            <Flex column>
              <Img room src={img.diningRoom} />
              <Img src={img.garageTop} />
            </Flex>

            <Flex column>
              <Img room src={img.diningRoomEntrance} />
              <Img src={img.hallClosets} />
            </Flex>
          </Flex>
        </Flex>

        <Img src={img.frontHallwayLong} />

        <Flex column>
          <Flex>
            <Img room src={img.kitchen} />
            <Img room src={img.livingRoom} />
          </Flex>
          <Flex>
            <Img src={img.laundryRoom} />
            <Img room src={img.bedroomHallwayLarge} />

            <Flex column>
              <Img src={img.bathroomLarge} />
              <Flex>
                <Img room src={img.bedroomSmallest} />
                <Img src={img.bathroomSmallest} />
              </Flex>
            </Flex>

            <Img src={img.outsideRightSmall1} />
          </Flex>
        </Flex>
      </Flex>

      <Flex>
        <Flex column>
          <Flex>
            <Img src={img.garageMiddle} />
            <Flex column>
              <Img src={img.mudRoom} />
              <Img src={img.hallBathroom} />
            </Flex>

            <Img src={img.frontHallwayEntrance} />

            <Flex column>
              <Flex>
                <Img src={img.laundryRoomSmall} />
                <Img room src={img.bedroomHallwaySmall} />
                <Img room src={img.bedroomSmall} />
                <Img src={img.bathroomSmall} />
              </Flex>
              <Img room src={img.bedroom} />
            </Flex>
          </Flex>
          <Flex>
            <Img src={img.garageBottom} />
            <Img src={img.frontPorch} />
          </Flex>
        </Flex>

        <Img src={img.outsideRightSmall2} />
      </Flex>
    </Flex>

    <Flex>
      <Img src={img.outsideRightLong} />
    </Flex>
  </Flex>;

export default FirstFloor;
