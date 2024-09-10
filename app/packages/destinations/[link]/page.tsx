import ContactDialog from "@/components/contact-dialog/page";
import Custom_Form from "@/components/custom-itinerary/custom-itinerary-form";
import Testimonials from "@/components/pages/Testimonials/page";
import Sliderr from "@/components/Slider";
import React from "react";
import { Stack } from "@mui/material";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";

interface DestinationPageProps {
  params: { link: string };
}

const query = (link: string) => `
{
  "curatedPackages": *[_type == "curatedTripDetail" && destination match "${link}*"] {
    id,
    title,
    cover,
    link,
    durationn,
    durationd,
    tripType
  },
  
  "treks": *[_type == "trekTripDetail" && destination match "${link}*"] {
    id,
    title,
    cover,
    link,
    durationn,
    durationd,
    tripType
  },
  
  "upcomingTours": *[_type == "upcomingTripDetail" && destination match "${link}*"] {
    id,
    title,
    cover,
    link,
    durationn,
    durationd,
    originalPrice,
    currentPrice,
    tripType
  },
   "destinationDetails": *[_type == "destination" && destination == "${link}"] {
    id,
    title,
    image,
    desc,
    "link": destination
  }
}
`;

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { link } = params;
  console.log(link);

  const data = await client.fetch(query(link));

  const curatedPackages = data.curatedPackages || [];
  const treks = data.treks || [];
  const upcomingTours = data.upcomingTours || [];
  const destinationDetails = data.destinationDetails[0] || {};

  return (
    <main className="px-4 bg-[#F6FBF4] md:px-6 flex flex-col">
      {
        <section
          className={`relative flex flex-col gap-6 px-4 py-9 min-h-[50vh] md:px-14 md:py-24 md:gap-6 items-center justify-center rounded-xl`}
        >
          <div className="absolute  inset-0 w-full z-0">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <Image
              src={urlFor(destinationDetails.image).url()}
              alt="Hero Background"
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
          <Stack className="z-10" direction={"column"} gap={3}>
            <h2 className="displays md:displayl text-white">
              {destinationDetails.title}
            </h2>
            <p className="bodys md:bodym lg:bodyl text-white">
              {destinationDetails.desc}
            </p>
          </Stack>
        </section>
      }

      {upcomingTours.length > 0 && (
        <section className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
          <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            Upcoming Community Trips
          </h2>
          <Sliderr items={upcomingTours} />
        </section>
      )}
      {curatedPackages.length > 0 && (
        <section className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
          <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            Curated Packages For the Explorer in You!
          </h2>
          <Sliderr items={curatedPackages} />
        </section>
      )}
      {treks.length > 0 && (
        <section className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
          <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            Trek Expeditions
          </h2>
          <Sliderr items={treks} />
        </section>
      )}

      <Custom_Form />
      <Testimonials />
      <section className="pr-4 md:pr-6 flex flex-col justify-center items-center w-full gap-6 py-[60px] md:py-[88px]">
        <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
          Have a Question?
        </h2>
        <p className="bodym md:titles text-[#202822] text-center">
          Reach out to us for your travel planning needs.
        </p>
        <ContactDialog title="Contact Us" link="" />
      </section>
    </main>
  );
}
