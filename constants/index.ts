import {TripDetail } from "@/lib/types";
import { UPCOMING_NORTH_NATHULA } from "./packages/upcoming/upcoming_nathula_north";
import { UPCOMING_BHUTAN } from "./packages/upcoming/upcoming_bhutan";
import { UPCOMING_SANDAKPHU } from "./packages/upcoming/upcoming_sandakphu";
import { UPCOMING_GOECHALA } from "./packages/upcoming/upcoming_goechala";
import { CURATED_MEGHALAYA } from "./packages/curated/curated_meghalaya";
import { CURATED_NAGALAND } from "./packages/curated/curated_nagaland";
import { CURATED_NORTHSIKKIM } from "./packages/curated/curated_northsikkim";
import { CURATED_NORTHNATHULA } from "./packages/curated/curated_northnathula";
import { CURATED_NORTHNATHULAPELLING } from "./packages/curated/curated_northnathulapelling";
import { CURATED_PELLING } from "./packages/curated/curated_pelling";
import { CURATED_ARUNACHAL } from "./packages/curated/curated_arunachal";
import { CURATED_BHUTAN } from "./packages/curated/curated_bhutan";
import { TREK_SANDAKPHU } from "./packages/treks/treks_sandakphu";
import { TREK_GOECHALA } from "./packages/treks/treks_goechala";
import { TREK_DZUKOU } from "./packages/treks/treks_dzukou";
import { UPCOMING_MEGHALAYA } from "./packages/upcoming/upcoming_meghalaya";
import { UPCOMING_SIKKIMDARJ } from "./packages/upcoming/upcoming_sikkimdarj";
export const navlinks = [
  {
    id: "1",
    name: "Packages",
    link: "/packages",
  },
  {
    id: "2",
    name: "Destinations",
    link: "/destinations",
  },
  {
    id: "3",
    name: "Blog",
    link: "/blog",
  },
  {
    id: "4",
    name: "About Us",
    link: "/About",
  },
  {
    id: "5",
    name: "Contact",
    link: "/Contact",
  },
];

export const team = [
  {
    id: "1",
    image: "team1",
    name: "Rajen Rai",
    role: "Co-Founder/Marketing Head",
  },
  {
    id: "2",
    image: "team2",
    name: "Topden Gurung",
    role: "Co-Founder/Operations Head",
  },
  {
    id: "3",
    image: "team3",
    name: "Prabesh Subba",
    role: "Co-Founder/Accounts Head",
  },
];

export const placesAndDestinations: { [key: string]: string[] } = {
  Sikkim: [
    "Gangtok",
    "Pelling",
    "Yuksom",
    "Zuluk",
    "Lachen",
    "Ravangla",
    "Namchi",
    "Lachung",
    "Chungthang",
    "Temi Tarku",
    "Aritar",
    "Gurudongmar Lake",
  ],
  "North Bengal": [
    "Mirik",
    "Lava and Loleygaon",
    "Darjeeling",
    "Sittong",
    "Rishyap",
    "Kurseong",
    "Kalimpong",
    "Sillerygaon",
    "Singalila Range Trek",
  ],
  "Arunachal Pradesh": [
    "Aalo",
    "Bomdila",
    "Dirang",
    "Eaglenest",
    "Itanagar",
    "Menchukha",
    "Namsai",
    "Pasighat",
    "Roing",
    "Tawang",
    "Tuting",
    "Walong",
    "Ziro",
  ],
  Nagaland: [
    "Benreu",
    "Chizami",
    "Dimapur",
    "Doyang",
    "Khezhakeno Village",
    "Khonoma",
    "Kohima",
    "Mokokchung",
    "Mon",
    "Pfütsero",
    "Shilloi",
    "Tseminyu",
  ],
  Meghalaya: [
    "Shillong",
    "Cherrapunji",
    "Mawlynnong",
    "Tura",
    "Jowai",
    "Shnongpdeng",
    "Dawki",
    "Phe Phe Waterfall",
  ],
  Bhutan: [
    "Paro valley",
    "Thimphu",
    "Bhuthang Valley",
    "Phobjika Valley",
    "Dochula Pass",
    "Wangdue Phodrang",
    "Trongsa",
    "Lhuentse",
    "Trashingang",
    "Samdrup Jongkhar",
    "Laya",
    "Gasa",
    "Pemagatshel",
    "Punakha",
    "Phuentsholing"
  ],
};

export const UpcomingTours: TripDetail[] = [
 UPCOMING_NORTH_NATHULA,
 UPCOMING_BHUTAN,
 UPCOMING_SANDAKPHU,
 UPCOMING_GOECHALA,
 UPCOMING_MEGHALAYA,
 UPCOMING_SIKKIMDARJ,
];

export const CuratedPackages: TripDetail[] = [
 CURATED_MEGHALAYA,
 CURATED_NAGALAND,
 CURATED_NORTHSIKKIM,
  CURATED_NORTHNATHULA,
 CURATED_NORTHNATHULAPELLING,
 CURATED_PELLING,
 CURATED_ARUNACHAL,
  CURATED_BHUTAN
];

export const Treks: TripDetail[] = [
  TREK_SANDAKPHU,
  TREK_GOECHALA,
  TREK_DZUKOU
];

