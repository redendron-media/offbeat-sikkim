'use client';
import { FakeTestimonial } from "@/constants/testimonials";
import React from "react";
import TestimonialCard from "./testimonialCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Marquee

 } from "@/components/magicui/marquee";
const Testimonials = () => {
const firstRow = FakeTestimonial.slice(0, FakeTestimonial.length / 2);
const secondRow = FakeTestimonial.slice(FakeTestimonial.length / 2);

  return (
    <section className="py-[76px] md:pl-6 lg:pl-0 flex flex-col gap-6">
      <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
      What our guests are saying
      </h2>
      <Marquee pauseOnHover className="[--duration:40s]">
        {FakeTestimonial.map((review,index) => (
          <TestimonialCard card={review} key={index} />
        ))}
      </Marquee>
      {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review,index) => (
           <TestimonialCard card={review} key={index} />
        ))}
      </Marquee> */}
      <div className=" w-full overflow-hidden ">
      {/* <Carousel>
        <CarouselContent className="flex ml-0 relative ">
        {FakeTestimonial.map((testimonial, index) => (
           <CarouselItem
           key={index}
           className="basis-auto px-4 py-2">
             <TestimonialCard card={testimonial} />
            </CarouselItem>
    
        ))}
          </CarouselContent>
          </Carousel> */}
          </div>
    </section>
  );
};

export default Testimonials;
