import React from "react";
import Card from "@mui/material/Card";
import Image from "next/image";
import Link from "next/link";
import { CardTrip } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
type TourCardProps = {
  card: CardTrip;
};

const Cards = ({ card }: TourCardProps) => {

  if (!card || !card.link) {
    console.error("Card or link is undefined", card);
    return null;
  }

  const link = !card.tripType ? `destinations/${card.link}` : card.link;
  const isCurated = card.tripType === "curated";
  return (
    <Link href={`/packages/${link}`} className="cursor-pointer">
      <Card className="w-[232px] group h-fit md:w-[289px] lg:w-[292px] lg:h-fit rounded-lg lg:rounded-2xl bg-[#F8FCFA] hover:shadow-cardShadow ">
        <div className="relative w-full h-[350px] md:h-[400px] aboslute left-0 inset-0 z-10">
          <Image
            src={urlFor(card.cover).url()}
            // src={'/images/featured-articles.webp'}
            className="object-cover rounded-b-lg select-none group-hover:scale-105 duration-700 transition-transform"
            fill
            alt={card.title}
            quality={75}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-40" />
          {isCurated && (
            <div className="absolute top-0 z-40 left-0 bg-[#FFFF00] rounded-br-xl text-black labell py-1.5 px-2 md:px-4">
              Customized
            </div>
          )}
          {card.bestseller === true && (
            <div className="absolute top-0 z-40 left-0 bg-[#FFFF00] rounded-br-xl text-black labell py-1.5 px-2 md:px-4">
              Bestseller
            </div>
          )}
          <div className="absolute bottom-0 z-40 py-5 text-white ">
          <div className="flex flex-col w-full">
          {/* {card.durationn && (
              <div className="px-2 py-1.5 bg-[#FFFF00] text-black w-fit rounded-e-lg shadow-lg mb-2">
                <p className="bodys">
                  {card.durationn} Nights {card.durationd} Days
                </p>
              </div>
            )} */}
            <h2 className="headlinem justify-self-end px-2 md:px-4 w-full ">
              {card.title}
            </h2>
            {
              card.durationn && (
                <div className="px-2 md:px-4 mt-2">
                  <AccessTimeFilledIcon className="text-primary text-base" />
                  <span className="bodys text-white"> {card.durationn}N {card.durationd}D</span>
                </div>
              )
            }
          
            {card.currentPrice && (
              <div className="px-2 md:px-4 py-1 mt-4 bg-primary-container text-black w-fit rounded-e-lg">
                <h4 className="labelm md:labell text-pretty">
                  Starts at INR {card.currentPrice}/-
                  {card.originalPrice && (
                    <span className="bodys line-through">
                      {" "}
                      INR {card.originalPrice}/-
                    </span>
                  )}
                </h4>
              </div>
            )}
          </div>
          {/* <IconButton
            onClick={() => router.push(`/packages/${link}`)}
            className="bg-primary mx-2 hover:bg-primary/80"
          >
            <ArrowForwardIcon className="text-white text-[28px] md:text-[32px]" />
          </IconButton> */}
        </div>
        </div>
        
      </Card>
    </Link>
  );
};

export default Cards;