export const BhutanUpcomingTours: TripDetail[] = [
  UPCOMING_BHUTAN
];

export const BhutanCuratedPackages: TripDetail[] = [
 CURATED_BHUTAN
];


export const NorthBengalUpcomingTours: TripDetail[] = [
 UPCOMING_SANDAKPHU,
 UPCOMING_SIKKIMDARJ
];

export const NorthBengalTreks: TripDetail[] = [
 TREK_SANDAKPHU
];

export const SikkimTreks: TripDetail[] = [
  TREK_GOECHALA
];

export const SikkimCuratedPackages: TripDetail[] = [
  CURATED_NORTHSIKKIM,
  CURATED_NORTHNATHULA,
  CURATED_NORTHNATHULAPELLING,
  CURATED_PELLING,
];

export const SikkimUpcomingTours: TripDetail[] = [
  UPCOMING_NORTH_NATHULA,
  UPCOMING_GOECHALA,
  UPCOMING_SIKKIMDARJ
];

export const NagalandCuratedPackages: TripDetail[] = [
 CURATED_NAGALAND
];

export const ArunachalCuratedPackages: TripDetail[] = [
 CURATED_ARUNACHAL
];

export const NagalandTreks: TripDetail[] = [
  TREK_DZUKOU
];

export const MeghalayaUpcomingTours: TripDetail[] = [
 UPCOMING_MEGHALAYA
];

export const MeghalayaCuratedPackages: TripDetail[] = [
 CURATED_MEGHALAYA
];

export const Sikkim: TripDetail[] = [
  ...SikkimCuratedPackages,
  ...SikkimTreks,
  ...SikkimUpcomingTours,
];

export const Meghalaya: TripDetail[] = [
  ...MeghalayaCuratedPackages,
  ...MeghalayaUpcomingTours,
];

export const Nagaland: TripDetail[] = [
  ...NagalandCuratedPackages,
  ...NagalandTreks,
];

export const Destinations = [
  {
    id: "1",
    image: "images/north-sikkim/sikkimDestination",
    pageImage:"images/north-sikkim/hero",
    title: "Sikkim",
    destination: "sikkim",
    desc: "Nestled in the Eastern Himalayas, Sikkim is a picturesque state known for its stunning landscapes, including snow-capped mountains, lush valleys, and serene lakes. With its rich biodiversity, vibrant culture, and the majestic Kanchenjunga, the third-highest peak in the world, Sikkim offers a peaceful retreat and numerous adventure opportunities.",
  },
  {
    id: "2",
    image: "images/sandakphu/northbengalDestination",
    pageImage:"images/sandakphu/hero",
    title: "North Bengal",
    destination: "northbengal",
    desc: "North Bengal, encompassing parts of West Bengal, is renowned for its diverse landscapes, from the verdant tea gardens of Darjeeling to the lush forests of Dooars. It features a blend of natural beauty, vibrant cultural heritage, and charming hill stations, making it a popular destination for nature lovers and adventure seekers alike.",
  },
  {
    id: "3",
    image: "images/meghalaya/meghalayaDestination",
    pageImage:"images/meghalaya/hero1",
    title: "Meghalaya",
    destination: "meghalaya",
    desc: 'Known as the "Abode of Clouds," Meghalaya is celebrated for its stunning natural beauty, including cascading waterfalls, lush green hills, and unique living root bridges. Its vibrant local culture, picturesque landscapes, and pleasant climate make it a favorite destination for those seeking both relaxation and exploration.',
  },
  {
    id: "4",
    image: "images/arunachal/arunachalDestination",
    pageImage:"images/arunachal/1",
    title: "Arunachal Pradesh",
    destination: "arunachalpradesh",
    desc: "Arunachal Pradesh, located in the northeastern tip of India, is renowned for its breathtaking landscapes, ranging from high-altitude plateaus to lush valleys. The state boasts rich tribal cultures, ancient monasteries, and the stunning Tawang War Memorial, making it a fascinating destination for cultural enthusiasts and adventure travelers.",
  },
  {
    id: "5",
    image: "images/nagaland/nagalandDestination",
    pageImage:"images/nagaland/5",
    title: "Nagaland",
    destination: "nagaland",
    desc: "Nagaland is a unique blend of natural beauty and rich cultural heritage. Known for its vibrant festivals, traditional Naga villages, and diverse ethnic tribes, it offers visitors a chance to experience a distinctive way of life. Its scenic landscapes, including rolling hills and lush forests, add to its charm as a travel destination.",
  },
  {
    id: "6",
    image: "images/bhutan/bhutanDestination",
    pageImage:"images/bhutan/hero",
    title: "Bhutan",
    destination: "bhutan",
    desc: "Bhutan, nestled in the Himalayas, is a treasure trove of natural beauty and cultural wonders. This enchanting country, with its fluttering prayer flags and joyous faces, offers a magical experience that transcends words. With OffbeatSikkim Travels, immerse yourself in Bhutan's awe-inspiring landscapes and profound sense of happiness.",
  },
];

export const packagesData: TripDetail[] = [
  ...UpcomingTours,
  ...CuratedPackages,
  ...Treks,
];
