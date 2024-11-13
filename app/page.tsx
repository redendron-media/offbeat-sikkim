import Slider from "@/components/Slider";
import ContactDialog from "@/components/contact-dialog/page";
import Credibility from "@/components/credibility/page";
import Custom_Form from "@/components/custom-itinerary/custom-itinerary-form";
import MoveUp from "@/components/move-up-animation/page";
import Testimonials from "@/components/pages/Testimonials/page";
import FeaturedArticles from "@/components/pages/featured-articles/page";
import HeroHome from "@/components/pages/hero-home/page";
import { client } from "@/lib/sanity";

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
    destination
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
    tripType,
    type,
    cover,
    "link": destination,
},
}
  `;

export const revalidate = 60;
async function fetchData() {
  const data = await client.fetch(query);
  return {
    curatedTrips: data.curatedTrips,
    trekTrips: data.trekTrips,
    upcomingTrips: data.upcomingTrips,
    destinations: data.destinations,
  };
}

export default async function Home() {
  const { curatedTrips, trekTrips, upcomingTrips, destinations } =
    await fetchData();
  return (
    <main className=" min-h-screen  w-full ">
      <HeroHome />
      <section
        id="next-section"
        className="flex flex-col px-4 md:px-6 pl-4 md:pl-6 max-w-screen-2xl mx-auto"
      >
        <section className="py-12 md:py-[76px] space-y-4 md:space-y-9">
          <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
            Upcoming Community Trips
          </h2>
          <Slider items={upcomingTrips} />
        </section>

        <section className="py-12 md:py-[76px] space-y-4 md:space-y-9">
          <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
            Curated Packages for the Explorer in You
          </h2>
          <Slider items={curatedTrips} />
        </section>

        <section className="py-12 md:py-[76px] space-y-4 md:space-y-9">
          <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
            Destinations
          </h2>
          <Slider items={destinations} />
        </section>
        <section className="py-12 md:py-[76px] space-y-4 md:space-y-9">
          <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
            Trek Expeditions
          </h2>
          <Slider items={trekTrips} />
        </section>
        <section
          id="create-your-itinerary"
          className="scroll-m-20 lg:scroll-m-10"
        >
          <Custom_Form />
        </section>
        <Testimonials />
        <FeaturedArticles />
        <Credibility />
        <section className="flex flex-col justify-center items-center w-full gap-6 py-[60px] md:py-[88px]">
          <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
            Have a Question?
          </h2>
          <p className="bodym md:titles text-[#202822] text-center">
            Reach out to us for your travel planning needs.
          </p>

          <ContactDialog link="" title="Contact Us" />
        </section>
      </section>
    </main>
  );
}
