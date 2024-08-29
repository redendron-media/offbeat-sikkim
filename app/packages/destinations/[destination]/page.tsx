"use client";
import { useParams } from "next/navigation";
import {
  SikkimCuratedPackages,
  SikkimTreks,
  SikkimUpcomingTours,
  MeghalayaCuratedPackages,
  MeghalayaUpcomingTours,
  NagalandCuratedPackages,
  NagalandTreks,Destinations,
  BhutanCuratedPackages,
  BhutanUpcomingTours,
  NorthBengalTreks,
  NorthBengalUpcomingTours,
  ArunachalCuratedPackages,
} from "@/constants";
import ContactDialog from "@/components/contact-dialog/page";
import Custom_Form from "@/components/custom-itinerary/custom-itinerary-form";
import Testimonials from "@/components/pages/Testimonials/page";
import Sliderr from "@/components/Slider";
import React from "react";
import { Stack } from "@mui/material";

const destinationDataMap = {
  sikkim: {
    curatedPackages: SikkimCuratedPackages,
    treks: SikkimTreks,
    upcomingTours: SikkimUpcomingTours,
  },
  meghalaya: {
    curatedPackages: MeghalayaCuratedPackages,
    treks: [],
    upcomingTours: MeghalayaUpcomingTours,
  },
  nagaland: {
    curatedPackages: NagalandCuratedPackages,
    treks: NagalandTreks,
    upcomingTours: [],
  },
  northbengal: {
    upcomingTours: NorthBengalUpcomingTours,
    curatedPackages:[],
    treks: NorthBengalTreks,
  },
  bhutan: {
    upcomingTours: BhutanUpcomingTours,
    curatedPackages:BhutanCuratedPackages,
    treks: [],
  },
  arunachalpradesh: {
    upcomingTours:[],
    curatedPackages: ArunachalCuratedPackages,
    treks: []
  }
};

const DestinationPage: React.FC = () => {
  const params = useParams();
  const destination = params.destination as string;
  
  const matchingDestination = Destinations.find(
    (dest) => dest.destination === destination
  )
  

  const destinationData =
    destinationDataMap[destination as keyof typeof destinationDataMap];
  if (!destinationData) {
    return (
      <section className='w-full items-center flex flex-1 py-52 lg:py-64 justify-center'>
      <h1 className='displayl text-primary'>Coming Soon!</h1>
    </section>
    )
  }

  const { curatedPackages, treks, upcomingTours } = destinationData;

  return (
    <main className="px-4 bg-[#F6FBF4] md:px-6 flex flex-col">
    {
      matchingDestination && (
        <section
        className={`flex flex-col gap-6 px-4 py-9 min-h-[50vh] md:px-14 md:py-24 md:gap-6 items-center justify-center rounded-xl bg-cover bg-center bg-no-repeat bg-black bg-opacity-30 bg-blend-overlay`}
        style={{backgroundImage:`url(/${matchingDestination.pageImage}.webp)`}}
      >
        <Stack direction={"column"} gap={3}>
          <h2 className="displays md:displayl text-white">
            {matchingDestination.title}
          </h2>
          <p className="bodys md:bodym lg:bodyl text-white">{matchingDestination.desc}</p>
        </Stack>
      </section>
      )
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
};

export default DestinationPage;
