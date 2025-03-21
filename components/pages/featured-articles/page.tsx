import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import BlogCard from "@/components/blogcard/page";
import { BlogCardType } from "@/lib/types";

interface BlogProps {
  items: BlogCardType[];
}

const FeaturedArticles: React.FC<BlogProps> = ({ items }) => {
  return (
    <section className="relative px-4 md:px-6 py-16 md:py-24 rounded-lg flex flex-col gap-4 md:gap-6">
      <h2 className="headlines md:displaym text-black z-10">
        Featured Articles
      </h2>
      <p className="bodyl z-10 text-black">
        Check out Offbeat Sikkim&apos;s Blog for tips, stories and expert advice
        on himalayan adventures.
      </p>
      <Carousel>
        <CarouselContent className="flex ml-0">
          {items.map((item, index) => (
            <CarouselItem key={index} className="basis-auto px-4 py-2">
              <BlogCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Link className="z-10" href={"/blog"}>
        <Button className="w-fit">Explore Articles</Button>
      </Link>
    </section>
  );
};

export default FeaturedArticles;
