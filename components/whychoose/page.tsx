"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

import WhyChooseCard from "../whychoosecard/page";

const WhyChoose = () => {
  const [expanded, setExpanded] = React.useState<string | false>("1");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <section className="relative px-4 md:px-6 py-16 md:py-24 rounded-lg flex flex-col gap-4 md:gap-6">
      <h2 className="headlines md:displaym text-black z-10 mb-2 text-balance">
        Why Choose <span className="text-primary">Offbeat Sikkim?</span>
      </h2>

    <WhyChooseCard/>
    

      <Link className="z-10" href={"/packages"}>
        <Button className="w-fit">Explore Packages</Button>
      </Link>
    </section>
  );
};

export default WhyChoose;
