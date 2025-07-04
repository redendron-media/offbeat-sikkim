export interface CardProps {
    image: string;
    title: string;
    durationn?: string;
    durationd?:string,
    cover?:string,
    originalPrice?: string;
    currentPrice?: string;
    costDouble?: string;
    link?: string;
    destination?:string;
  }

  export interface TripDetail {
    id:string,
    title:string,
    image:string,
    cover?:string,
    desc?: string,
    durationn?:string,
    durationd?:string,
    metaDescription?:string,
    costDouble?:string,
    costTriple?:string,
    faqs?:FAQs[],
    originalPrice?:string,
    currentPrice?:string,
    photoGalleries?:photoGallery[],
    tourDates?:string[], 
    link?:string,
    privateTrip?:privateTrip[];
    pdfItinerary?:string,
    detailedItinerary?: ItineraryDay[],
    inclusions?: string[],
    exclusions?: string[],
    bookingProcess?: string[],
    thingsToCarry?: string[],
    thingsToCarryTrek?:ThingsToCarry[],
    personalMedicalKit?: string[],
    mandatoryDocuments?: MandatoryDocs[],
    knowBeforeYouGo?: string[],
    destination?:string,
  }

  interface privateTrip {
    pax:string,
    price:string,
  }
  export interface ThingsToCarry{
    title:string,
    list?:string[],
  }
  export interface ItineraryDay {
    day: string;
    title: string,
    activities: string[];
}

export interface FAQs {
  question: string,
  answer: string[];
}
export interface photoGallery {
  title: string,
  images: string
}
  export interface MandatoryDocs {
    title:string,
    desc:string[],
  } 

  export interface Step1FormData {
    name: string;
    email: string;
    phone: string;
    travel_style: string;
    places:string;
    accommodation: string;
    address?: string;
  }
  
  export interface Step2FormData {
    destination: string[];
   startDate: string,
   endDate:string,
   noOfDays?:number,
  }

  export interface Step3FormData {
    noOfAdults: string;
    noOfChildren: string[];
    additionalInformation?: string;
  }
  
  export type FormData = Step1FormData & Step2FormData & Step3FormData;
  
  export interface TestimonialCard {
    title:string,
    rating:number,
    testimonial:string,
  }

  export interface ContactForm {
    name:string,
    email:string,
    phone:string,
    additional?:string;
  }

  export interface PackageForm{
    name:string,
    email:string,
    phone:string,
    travelstyle?:string,
    accommodation?:string,
    noOfAdults:string,
    noOfChildren?: string;
    age?:string[];
    additionalInformation?:string,
    startDate?: string,
   tourPackage?:string,
   packageName?:string,
   tourDates?:string,
   address:string,
   source:string,
  }

  export interface PhotoGallery {
    name:string,
    images:string,
  }

  export interface blogCard {
    title:string,
    caption: string,
    titleImage: any,
    currentSlug: string,
    tags:tag[];
    views?: number;
    _createdAt:string;
  }

  export interface tag {
    _id:string;
    name:string;
    slug:NamedCurve;
  }
  export interface BlogPage {
    currentSlug:string;
    title:string;
    titleImage:any;
    caption:string;
    content:any;
    image1?:any;
    content2?:any;
    content3?:any;
  content4?:any;
    content5?:any;
    image2?:any;
    image3?:any;
    image4?:any;
    tags:tag[];
    _createdAt:string;
  }

  export interface UpcomingForm {
    name:string,
    email:string,
    phone:string,
    tourDates?:string,
    packageName:string,
    noOfAdults:string,
    source:string,
    coTraveler?:string[],
    appliedCoupon?:string,
    terms?:string,
  }

  export interface FormErrors {
    packageName?: string;
    name?: string;
    email?: string;
    phone?: string;
    noOfAdults?: string;
    tourDates?: string;
    source?: string;
    coTraveler?: string[] | undefined;
    terms?:string;
  }

  interface Cover {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  }
  
  export interface CardTrip {
    id: string;
    title: string;
    cover: Cover;
    durationn?: number;
    durationd?: string;
    bestseller: boolean;
    link:string;
    type?:string;
    tripType?:string;
    originalPrice?: number;
    currentPrice?: number;
    destination?:string;
  }

  export interface BlogCardType {
      views?:string;
      title: string,
      caption: string,
      titleImage: string,
      currentSlug: string,
      _createdAt: string,
      tags: {
        _id: string,
        slug: string,
        name: string
      }[]
  }