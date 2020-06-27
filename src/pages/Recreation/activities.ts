import images from './img';
import { ActivityProps } from './types';

const activities: { [key: string]: ActivityProps[] } = {
  outings: [
    {
      description: 'Most of the major Northern Vermont ski resorts are within 1½ hours drive. Bolton Valley and Smuggler’s Notch are the closest at about 1 hour, with Stowe and Mad River Glen just beyond.',
      href: 'https://skivermont.com/',
      imgSrc: images.skiing,
      name: 'Skiing'
    },
    {
      description: 'Extensive hiking and walking trails criss-cross Vermont, with some hikes on the islands and many on the mainland. Several hiking guide-books are on our bookshelves.',
      href: 'https://www.alltrails.com/us/vermont',
      imgSrc: images.hiking,
      name: 'Hiking'
    },
    {
      description: 'Burlington’s Single-A baseball team. Old fashioned small-town baseball at it’s best. A marvelous family experience.',
      href: 'https://www.milb.com/vermont',
      imgSrc: images.lakeMontsters,
      name: 'Burlington Lake Monsters'
    },
    {
      description: 'Ben & Jerry’s factory tour is the number one tourist attraction in Vermont and a classic stop for kids. Located 1 hour away in Waterbury.',
      href: 'https://www.benjerry.com/about-us/factory-tours',
      imgSrc: images.benAndJerrys,
      name: 'Ben & Jerry\'s Factory'
    },
    {
      description: 'Free factory tour in Burlington. Excellent chocolates.',
      href: 'https://www.lakechamplainchocolates.com/',
      imgSrc: images.lakeChamplainChocolates,
      name: 'Lake Champlain Chocolates'
    },
    {
      description: 'A National Historic Landmark and nonprofit environmental education center on a 1400 acre working farm. Spectacular in fall leaf season.',
      href: 'https://shelburnefarms.org/',
      imgSrc: images.shelburneFarms,
      name: 'Shelburne Farms'
    },
    {
      description: 'Petting paddock and play area; very enjoyable for young kids. Donkeys, goats, sheep, and especially bunnies to feed and pet. They also have a small farm store.',
      href: 'https://www.allenholm.com/',
      imgSrc: images.allenholmFarm,
      name: 'Allenholm Farm'
    }
  ],

  restaurants: [
    {
      description: 'Small, friendly, and very good restaurant in South Hero. They don’t take reservations for parties of less than 6, but you can call and find out how busy it is before heading down. Recommended.',
      href: 'https://www.bluepaddlebistro.store/',
      imgSrc: images.bluePaddle,
      name: 'Blue Paddle'
    },
    {
      description: 'Thai and American food in a converted home in South Hero.',
      href: 'https://victoriascafe.net/',
      imgSrc: images.victoriasCafe,
      name: 'Victoria\'s Cafe'
    },
    {
      description: 'Located in the center of North Hero village, on the shore of Lake Champlain just north of Hero’s Welcome. Pretty good food in an old road-house inn building, with an outdoor bar and grill on a pier.',
      href: 'https://www.northherohouse.com/https-www-northherohouse-com-dining-wine/steamship-pier-bar-grill-vermont-waterfront-restaurant/',
      imgSrc: images.northHeroHouse,
      name: 'North Hero House'
    },
    {
      description: 'Restaurant and hotel along the lake in North Hero. Outdoor dining available in warm weather.',
      href: 'https://www.shoreacres.com/restaurant/index.html',
      imgSrc: images.shoreAcres,
      name: 'Shore Acres'
    },
    {
      description: 'Situated on the shores of Lake Champlain on historic Isle La Motte, the Ruthcliffe Lodge commands a panoramic view of the Green Mountains of Vermont and, of course, the beautiful lake. It is accessible by both boat and car, and makes for a terrific lunch outing.',
      href: 'http://www.ruthcliffe.com/restaurant/',
      imgSrc: images.ruthcliffeLodge,
      name: 'Ruthcliffe Lodge'
    }
  ],

  markets: [
    {
      description: 'Excellent farmstand selling their own fruits and produce. A great walking destination, about 1.5 miles along East Shore Rd from the house.',
      href: 'http://www.pomykalafarm.com/index.html',
      imgSrc: images.pomykala,
      name: 'Pomykala Farm'
    },
    {
      description: 'General store and historic center of North Hero town. An extensive collection of goods, from sports equipment to kids books, toys, gifts, knick-knacks, Vermont clothing, maple products, and an OK food market. They also make great sandwiches to order. NY Times available daily in summer; Sundays in winter.',
      href: 'https://heroswelcome.com/',
      imgSrc: images.herosWelcome,
      name: 'Hero\'s Welcome'
    },
    {
      description: 'Wednesdays from 4 to 7pm in South Hero and Saturdays from 10 to 2pm at St. Joseph\'s Church in Grand Isle.',
      href: 'https://champlainislandsfarmersmarket.org/',
      imgSrc: images.southHeroFarmersMarket,
      name: 'South Hero Farmer\'s Market'
    },
    {
      description: 'Well stocked food and sundries store 4 miles south in Grand Isle town. The most convenient of the islands markets. Good produce, frozen fish, beer, wine, and ice cream. NY Times available daily in summer; Sundays in winter.',
      href: 'https://www.aandbbeverage.com/',
      imgSrc: images.aAndBMarket,
      name: 'A & B Market'
    },
    {
      description: 'Well stocked food market about 7 miles south. They also develop film, sell fishing & hunting licenses and are the only full liquor store on the islands.',
      href: 'https://www.kbvstore.com/',
      imgSrc: images.keelersBayVariety,
      name: 'Keeler\'s Bay Variety'
    },
    {
      description: 'Excellent homemade chocolates, candies, & pastries, plus espresso drinks.',
      href: 'https://www.champlainislandscandylab.com/',
      imgSrc: images.candyLab,
      name: 'Champlain Islands Candy Lab'
    },
    {
      description: 'Full hardware and lumber center in South Hero. Fishing gear (rods, bait, tackle, etc.), fishing licenses and contour maps can also be found here.',
      href: 'https://www.facebook.com/pages/category/Hardware-Store/Robinson-Hardware-Inc-140528119317227/',
      name: 'Robinson Hardware'
    }
  ],

  parks: [
    {
      description: 'Acres of wetlands & trails for hunting, fishing & viewing migratory birds & other wildlife.',
      href: 'https://www.fws.gov/refuge/missisquoi/',
      imgSrc: images.missisquoiNWR,
      name: 'Missisquoi National Wildlife Refuge'
    },
    {
      description: 'Island park with hiking trails, a campground & a cafe, accessible only via boat or ferry.',
      href: 'https://vtstateparks.com/burton.html',
      imgSrc: images.burtonIslandSP,
      name: 'Burton Island'
    },
    {
      description: 'The park offers beautiful views, sports facilities and recreational and picnic opportunities. The park can also be rented out for events such as weddings and parties.',
      href: 'https://stalbanstown.com/departments/parks-recreation/',
      imgSrc: images.stAlbansTownPark,
      name: 'St Albans Bay'
    },
    {
      description: 'A local park on the shores of Grand Isle, offering opportunities for camping, hiking, swimming, boating, fishing, biking, etc.',
      href: 'https://vtstateparks.com/grandisle.html',
      imgSrc: images.grandIsleSP,
      name: 'Grand Isle State Park'
    },
    {
      description: 'Across the stateline in NY, this is a popular destination for beach swimming & scenic picnics on the shore of Lake Champlain.',
      href: 'https://parks.ny.gov/parks/34/details.aspx',
      imgSrc: images.cumberlandBaySp,
      name: 'Cumberland Bay State Park'
    }
  ]
};

export default activities;
