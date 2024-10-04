
import Slider from '@/components/Slider'
import ContactDialog from '@/components/contact-dialog/page'
import Custom_Form from '@/components/custom-itinerary/custom-itinerary-form'
import Testimonials from '@/components/pages/Testimonials/page';
import { client } from '@/lib/sanity'
import React from 'react'

const query = `
 {
  "curatedTrips": *[_type == "curatedTripDetail"] | order(id asc) {
    id,
    title,
    cover,
    link,
    durationn,
    durationd,
    tripType,
  },
  
  "trekTrips": *[_type == "trekTripDetail"] | order(id asc) {
    id,
    title,
    cover,
    link,
    durationn,
    durationd,
    tripType,
  },
  
  "upcomingTrips": *[_type == "upcomingTripDetail"] | order(id asc) {
    id,
    title,
    cover,
    link,
    durationn,
    durationd,
    originalPrice,
    currentPrice,
    tripType,
  },

  "destinations": *[_type == "destination"] | order(id asc) {
    id,
    title,
    cover,
     "link": destination
},
}
  `;

  export default async function Packages() {
    const data = await client.fetch(query);
    const curatedTrips = data.curatedTrips || [];
    const trekTrips = data.trekTrips || [];
    const upcomingTrips = data.upcomingTrips || [];
    const destinations = data.destinations || [];
  return (
   <main className='pl-4 bg-[#F6FBF4] md:pl-6 flex flex-col pt-20 md:pt-32'>
        <section className='flex flex-col py-12 md:py-[76px] gap-4 md:gap-9'>
            <h2 className='text-secondary-oncontainer headlines md:displays lg:displaym'>Upcoming Community Trips</h2>
            <Slider items={upcomingTrips}/>
        </section>
        <section className='flex flex-col py-12 md:py-[76px] gap-4 md:gap-9'>
            <h2 className='text-secondary-oncontainer headlines md:displays lg:displaym'>Destinations</h2>
            <Slider items={destinations}/>
        </section>
        <section className='flex flex-col py-12 md:py-[76px] gap-4 md:gap-9'>
            <h2 className='text-secondary-oncontainer headlines md:displays lg:displaym pr-4'>Curated Packages For the Explorer in You!</h2>
            <Slider items={curatedTrips}/>
        </section>
        <section className='flex flex-col py-12 md:py-[76px] gap-4 md:gap-9'>
            <h2 className='text-secondary-oncontainer headlines md:displays lg:displaym'>Trek Expeditions</h2>
            <Slider items={trekTrips}/>
        </section>
        <section className='pr-4 md:pr-6'>
        <Custom_Form/>
        </section>
        <Testimonials/>
        
        <section className="pr-4 md:pr-6 flex flex-col justify-center items-center w-full gap-6 py-[60px] md:py-[88px]">
        <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">Have a Question?</h2>
        <p className="bodym md:titles text-[#202822] text-center">Reach out to us for your travel planning needs.</p>
        <ContactDialog title='Contact Us' link=''/>
      </section>
   </main>
  )
}
