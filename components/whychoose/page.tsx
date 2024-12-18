"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WhyChoose = () => {
  const [expanded, setExpanded] = React.useState<string | false>("1");
  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <section className="relative px-4 md:px-6 py-16 md:py-24 rounded-lg flex flex-col gap-4 md:gap-6">
      <div className="absolute inset-0 w-full z-0 ">
        <Image
          src={"/images/nagaland/5.webp"}
          alt="Hero Background"
          fill
          className="rounded-lg object-cover"
          loading="lazy"
        />
      </div>
      <div className="bg-black/40 absolute inset-0 rounded-lg" />
      <h2 className="headlines md:displaym text-white z-10 line-clamp-2 text-balance">
        Why Choose <span className="text-primary">Offbeat Sikkim?</span>
      </h2>

      <Accordion
        key="1"
        expanded={expanded === '1'}
        onChange={handleChange('1')}
        defaultExpanded={Number("1") === 1}
        className="bg-transparent border-none shadow-none z-10"
      >
        <AccordionSummary
          className="px-2 bg-transparent border-none"
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls={`panel1-content`}
          id={`panel1-header`}
        >
          <p className="font-semibold bodym z-10 text-[#F3FCF2]">
            Expertise in Offbeat Destinations
          </p>
        </AccordionSummary>
        <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#F3FCF2]">
          <p>
            We specialize in showcasing the unexplored beauty of Northeast
            India, providing authentic experiences in untouched locations.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        key="2"
        expanded={expanded === '2'}
        onChange={handleChange('2')}
        className="bg-transparent border-none shadow-none z-10"
      >
        <AccordionSummary
          className="px-2 bg-transparent border-none"
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls={`panel1-content`}
          id={`panel1-header`}
        >
          <p className="font-semibold bodym z-10 text-[#F3FCF2]">
            Tailored Experiences
          </p>
        </AccordionSummary>
        <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#F3FCF2]">
          <p>
            Every trip is curated with meticulous attention to detail, ensuring
            personalized itineraries that cater to your preferences
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        key="3"
        expanded={expanded === '3'}
        onChange={handleChange('3')}
        className="bg-transparent border-none shadow-none z-10"
      >
        <AccordionSummary
          className="px-2 bg-transparent border-none"
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls={`panel1-content`}
          id={`panel1-header`}
        >
          <p className="font-semibold bodym z-10 text-[#F3FCF2]">
            Community Support
          </p>
        </AccordionSummary>
        <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#F3FCF2]">
          <p>
            We actively contribute to rural development by creating job
            opportunities and promoting cultural tourism.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        key="4"
        expanded={expanded === '4'}
        onChange={handleChange('4')}
        className="bg-transparent border-none shadow-none z-10"
      >
        <AccordionSummary
          className="px-2 bg-transparent border-none"
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls={`panel1-content`}
          id={`panel1-header`}
        >
          <p className="font-semibold bodym z-10 text-[#F3FCF2]">
            Seamless Planning
          </p>
        </AccordionSummary>
        <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#F3FCF2]">
          <p>
            From start to finish, our team ensures a hassle-free and memorable
            travel experience with reliable and innovative solutions.
          </p>
        </AccordionDetails>
      </Accordion>

      <Link className="z-10" href={"/packages"}>
        <Button className="w-fit">Explore Packages</Button>
      </Link>
    </section>
  );
};

export default WhyChoose;
