"use client";
import { photoGallery } from "@/lib/types";
import Image from "next/image";
import React, { FC, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

interface GalleryProps {
  items: photoGallery[];
}

const PhotoGallery: FC<GalleryProps> = ({ items }) => {
  return (
    <div className="w-full overflow-hidden ">
      <Carousel>
        <CarouselContent className="flex ml-0 relative ">
          {items.map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-auto px-4 py-2">
              <div
                className="relative snap-center flex-shrink-0 w-[232px] h-[269px] md:h-[364px] md:w-[289px] lg:w-[292px]"
                key={index}
              >
                <Image
                  src={`/${image.images}.webp`}
                  alt={image.title}
                  fill
                 
                  loading="lazy"
                  className="object-cover select-none"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PhotoGallery;
