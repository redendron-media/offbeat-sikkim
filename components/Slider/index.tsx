"use client";
import React, { FC } from "react";
import Cards from "../Cards";
import { CardTrip } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
interface SliderProps {
  items: CardTrip[];
}

const Sliderr: FC<SliderProps> = ({ items }) => {
  return (
   <div className="relative w-full overflow-hidden ">
    <Carousel>
      <CarouselContent className="flex ml-0">
      {items.map((tour, index) => (
            <CarouselItem key={index} className="basis-auto px-4 py-2">
               <Cards card={tour} />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
   </div>
  );
};

export default Sliderr;
