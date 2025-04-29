import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { team } from "@/constants";
import { Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function about() {
  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] max-w-screen-2xl mx-auto pt-20 md:pt-32">
      <div className="flex flex-col md:flex-row gap-4 px-6">
      <section className="py-[52px] flex flex-col gap-4">
        <h1 className="text-secondary-oncontainer headlines md:displays lg:displaym">
          Our Mission
        </h1>
        <p className="text-black bodym md:bodyl">
          Our mission is to help travelers find and explore the natural beauty
          of the most Offbeat locations of Northeast India, promote the rural
          tourism market and preserve their identity and heritage, and help the
          economic development of Northeast India.
        </p>
      </section>

      <section className="px-4 bg-[url('../public/images/vision.jpg')] bg-cover bg-bottom bg-no-repeat rounded-lg flex flex-col py-[52px] md:px-6  gap-4 md:gap-9 lg:gap-4">
        <h1 className="text-white headlines md:displays lg:displaym">
          Our Vision
        </h1>
        <p className="bodym md:bodyl text-[#EDF2EB]">
          We aspire to build a community around travel enthusiasts who want to
          explore the natural beauty of Northeast India in the most radical way, by
          providing them the best travel experiences and guidance while helping
          promote eco-tourism and most of all, Offbeat tourism.
        </p>
      </section>
      </div>
      {/* <section className="py-[52px] flex flex-col gap-4">
        <h1 className="text-secondary-oncontainer headlines md:displays lg:displaym">
          Our Mission
        </h1>
        <p className="text-black bodym md:bodyl">
          Our mission is to help travelers find and explore the natural beauty
          of the most Offbeat locations of Northeast India, promote the rural
          tourism market and preserve their identity and heritage, and help the
          economic development of Northeast India.
        </p>
      </section>

      <section className="px-4 bg-[url('../public/images/vision.jpg')] bg-cover bg-center bg-no-repeat rounded-lg flex flex-col py-[76px] md:px-6 lg:py-24 xl:py-32   gap-4 md:gap-9 lg:gap-4">
        <h1 className="text-white headlines md:displays lg:displaym lg:pt-14">
          Our Vision
        </h1>
        <p className="bodym md:bodyl lg:pb-14 text-[#EDF2EB]">
          We aspire to build a community around travel enthusiasts who want to
          explore the natural beauty of Northeast India in the most radical way, by
          providing them the best travel experiences and guidance while helping
          promote eco-tourism and most of all, Offbeat tourism.
        </p>
      </section> */}

      <section className="py-[52px] md:py-[76px] md:px-6 flex flex-col gap-4 md:gap-9 lg:gap-4">
        <h1 className="headlines md:displays lg:displaym text-secondary-oncontainer">
          Our Values
        </h1>
        <ul className="list-disc list-outside space-y-4 bodym md:bodyl text-black pl-4">
          <li className="">
            We strive to be a reliable brand where everything the client asks
            can be answered throughout their travel experience. We strive to
            ensure that every travel experience we plan is prepared with
            foresight.
          </li>
          <li>
            We strive to infuse creativity into our day to day activities, and
            therefore to innovate solutions for our business and provide the
            best service for our clients.
          </li>
          <li>
            We strive to minimise the negative impacts on the planet in each and
            every part of our operations.
          </li>
          <li>
            We strive to create safe, seamless and sustainable travel
            experiences for our customers, while helping them get the most value
            for money.
          </li>
          <li>We strive to create smooth experiences for our customers.</li>
          <li>
            We strive to provide job opportunities to the rural population, and
            educate the community about ecotourism.
          </li>
        </ul>
      </section>
      <section className="py-[52px] flex flex-col gap-4">
        <h1 className="headlines md:displays lg:displaym text-secondary-oncontainer text-center">
          Our Team
        </h1>
        <div className="w-full overflow-hidden lg:hidden">
          <Carousel>
            <CarouselContent className="flex ml-0 relative ">
              {team.map((item) => (
                <CarouselItem key={item.id} className="basis-auto px-4 py-2">
                  <div
                    key={item.id}
                    className="relative snap-center flex-shrink-0 w-fit h-[369px] bg-[#f5f5f5] rounded-[10px] text-center shadow-cardShadow flex flex-col px-6 py-6 gap-3"
                  >
                    <div className="relative aspect-square w-full">
                    <Image
                      src={`/images/${item.image}.png`}
                     fill
                      alt={item.name}
                      className="rounded-full object-cover"
                    />
                    </div>
                   
                    <Stack direction={"column"} gap={1} width={244}>
                      <h3 className="text-[#051e13] font-bold text-lg ">
                        {item.name}
                      </h3>
                      <p className="text-[#051e13 text-[13px]">{item.role}</p>
                    </Stack>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="hidden w-full lg:flex flex-col items-center justify-center gap-8">
  {/* First Row (First 3 items) */}
  <div className="flex flex-row flex-wrap gap-6 xl:gap-8 items-center justify-center">
    {team.slice(0, 3).map((item) => (
      <div
        key={item.id}
        className="w-[292px] h-[369px] md:w-[240px] items-center lg:w-[292px] bg-[#f5f5f5] rounded-[10px] text-center shadow-lg flex flex-col px-6 py-6 gap-3 md:gap-0 lg:gap-3"
      >
        <div className="relative aspect-square w-full">
          <Image src={`/images/${item.image}.png`} className="rounded-full object-cover object-center" fill alt={item.name} />
        </div>
        <Stack direction="column" gap={1} width={244}>
          <h3 className="text-[#051e13] font-bold text-lg">{item.name}</h3>
          <p className="text-[#051e13] text-[13px]">{item.role}</p>
        </Stack>
      </div>
    ))}
  </div>

  {/* Second Row (Last 2 items) */}
  <div className="flex flex-row flex-wrap gap-6 xl:gap-8 items-center justify-center">
    {team.slice(3).map((item) => (
      <div
        key={item.id}
        className="w-[292px] h-[369px] md:w-[240px] items-center lg:w-[292px] bg-[#f5f5f5] rounded-[10px] text-center shadow-lg flex flex-col px-6 py-6 gap-3 md:gap-0 lg:gap-3"
      >
        <div className="relative aspect-square w-full">
          <Image src={`/images/${item.image}.png`} className="rounded-full object-cover object-center" fill alt={item.name} />
        </div>
        <Stack direction="column" gap={1} width={244}>
          <h3 className="text-[#051e13] font-bold text-lg">{item.name}</h3>
          <p className="text-[#051e13] text-[13px]">{item.role}</p>
        </Stack>
      </div>
    ))}
  </div>
</div>

      </section>
      <section className="flex flex-col justify-center items-center w-full gap-6 py-[60px] md:py-[88px]">
        <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
          Have a Question?
        </h2>
        <p className="bodym md:titles text-[#202822] text-center">
          Reach out to us for your travel planning needs.
        </p>
        <Link href="Contact">
          <Button className="w-fit">Contact Us</Button>
        </Link>
      </section>
    </main>
  );
}

export default about;
