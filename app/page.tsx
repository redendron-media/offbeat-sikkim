import Slider from "@/components/Slider";
import WhatsAppButton from "@/components/WhatappButton/page";
import ContactDialog from "@/components/contact-dialog/page";
import Custom_Form from "@/components/custom-itinerary/custom-itinerary-form";
import Testimonials from "@/components/pages/Testimonials/page";
import FeaturedArticles from "@/components/pages/featured-articles/page";
import HeroHome from "@/components/pages/hero-home/page";
import { CuratedPackages, Destinations, Treks, UpcomingTours } from "@/constants";

export default function Home() {
  return (
    <main className="flex flex-col px-4 md:px-6 min-h-screen max-w-screen-2xl mx-auto w-full pl-4 md:pl-6">
      <HeroHome />
      <section className="py-12 md:py-[76px] space-y-4 md:space-y-9">
        <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
        Upcoming Community Trips
        </h2>
        <Slider items={UpcomingTours} />
      </section>
      <section  className="py-12 md:py-[76px] space-y-4 md:space-y-9">
      <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
          Curated Packages for the Explorer in You
        </h2>
        <Slider items={CuratedPackages} />
      </section>
      <section  className="py-12 md:py-[76px] space-y-4 md:space-y-9">
        <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
         Destinations
        </h2>
        <Slider items={Destinations} />
      </section>
       <section  className="py-12 md:py-[76px] space-y-4 md:space-y-9">
        <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
          Trek Expeditions
        </h2>
        <Slider items={Treks} />
      </section>
      <section id="create-your-itinerary" className="scroll-m-20 lg:scroll-m-10">
      <Custom_Form />
      </section>
      <Testimonials />
      <FeaturedArticles />
      <section className="flex flex-col justify-center items-center w-full gap-6 py-[60px] md:py-[88px]">
        <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
          Have a Question?
        </h2>
        <p className="bodym md:titles text-[#202822] text-center">
          Reach out to us for your travel planning needs.
        </p>

        <ContactDialog link="" title="Contact Us" />
        <WhatsAppButton/>
      </section>
    </main>
  );
}
