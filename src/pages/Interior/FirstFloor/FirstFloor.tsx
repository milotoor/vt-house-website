import * as React from 'react';

import { Flex, Img } from '../util';
import { floorplan } from './img';


const FirstFloor: React.FC = () =>
  <Flex className="floor-plan">
    <Flex>
      <Img src={floorplan.outsideLeft} />
    </Flex>

    <Flex column>
      <Flex>
        <Flex>
          <Img src={floorplan.outsideDeck} room="deck" />
        </Flex>
        <Flex column>
          <Img src={floorplan.outsideTop} />
          <Flex>
            <Img src={floorplan.kitchenWindow} />
            <Img src={floorplan.outsideTopSmall} />
          </Flex>
        </Flex>
      </Flex>

      <Flex>
        <Flex column>
          <Img room="porch" src={floorplan.indoorDeck} />
          <Flex>
            <Flex column>
              <Img room="dining" src={floorplan.diningRoom} />
              <Img src={floorplan.garageTop} />
            </Flex>

            <Flex column>
              <Img room="dining" src={floorplan.diningRoomEntrance} />
              <Img src={floorplan.hallClosets} />
            </Flex>
          </Flex>
        </Flex>

        <Img src={floorplan.frontHallwayLong} />

        <Flex column>
          <Flex>
            <Img room="kitchen" src={floorplan.kitchen} />
            <Img room="living" src={floorplan.livingRoom} />
          </Flex>
          <Flex>
            <Img src={floorplan.laundryRoom} />
            <Img room="bed_1f" src={floorplan.bedroomHallwayLarge} />

            <Flex column>
              <Img src={floorplan.bathroomLarge} />
              <Flex>
                <Img room="bed_1f" src={floorplan.bedroomSmallest} />
                <Img src={floorplan.bathroomSmallest} />
              </Flex>
            </Flex>

            <Img src={floorplan.outsideRightSmall1} />
          </Flex>
        </Flex>
      </Flex>

      <Flex>
        <Flex column>
          <Flex>
            <Img src={floorplan.garageMiddle} />
            <Flex column>
              <Img src={floorplan.mudRoom} />
              <Img src={floorplan.hallBathroom} />
            </Flex>

            <Img src={floorplan.frontHallwayEntrance} />

            <Flex column>
              <Flex>
                <Img src={floorplan.laundryRoomSmall} />
                <Img room="bed_1f" src={floorplan.bedroomHallwaySmall} />
                <Img room="bed_1f" src={floorplan.bedroomSmall} />
                <Img src={floorplan.bathroomSmall} />
              </Flex>
              <Img room="bed_1f" src={floorplan.bedroom} />
            </Flex>
          </Flex>
          <Flex>
            <Img src={floorplan.garageBottom} />
            <Img src={floorplan.frontPorch} />
          </Flex>
        </Flex>

        <Img src={floorplan.outsideRightSmall2} />
      </Flex>
    </Flex>

    <Flex>
      <Img src={floorplan.outsideRightLong} />
    </Flex>
  </Flex>;

export default FirstFloor;
