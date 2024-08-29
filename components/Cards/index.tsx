import React from "react";
import Card from "@mui/material/Card";
import Image from "next/image";
import { IconButton} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import { CardProps } from "@/lib/types";

type TourCardProps = {
  card: CardProps;
};

const Cards = ({ card }: TourCardProps) => {
  if (!card) {
    return <></>;
  }
  const link = card.link
    ? card.link
    : card.destination
    ? `destinations/${card.destination}`
    : "";

    const isCurated = link.startsWith("curated");
  return (
    <Link href={`/packages/${link}`} className="cursor-pointer">
      <Card className="w-[232px] h-fit md:w-[289px] lg:w-[292px] lg:h-fit rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow ">
        <div className="relative w-full h-[269px] md:h-[364px]">
          <Image
            src={`/${card.cover ? card.cover:  card.image}.webp`}
            className="object-cover rounded-b-lg select-none"
            fill
            alt={card.title}
            quality={75}
            loading="lazy"
          />
          {
            isCurated && (
              <div className="absolute top-0 left-0 bg-primary rounded-br-xl text-white labell py-1.5 px-4">Customized</div>
            )
          }
        </div>
        <div className="px-2 py-5 text-[#051E13] flex justify-between items-end">
          <div className="flex flex-col  space-y-1">
            <h2 className="titles justify-self-end md:titlem min-h-10 md:min-h-12">
              {card.title}
            </h2>
            {card.durationn && (
              <p className="bodys">
                {card.durationn} Nights {card.durationd} Days
              </p>
            )}
            {card.costDouble && (
              <p className="labell">Starts at INR {card.costDouble}/-</p>
            )}
            {card.currentPrice && (
              <>
                <h4 className="labell text-pretty">Starts at INR {card.currentPrice}/-
                   {card.originalPrice && (
                  <span className="bodys line-through"> INR {card.originalPrice}/-</span>
                )} 
                   </h4>
              </>
            )}       
          </div>
          <Link href={`/packages/${link}`}>
            <IconButton className="bg-primary hover:bg-primary/80">
              <ArrowForwardIcon className="text-white text-[28px] md:text-[32px]" />
            </IconButton>
          </Link>
        </div>
      </Card>
    </Link>
  );
};

export default Cards;
