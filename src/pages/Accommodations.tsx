import React from 'react';
import { Divider, Typography } from 'antd';
import { SplitList } from './shared';


const { Paragraph, Title } = Typography;

interface RoomProps {
  name: string
  description: string
  features: string[]
}

const Room: React.FC<RoomProps> = ({ name, description, features }) => {
  return (
    <div className="accommodation-room">
      <Title level={4}>{name}</Title>
      <Paragraph>{description}</Paragraph>
      <Paragraph>
        <SplitList listItems={features} />
      </Paragraph>
    </div>
  );
};

const rooms = {
  firstFloor: {
    description: 'Located off the kitchen, this bedroom is the only one on the main level. It is set up for 1 or 2 people, and has good access for elderly or handicapped guests.',
    features: [
      'Queen Bed',
      'Reading Lights',
      'Rocking Chair',
      'Ceiling Fan',
      'Full Bathroom'
    ]
  },

  secondFloorFront: {
    description: 'Smallest of the bedrooms, good for 1 or 2 people. Large skylight directly above the bed makes this room ideal for early risers.',
    features: [
      'Queen Bed',
      'Reading Lights',
      'Skylight',
      'Ceiling Fan',
      'Shared Bathroom'
    ]
  },

  secondFloorLakeside: {
    description: 'Largest bedroom in the house, with room for a couple plus space for a mattress and/or crib on the floor. French doors lead to spacious deck seating area with view of the lake.',
    features: [
      'Queen Bed',
      'Reading Lights',
      'Rocking Chair',
      'Ceiling Fan',
      'Large Balcony',
      'Shared Bathroom'
    ],
  },

  secondFloorMaster: {
    description: 'Spacious master bedroom, with large private bathroom.',
    features: [
      'King Bed',
      'Reading Lights',
      'Full Length Mirror',
      'Ceiling Fan',
      'French doors lead to deck',
      '2 Sinks',
      'Private Bathroom with large walk-in Shower'
    ]
  },

  secondFloorDen: {
    description: 'Open den area on the second floor can be closed off with sliding fabric panels to create a bedroom area.',
    features: [
      '27" TV with DVD & VCR',
      'DirecTV with TiVo',
      'Couch with Queen Sofa-bed',
      '2 desk areas'
    ]
  },

  basement: {
    description: 'In the basement, but with French doors leading to the meadow, this room is cool, quiet, and private, with good light. Suitable for 1 or 2 people.',
    features: [
      'Queen Bed',
      'Shared bathroom',
      'Reading lights'
    ]
  },

  basementBunk: {
    description: 'The main kids sleeping room, this has up to 6 beds. The basement is cool and dark, making it good for late-sleeping teenagers.',
    features: [
      '3 Double beds & 1 Single bed',
      '27" TV with DVD & VCR',
      'Wall of lockers for storage',
      'Inflatable and fold up mattresses',
      'X-Box and Gamecube',
      'Shared Bathroom'
    ]
  }
};

export default () => 
  <div>
    <Room name="First Floor Bedroom" {...rooms.firstFloor} />
    <Divider />
    <Room name="Second Floor Front Bedroom" {...rooms.secondFloorFront} />
    <Divider />
    <Room name="Second Floor Lakeside Bedroom" {...rooms.secondFloorLakeside} />
    <Divider />
    <Room name="Second Floor Master Bedroom" {...rooms.secondFloorMaster} />
    <Divider />
    <Room name="Second Floor Den" {...rooms.secondFloorDen} />
    <Divider />
    <Room name="Basement Bedroom" {...rooms.basement} />
    <Divider />
    <Room name="Basement Bunk-Room" {...rooms.basementBunk} />
  </div>