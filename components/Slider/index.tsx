"use client";
import React, { FC, useState } from "react";
import Cards from "../Cards";
import { CardTrip } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Chip } from "@mui/material";
interface SliderProps {
  items: CardTrip[];
}

const Sliderr: FC<SliderProps> = ({ items }) => {
  const [filter, setFilter] = useState<"all" | "tour" | "trek">("all");

  const isUpcoming = items.some((item) => item.tripType === "upcoming");

   const filteredItems = items.filter((item) => {
    if (!isUpcoming) return true;
    if (filter === "all") return true;
    if (filter === "trek") return item.link?.endsWith("trek");
    if (filter === "tour") return !item.link?.endsWith("trek");
  });
  return (
   <div className="relative w-full overflow-hidden ">
    
    {isUpcoming && (
        <div className="flex pl-3 gap-4 mb-6">
          <Chip
            className="text-primary px-2 py-1 labell"
            label="All"
            clickable
            onClick={() => setFilter("all")}
            variant={
              filter === "all"? "filled":"outlined"
            }
            sx={{
              ...(filter === "all"
                ? {
                    backgroundColor: "primary.main",
                    color: "white",
                    "& .MuiChip-label": { color: "white" },
                  }
                : {
                    borderColor: "primary.main",
                    color: "primary.main",
                    "& .MuiChip-label": { color: "primary.main" },
                  }),
              "&:hover": {
                backgroundColor: filter === "all"
                  ? "primary.dark"
                  : "rgba(25, 169, 108, 0.1)",
              },
            }}
        
          />
          <Chip
            className="text-primary"
            label="Tours"
            clickable
            onClick={() => setFilter("tour")}
            variant={
              filter === "tour"? "filled":"outlined"
            }
            sx={{
              ...(filter === "tour"
                ? {
                    backgroundColor: "primary.main",
                    color: "white",
                    "& .MuiChip-label": { color: "white" },
                  }
                : {
                    borderColor: "primary.main",
                    color: "primary.main",
                    "& .MuiChip-label": { color: "primary.main" },
                  }),
              "&:hover": {
                backgroundColor: filter === "tour"
                  ? "primary.dark"
                  : "rgba(25, 169, 108, 0.1)",
              },
            }}
        
          />
          <Chip
            className="text-primary"
            label="Treks"
            clickable
            onClick={() => setFilter("trek")}
            variant={
              filter === "trek"? "filled":"outlined"
            }
            sx={{
              ...(filter === "trek"
                ? {
                    backgroundColor: "primary.main",
                    color: "white",
                    "& .MuiChip-label": { color: "white" },
                  }
                : {
                    borderColor: "primary.main",
                    color: "primary.main",
                    "& .MuiChip-label": { color: "primary.main" },
                  }),
              "&:hover": {
                backgroundColor: filter === "trek"
                  ? "primary.dark"
                  : "rgba(25, 169, 108, 0.1)",
              },
            }}
        
          />
        </div>
      )}

    <Carousel>
      <CarouselContent className="flex ml-0">
      {filteredItems.map((tour, index) => (
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
