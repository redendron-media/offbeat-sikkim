'use client';
import { FakeTestimonial } from "@/constants/testimonials";
import React from "react";
import TestimonialCard from "./testimonialCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Testimonials = () => {


  return (
    <section className="py-[76px] md:pl-6 lg:pl-0 flex flex-col gap-6">
      <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
      What our guests are saying
      </h2>
      <div className=" w-full overflow-hidden ">
      <Carousel>
        <CarouselContent className="flex ml-0 relative ">
        {FakeTestimonial.map((testimonial, index) => (
           <CarouselItem
           key={index}
           className="basis-auto px-4 py-2">
             <TestimonialCard card={testimonial} />
            </CarouselItem>
    
        ))}
          </CarouselContent>
          </Carousel>
          </div>
    </section>
  );
};

export default Testimonials;
