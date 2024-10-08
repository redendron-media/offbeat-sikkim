import ContactDialog from "@/components/contact-dialog/page";
import Custom_Form from "@/components/custom-itinerary/custom-itinerary-form";
import Testimonials from "@/components/pages/Testimonials/page";
import Sliderr from "@/components/Slider";
import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
} from "@mui/material";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import { blog } from "@/schemaTypes/blog";
import { blogCard } from "@/lib/types";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PortableText, PortableTextComponents } from "next-sanity";
import ViewMore from "@/components/viewmore-box/page";
interface DestinationPageProps {
  params: { link: string };
}

export const revalidate =60;

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
    "link": destination,
     faq,
      bestTime,
      thingsToDo,
      reach,
      festivals,
      topten,
      permit
  },
   "blogs": *[_type == "blog" && (title match "${link}" || caption match "${link}")] {
      title,
      caption,
      titleImage,
      "currentSlug": slug.current,
      _createdAt
    }
}
`;

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { link } = params;

  const data = await client.fetch(query(link));

  const curatedPackages = data.curatedPackages || [];
  const treks = data.treks || [];
  const upcomingTours = data.upcomingTours || [];
  const destinationDetails = data.destinationDetails[0] || {};
  const blogs = data.blogs || [];

  function formatDate(dateString: string) {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  return (
    <main className="px-4 bg-[#F6FBF4] md:px-6 pt-20 md:pt-32 flex flex-col">
      {
        <section
          className={`relative flex flex-col gap-6 px-4 py-9 min-h-[50vh] md:px-14 md:py-24 md:gap-6 items-center justify-center rounded-xl`}
        >
          <div className="absolute  inset-0 w-full z-0">
            <div className="absolute inset-0 bg-black/40 z-10" />
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

      {blogs.length > 0 && (
        <section className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
          <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            Related Blogs
          </h2>
          <div className="flex w-full flex-row flex-wrap  gap-8">
            {blogs.map((blog: blogCard, index: number) => (
              <Link
                key={index}
                href={`/blog/${blog.currentSlug}`}
                className="w-full lg:w-[45%]"
              >
                <div
                  key={blog.title}
                  className="h-full w-full rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow pb-4"
                >
                  <div className="w-full h-[240px] md:h-[600px] relative">
                    <Image
                      src={urlFor(blog.titleImage).url()}
                      fill
                      loading="lazy"
                      alt={blog.title}
                      className="rounded-lg object-cover lg:rounded-[10px]"
                    />
                  </div>
                  <div className="px-4 pt-4 space-y-1 text-[#051E13]">
                    <div className="flex flex-row gap-3 flex-wrap pb-3">
                      {blog.tags?.map((tag) => (
                        <Link href={`/tags/${tag.slug}`} passHref key={tag._id}>
                          <Chip
                            component="a"
                            label={tag.name}
                            clickable
                            sx={{
                              backgroundColor: "primary.main",
                              "&:hover": {
                                backgroundColor: "primary.dark",
                              },
                              "& .MuiChip-label": {
                                color: "white",
                              },

                              fontSize: "0.75rem",
                              padding: "6px",
                            }}
                          />
                        </Link>
                      ))}
                    </div>
                    <p className="labels text-[#404942]">
                      {formatDate(
                        new Date(blog._createdAt).toISOString().split("T")[0]
                      )}
                    </p>
                    <h2 className="titles line-clamp-2 md:titlel font-bold">
                      {blog.title}
                    </h2>
                    <p className="labell line-clamp-2 overflow-ellipsis select-none">
                      {blog.caption}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {}

      {destinationDetails.faq && (
        <section className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
          <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            Frequently Asked Questions
          </h2>
          <section className="bg-[#E4EAE3] py-6 space-y-6 rounded-xl px-4 md:px-6">
            {destinationDetails.faq.map(
              (faq: { question: string; answer: string }, key: number) => (
                <Accordion
                  key={`${key}`}
                  className="bg-transparent border-none shadow-none"
                >
                  <AccordionSummary
                    className="px-2"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel1-content`}
                    id={`panel1-header`}
                  >
                    <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
                      {faq.question}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
                    <p>{faq.answer}</p>
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </section>
        </section>
      )}

      <div className="flex flex-col gap-6">
        {destinationDetails.bestTime && (
          <ViewMore
            text="Best time to visit"
            title={destinationDetails.title}
            content={destinationDetails.bestTime}
          />
        )}
        {destinationDetails.thingsToDo && (
          <ViewMore
            text="Things to do in"
            title={destinationDetails.title}
            content={destinationDetails.thingsToDo}
          />
        )}
        {destinationDetails.reach && (
          <ViewMore
            text="How to reach"
            title={destinationDetails.title}
            content={destinationDetails.reach}
          />
        )}
        {destinationDetails.festivals && (
          <ViewMore
            text="Major festivals of"
            title={destinationDetails.title}
            content={destinationDetails.festivals}
          />
        )}
        {destinationDetails.topten && (
          <ViewMore
            text="Top ten places to visit in"
            title={destinationDetails.title}
            content={destinationDetails.topten}
          />
        )}
        {
          destinationDetails.permit && (
            <ViewMore
            text="Would you need any permit/permission when you travel to"
            title={destinationDetails.title}
            content={destinationDetails.permit}
          />
          )
        }
      </div>

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
