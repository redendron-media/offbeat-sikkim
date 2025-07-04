import Slider from "@/components/Slider";
import ContactDialog from "@/components/contact-dialog/page";
import Credibility from "@/components/credibility/page";
import CustomItineraryDialog from "@/components/custom-itinerary/custom-itinerary-dialog";
import Custom_Form from "@/components/custom-itinerary/custom-itinerary-form";
import GuestDiary from "@/components/guestDiary/page";
import HeroServer from "@/components/heroserver/page";
import MoveUp from "@/components/move-up-animation/page";
import Testimonials from "@/components/pages/Testimonials/page";
import FeaturedArticles from "@/components/pages/featured-articles/page";
import HeroHome from "@/components/pages/hero-home/page";
import SectionsNavigation from "@/components/subheader/page";
import WhyChoose from "@/components/whychoose/page";
import { client } from "@/lib/sanity";
import { blogCard } from "@/lib/types";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
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
    bestseller,
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

"blogs": *[_type == 'blog' ] | order(_createdAt desc) {
  title,caption,titleImage,
    "currentSlug":slug.current,
    _createdAt,
     tags[]-> {
      _id,"slug": slug.current ,name
    },},
}
  `;

export const revalidate = 60;

async function fetchData() {
  const data = await client.fetch(query);

  const blogWithViews = await Promise.all(
    data.blogs.map(async (post: blogCard) => {
      const postRef = doc(db, "posts", post.currentSlug);
      const postSnap = await getDoc(postRef);
      const views = postSnap.exists() ? postSnap.data().views : 0;
      return { ...post, views };
    })
  );

  const sortedBlogs = blogWithViews.sort((a, b) => b.views - a.views);

  return {
    curatedTrips: data.curatedTrips,
    trekTrips: data.trekTrips,
    upcomingTrips: data.upcomingTrips,
    destinations: data.destinations,
    blog: sortedBlogs,
  };
}

interface SectionConfig {
  id: string;
  label: string;
  condition: boolean;
}

export default async function Home() {
  const { curatedTrips, trekTrips, upcomingTrips, destinations, blog } =
    await fetchData();

  const sections: SectionConfig[] = [
    {
      id: "upcoming",
      label: "Upcoming Trips",
      condition: !!upcomingTrips,
    },
    {
      id: "curated",
      label: "Curated Packages",
      condition: !!curatedTrips,
    },

    {
      id: "destinations",
      label: "Destinations",
      condition: !!destinations,
    },
    {
      id: "trek",
      label: "Treks",
      condition: !!trekTrips,
    },
    {
      id: "create-your-itinerary",
      label: "Create Your Itinerary",
      condition: true,
    },
  ];

  const filteredSections = sections
    .filter((section) => section.condition)
    .filter((section, index, self) => {
      return self.findIndex((s) => s.label === section.label) === index;
    });

  return (
    <main className=" min-h-screen  w-full ">
      <HeroServer />
      <section
        id="next-section"
        className="flex flex-col px-4 md:px-6 pl-4 md:pl-6 max-w-screen-2xl mx-auto"
      >
        <div>
          <SectionsNavigation sections={filteredSections} />
          <MoveUp>
            <section
              id="upcoming"
              className="pt-12 pb-4 md:pt-[76px] md:pb-[56px] space-y-6 md:space-y-12 scroll-mt-24"
            >
              <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
                Upcoming Community Trips
              </h2>
              <Slider items={upcomingTrips} />
              {/* <div className="px-4">
                <CustomItineraryDialog />
              </div> */}
            </section>
          </MoveUp>

          <MoveUp>
            <section
              id="curated"
              className="pt-12 pb-4 md:pt-[76px] md:pb-[56px] space-y-12 md:space-y-[76px] scroll-mt-24"
            >
              <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
                Curated Packages for the Explorer in You
              </h2>
              <Slider items={curatedTrips} />
              <div className="px-4">
                <CustomItineraryDialog />
              </div> 
            </section>
          </MoveUp>

          <MoveUp>
            <section
              id="destinations"
              className="py-12 md:py-[76px] space-y-4 md:space-y-9 scroll-mt-24"
            >
              <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
                Destinations
              </h2>
              <Slider items={destinations} />
            </section>
          </MoveUp>
          <MoveUp>
            <section
              id="trek"
              className="py-12 md:py-[76px] space-y-4 md:space-y-9 scroll-mt-24"
            >
              <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
                Trek Expeditions
              </h2>
              <Slider items={trekTrips} />
            </section>
          </MoveUp>

          <MoveUp>
            <div
              id="create-your-itinerary"
              className=" relative px-5 py-28 lg:py-24 flex flex-col text-center gap-4 items-center justify-center"
            >
              <Custom_Form/>
            </div>
          </MoveUp>
        </div>
        <MoveUp>
          <GuestDiary />
        </MoveUp>
        <MoveUp>
          <Testimonials />
        </MoveUp>

        <MoveUp>
          <WhyChoose />
        </MoveUp>

        <MoveUp>
          <Credibility />
        </MoveUp>

        <MoveUp>
          <FeaturedArticles items={blog} />
        </MoveUp>

        <MoveUp>
          <section className="flex flex-col justify-center items-center w-full gap-6 py-[60px] md:py-[88px]">
            <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
              Have a Question?
            </h2>
            <p className="bodym md:titles text-[#202822] text-center">
              Reach out to us for your travel planning needs.
            </p>

            <ContactDialog link="" title="Contact Us" />
          </section>
        </MoveUp>
      </section>
    </main>
  );
}
