import outsideLeft from './01Outside_Left.jpg';
import outsideDeck from './02Outside_Deck.jpg';
import outsideTop from './03Outside_Top.jpg';
import kitchenWindow from './04Kitchen_Window.jpg';
import outsideTopSmall from './05Outside_Top_Small.jpg';
import indoorDeck from './06Indoor_Deck.jpg';
import frontHallwayLong from './07Front_Hallway_Long.jpg';
import diningRoom from './08Dining_Room.jpg';
import firstFloor from './main level.jpg';
import garageTop from './09Garage_Top.jpg';
import diningRoomEntrance from './10Dining_Room_Entrance.jpg';
import hallClosets from './11Hall_Closets.jpg';
import kitchen from './12Kitchen.jpg';
import livingRoom from './13Living_Room.jpg';
import laundryRoom from './14Laundry_Room.jpg';
import bedroomHallwayLarge from './15Bedroom_Hallway_Large.jpg';
import bathroomLarge from './16Bathroom_Large.jpg';
import bedroomSmallest from './17Bedroom_Smallest.jpg';
import bathroomSmallest from './18Bathroom_Smallest.jpg';
import outsideRightSmall1 from './19Outside_Right_Small1.jpg';
import garageMiddle from './20Garage_Middle.jpg';
import mudRoom from './21Mud_Room.jpg';
import hallBathroom from './22Hall_Bathroom.jpg';
import frontHallwayEntrance from './23Front_Hallway_Entrance.jpg';
import laundryRoomSmall from './24Laundry_Room_Small.jpg';
import bedroomHallwaySmall from './25Bedroom_Hallway_Small.jpg';
import bedroomSmall from './26Bedroom_Small.jpg';
import bathroomSmall from './27Bathroom_Small.jpg';
import bedroom from './28Bedroom.jpg';
import outsideRightSmall2 from './29Outside_Right_Small2.jpg';
import garageBottom from './30Garage_Bottom.jpg';
import frontPorch from './31Front_Porch.jpg';
import outsideBottom from './32Outside_Bottom.jpg';
import outsideRightLong from './33Outside_Right_Long.jpg';

export {
  outsideLeft,
  outsideDeck,
  outsideTop,
  kitchenWindow,
  outsideTopSmall,
  indoorDeck,
  frontHallwayLong,
  diningRoom,
  garageTop,
  diningRoomEntrance,
  hallClosets,
  kitchen,
  livingRoom,
  laundryRoom,
  bedroomHallwayLarge,
  bathroomLarge,
  bedroomSmallest,
  bathroomSmallest,
  outsideRightSmall1,
  garageMiddle,
  mudRoom,
  hallBathroom,
  frontHallwayEntrance,
  laundryRoomSmall,
  bedroomHallwaySmall,
  bedroomSmall,
  bathroomSmall,
  bedroom,
  outsideRightSmall2,
  garageBottom,
  frontPorch,
  outsideBottom,
  outsideRightLong,

  firstFloor
}

function snakeToCamel (str: string) {
  return str.split('_').map((word, i) => {
    const lowerCased = word.toLowerCase();
    if (i === 0) return lowerCased;

    return lowerCased[0].toUpperCase() + lowerCased.slice(1);
  }).join('');
}
