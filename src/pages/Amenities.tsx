import * as React from 'react';
import { Divider, Typography } from 'antd';
import { PagePadder, SplitList } from './shared';


const { Paragraph, Title } = Typography;

/** ======================== Types ========================================= */
type AmenitySectionProps = {
  name: string
  amenities: string[]
};

/** ======================== Components ==================================== */
const AmenitySection: React.FC<AmenitySectionProps> = ({ name, amenities }) =>
  <div className="amenity-section">
    <Title level={3}>{name}</Title>
    <Paragraph>
      <SplitList listItems={amenities} />
    </Paragraph>
  </div>;

const Amenities: React.FC = () => 
  <PagePadder>
    <AmenitySection name="General" amenities={amenitySections.general} />
    <Divider />
    <AmenitySection name="Kitchen" amenities={amenitySections.kitchen} />
    <Divider />
    <AmenitySection name="Outdoor Equipment" amenities={amenitySections.outdoor} />
    <Divider />
    <AmenitySection name="For Small Children" amenities={amenitySections.children} />
  </PagePadder>;

/** ======================== Info ========================================== */
const amenitySections = {
  general: [
    'Ceiling fans in most rooms',
    'Gas fireplace in Living Room',
    'Radiant heat throughout the house, for use in all seasons',
    'Table with seating for 12',
    'High speed Wi-Fi',
    'Coolers',
    'Numerous outdoor chairs',
    'Screened porch',
    'Wood stove in Dining Room',
    'Stereo system with Sonos',
    'Apple TV',
    'Gas grill',
    'Washer and dryer',
  ],

  kitchen: [
    '5-burner gas cook-top',
    'Dishwashers',
    'Coffee maker + thermos',
    'Food processor',
    'Pots & pans',
    'Blender',
    'Counter seating for 3',
    '3 ovens (2 convection, 1 microwave)',
    '2 refrigerators (primary + drinks fridge)',
    'Trash compactor',
    'Rice cooker',
    'Toaster',
    'Ice cream maker'
  ],

  outdoor: [
    'Canoe',
    'Life jackets',
    'Off-shore swim raft',
    'Badminton',
    'Hammock',
    '5 mountain bikes',
    '4 kayaks',
    'Plenty of beach towels and water shoes',
    'Dock, with jet-ski lift (bring your own jet-ski)',
    'Tennis rackets & baseball equipment'
  ],

  children: [
    'High chair',
    '2 children\'s bikes',
    'Portable crib',
    'Life jackets & water shoes'
  ]
};

/** ======================== Exports ======================================= */
export default Amenities;
