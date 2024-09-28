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
    costDouble?:string,
    costTriple?:string,
    originalPrice?:string,
    currentPrice?:string,
    photoGalleries?:photoGallery[],
    tourDates?:string[], 
    link?:string,
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
  export interface ThingsToCarry{
    title:string,
    list?:string[],
  }
  export interface ItineraryDay {
    day: string;
    title: string,
    activities: string[];
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
  }
  
  export interface Step2FormData {
    destination: string[];
   startDate: string,
   endDate:string,
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
    tourDates:string,
    packageName:string,
    noOfAdults:string,
    source:string,
    coTraveler?:string[],
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
    link:string;
    tripType?:string;
    originalPrice?: number;
    currentPrice?: number;
  }
