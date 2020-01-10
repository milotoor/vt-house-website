import React from 'react';
import { Divider, Typography } from 'antd';
import { SplitList } from './shared';


const { Paragraph, Title } = Typography;

// ============================ Types =========================================
type AmenitySectionProps = {
  name: string
  amenities: string[]
};

// ============================ Components ====================================
const AmenitySection: React.FC<AmenitySectionProps> = ({ name, amenities }) => {
  return (
    <div className="amenity-section">
      <Title level={3}>{name}</Title>
      <Paragraph>
        <SplitList listItems={amenities} />
      </Paragraph>
    </div>
  );
};

const Amenities: React.FC = () => 
  <div>
    <AmenitySection name="General" amenities={amenitySections.general} />
    <Divider />
    <AmenitySection name="Kitchen" amenities={amenitySections.kitchen} />
    <Divider />
    <AmenitySection name="Outdoor Equipment" amenities={amenitySections.outdoor} />
    <Divider />
    <AmenitySection name="For Small Children" amenities={amenitySections.children} />
  </div>

// ============================ Info ==========================================
const amenitySections = {
  general: [
    'Ceiling fans in most rooms',
    'Gas fireplace in Living Room',
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
    'Tent & sleeping bags',
    '4 kayaks',
    'Plenty of beach towels and water shoes',
    'Dock, with boat lift (suitable for ski boat)',
    'Tennis rackets & baseball equipment',
    '25 foot rope swing',
    'Fishing poles'
  ],

  children: [
    'High chair',
    '2 children\'s bikes',
    'Portable crib',
    'Life jackets & water shoes'
  ]
};

// ============================ Exports =======================================
export default Amenities;
