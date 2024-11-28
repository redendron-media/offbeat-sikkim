import { TripDetail } from "@/lib/types";
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


export const destinations = [
  {
    id: '1',
    name: "Sikkim",
    link: "/packages/destinations/sikkim",
  },
  {
    id: '2',
    name: "Bhutan",
    link: "/packages/destinations/bhutan",
  },
  {
    id: '3',
    name: "Meghalaya",
    link: "/packages/destinations/meghalaya",
  },
  {
    id: '4',
    name: "North Bengal",
    link: "/packages/destinations/northbengal",
  },
  {
    id: '5',
    name: "Arunachal Pradesh",
    link: "/packages/destinations/arunachalpradesh",
  },
  {
    id: '6',
    name: "Nagaland",
    link: "/packages/destinations/nagaland",
  }
]

export const team = [
  {
    id: "1",
    image: "team1",
    name: "Rajen Rai",
    role: "Founder/CEO",
  },
  {
    id: "2",
    image: "team2",
    name: "Topden Gurung",
    role: "Co-Founder/COO",
  },
  {
    id: "3",
    image: "team3",
    name: "Prabesh Subba",
    role: "Co-Founder/CFO",
  },
];

export const placesAndDestinations: { [key: string]: string[] } = {
  Sikkim: [
    "Gangtok",
    "Pelling",
    "Nathula Pass",
    "Tsomgo Lake",
    "Yumthang Valley",
    "Zero Point",
    "Yuksom",
    "Zuluk",
    "Ravangla",
    "Namchi",
    "Lachung",
    "Aritar",
  ],
  "Sikkim Darjeeling":[
    "Gangtok",
    "Pelling",
    "Yuksom",
    "Zuluk",
    "Nathula Pass",
    "Tsomgo Lake",
    "Yumthang Valley",
    "Zero Point",
    "Ravangla",
    "Namchi",
    "Lachung",
    "Aritar",
    "Darjeeling",
    "Kalimpong"
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
    "Dzukou Valley",
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
