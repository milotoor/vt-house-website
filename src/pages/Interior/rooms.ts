import * as imagesFirstFloor from './FirstFloor/img';


/** ======================== Types ========================================= */
export type RoomPhoto = {
  full: string;
  thumbnail: string;
};

type RoomData = {
  description: string;
  images: RoomPhoto[];
  name: string;
};

export type Room =
  | 'bed_1f'
  | 'bed_2f'
  | 'bed_basement'
  | 'bed_lakeside'
  | 'bed_master'
  | 'bunk'
  | 'deck'
  | 'den'
  | 'dining'
  | 'kitchen'
  | 'living'
  | 'porch';

/** ======================== Room data ===================================== */
const rooms: Record<Room, RoomData> = {
  bed_1f: {
    description: 'Located off the kitchen, this bedroom is the only one on the main level. It is set up for 1 or 2 people, and has good access for elderly or handicapped guests. Accessories include a queen bed, ceiling fan and private bathroom.',
    images: [
      imagesFirstFloor.photos.bedroom1,
      imagesFirstFloor.photos.bedroom2,
      imagesFirstFloor.photos.bedroom3
    ],
    name: 'Bedroom'
  },
  bed_2f: {
    description: 'Smallest of the bedrooms, good for 1 or 2 people. Large skylight directly above the bed makes this room ideal for early risers.',
    images: [],
    name: 'Front Bedroom'
  },
  bed_basement: {
    description: 'The queen bed makes this room suitable for 1 or 2 people, and the basement locale make it very quiet and private. Two doors to the meadow provide good light and cool air.',
    images: [],
    name: 'Bedroom'
  },
  bed_lakeside: {
    description: 'Largest bedroom in the house, with room for a couple plus space for a mattress and/or crib on the floor. French doors lead to spacious deck seating area with view of the lake.',
    images: [],
    name: 'Lakeside Bedroom'
  },
  bed_master: {
    description: 'The master bedroom offers much in the way of comfort and privacy, as demonstrated by the king bed and private bathroom. Two doors open to a deck spanning the length of the second floor.',
    images: [],
    name: 'Master Bedroom'
  },
  bunk: {
    description: 'The main kids sleeping room, this has up to 6 beds. The basement is cool and dark, making it good for late-sleeping teenagers. A TV equipped with VCR and DVD player, two video game systems and a weighty stack of games are all available for your enjoyment.',
    images: [],
    name: 'Bunk Room'
  },
  deck: {
    description: 'Situated at the crest of a gentle hill, the deck overlooks Lake Champlain for miles. In the sunny days of July it makes for a terrific place to kick back and relax or barbeque on the grill outside. Select a pair of water shoes from the bin then follow the gravel trail down the hill, and you\'ll soon find yourself at the shores of the lake.',
    images: [imagesFirstFloor.photos.deck1, imagesFirstFloor.photos.deck2],
    name: 'Back Deck'
  },
  den: {
    description: 'Open den area on the second floor which can be closed off with sliding fabric panels to create a bedroom area. The queensize sofa-bed can be easily converted from one form to the other. Within the room is a 27" TV with DirecTV (satellite channels) and Tivo.',
    images: [],
    name: 'Den'
  },
  dining: {
    description: 'The large table is capable of comfortably seating over ten people while still offering ample space for a terrific meal. On a hot evening the doors to the screen porch can be opened to cool down, and a wood stove will make the room pleasantly warm on chillier nights. To the side of the room, a set of drawers contain a number of puzzles and games guaranteed to entertain.',
    images: [imagesFirstFloor.photos.dining1, imagesFirstFloor.photos.dining2],
    name: 'Dining Room'
  },
  kitchen: {
    description: 'The kitchen has plenty of work space as well as seating for counter dining and kitchen camaraderie. While most of the floors in the house are pine planks the kitchen has a cork floor for easier standing and clean-up. Designed with a crowd in mind, there are two refrigerators, multiple dishwashers, two ovens and several sinks. Pots, pans and kitchen gadgets abound in addition to plates and silverware for at least 20 guests.',
    images: [imagesFirstFloor.photos.kitchen1, imagesFirstFloor.photos.kitchen2],
    name: 'Kitchen'
  },
  living: {
    description: 'The perfect room for any day of any season. Cushioned armchairs and a soft sofa make this a great place to lounge and enjoy a good book. The overhead fan will keep you cool in the hottest days of summer and the gas fireplace will warm you up after sledding outside in December snow. Large windows span two exterior walls, giving you a great view of the lake and yard.',
    images: [imagesFirstFloor.photos.living1, imagesFirstFloor.photos.living2],
    name: 'Living Room'
  },
  porch: {
    description: 'An excellent setting for dinner outdoors, the screened porch is commonly used in the hotter months. The card table provides easy seating for four or five, and the screens keep out all the pesky nighttime critters. When the house is crowded, the porch becomes a convenient place to seat the kids come dinnertime— and the two thick doors can keep out the noise! Pegs line one wall of the porch so you can hang up towels and swim suits. To gauge the weather in the colder parts of the year, there is also a thermometer which is, of course, visible from indoors.',
    images: [imagesFirstFloor.photos.porch],
    name: 'Screened Porch'
  }
};

export default rooms;

/** ======================== Helpers ======================================= */
export function configurePhotos (full: string, thumbnail: string) {
  return ({
    full,
    thumbnail
  }) as RoomPhoto;
}
