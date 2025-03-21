import Link from "next/link";
import React from "react";
import Card from "@mui/material/Card";
import Image from "next/image";
import { BlogCardType } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import { Chip } from "@mui/material";

interface BlogProps {
  item: BlogCardType;
}

const BlogCard: React.FC<BlogProps> = ({ item }) => {
  function formatDate(dateString: string) {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }
  return (
    <Link href={`/blog/${item.currentSlug}`} className="cursor-pointer">
      <Card className="w-[232px] space-y-4 md:w-[289px] lg:w-[292px] h-[350px] md:h-[400px] rounded-lg lg:rounded-2xl bg-[#F8FCFA] hover:shadow-cardShadow ">
        <div className="relative w-full h-[250px] md:h-[300px] aboslute left-0 inset-0 z-10">
          <Image
            src={urlFor(item.titleImage).url()}
            className="object-cover select-none"
            fill
            alt={item.title}
            quality={75}
            loading="lazy"
          />
        </div>
        <div className="flex relative flex-col gap-2 w-full">
          <h2 className="titlem font-semibold justify-self-end min-h-12 line-clamp-2 px-2 md:px-4 w-full ">
            {item.title}
          </h2>
          <p className="labels  px-2 md:px-4 text-[#404942]">
            {formatDate(new Date(item._createdAt).toISOString().split("T")[0])}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
