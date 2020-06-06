import * as React from 'react';

import { Flex, Img } from '../util';
import { floorplan } from './img';


const SecondFloor: React.FC = () =>
  <Flex className="floor-plan" column>
    <Img src={floorplan.outsideTop} />
    <Flex>
      <Img src={floorplan.outsideLeft} />
      <Flex column>
        <Flex>
          <Img room="bed_master" src={floorplan.masterBedroom} />
          <Flex column>
            <Img room="den" src={floorplan.den} />
            <Flex>
              <Img room="bed_master" src={floorplan.masterBedroomSmall} />
              <Img src={floorplan.hallwaySmall} />
            </Flex>
          </Flex>
          <Img room="bed_lakeside" src={floorplan.lakesideBedroom} />
        </Flex>

        <Flex>
          <Flex column>
            <Img src={floorplan.severalRooms} />
            <Img src={floorplan.outsideSliver} />
          </Flex>
          <Flex column>
            <Flex>
              <Img room="bed_2f" src={floorplan.stairsBedroomSmall} />
              <Img room="bed_lakeside" src={floorplan.lakesideBedroomSmall} />
            </Flex>
            <Img room="bed_2f" src={floorplan.stairsBedroomMid} />
            <Flex>
              <Img src={floorplan.stairs} />
              <Img room="bed_2f" src={floorplan.stairsBedroomBottom} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Img src={floorplan.outsideRight} />
    </Flex>
    <Img src={floorplan.outsideBottom} />
  </Flex>;

export default SecondFloor;
