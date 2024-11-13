"use client";
import React, { FC, useState } from "react";
import Cards from "../Cards";
import { CardTrip } from "@/lib/types";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Chip } from "@mui/material";
interface SliderProps {
  items: CardTrip[];
}
type FilterType = string;

const formatDestination = (destination: string): string => {
  const formatted = destination
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/arunachalpradesh/i, "Arunachal Pradesh")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return formatted;
};
const Sliderr: FC<SliderProps> = ({ items }) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const isUpcoming = items.some((item) => item.tripType === "upcoming");
  const isCurated = items.some((item) => item.tripType === "curated");
  const isDestination = items.some((item) => item.tripType === "destination");

  const uniqueDestinations = Array.from(
    new Set(
      items
        .map((item) => item.destination)
        .filter((dest): dest is string => !!dest)
    )
  );

  const priorityDestinations = ["bhutan", "meghalaya", "sikkim"];

  const sortedDestinations = [
    ...priorityDestinations.filter((dest) => uniqueDestinations.includes(dest)),
    ...uniqueDestinations
      .filter((dest) => !priorityDestinations.includes(dest))
      .sort(),
  ];

  const upcomingTypes = Array.from(
    new Set(
      items
        .filter((item) => item.tripType === "upcoming")
        .map((item) => (item.link?.endsWith("trek") ? "trek" : "tour"))
    )
  );

  const filteredItems = items.filter((item) => {
    if (!isUpcoming && !isCurated && !isDestination) return true;
    if (filter === "all") return true;
    if (filter === "trek") return item.link?.endsWith("trek");
    if (filter === "tour") return !item.link?.endsWith("trek");
    if (filter === "domestic") return item.type === "domestic";
    if (filter === "international") return item.type === "international";
    return item.destination === filter;
  });
  return (
    <div className="relative w-full">
      {isUpcoming && upcomingTypes.length > 1 && (
        <div className="flex pl-3 gap-2 md:gap-4 mb-6">
          <Chip
            className="text-primary px-2 py-1 labell"
            label="All"
            clickable
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "filled" : "outlined"}
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
                backgroundColor:
                  filter === "all" ? "primary.dark" : "rgba(25, 169, 108, 0.1)",
              },
            }}
          />
          <Chip
            className="text-primary"
            label="Tours"
            clickable
            onClick={() => setFilter("tour")}
            variant={filter === "tour" ? "filled" : "outlined"}
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
                backgroundColor:
                  filter === "tour"
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
            variant={filter === "trek" ? "filled" : "outlined"}
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
                backgroundColor:
                  filter === "trek"
                    ? "primary.dark"
                    : "rgba(25, 169, 108, 0.1)",
              },
            }}
          />
        </div>
      )}

      {isCurated && sortedDestinations.length > 1 && (
        <div className="flex pl-3 gap-2 md:gap-4 mb-6 overflow-scroll hide-scrollbar">
          <Chip
            className="text-primary px-2 py-1 labell"
            label="All"
            clickable
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "filled" : "outlined"}
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
                backgroundColor:
                  filter === "all" ? "primary.dark" : "rgba(25, 169, 108, 0.1)",
              },
            }}
          />
          {sortedDestinations.map((destination) => (
            <Chip
              key={destination}
              className="text-primary"
              label={formatDestination(destination)}
              clickable
              onClick={() => setFilter(destination)}
              variant={filter === destination ? "filled" : "outlined"}
              sx={{
                ...(filter === destination
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
                  backgroundColor:
                    filter === destination
                      ? "primary.dark"
                      : "rgba(25, 169, 108, 0.1)",
                },
              }}
            />
          ))}
        </div>
      )}
      {isDestination && (
        <div className="flex pl-3 gap-2 md:gap-4 mb-6">
          <Chip
            className="text-primary px-2 py-1 labell"
            label="All"
            clickable
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "filled" : "outlined"}
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
                backgroundColor:
                  filter === "all" ? "primary.dark" : "rgba(25, 169, 108, 0.1)",
              },
            }}
          />
          <Chip
            className="text-primary"
            label="Domestic"
            clickable
            onClick={() => setFilter("domestic")}
            variant={filter === "domestic" ? "filled" : "outlined"}
            sx={{
              ...(filter === "domestic"
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
                backgroundColor:
                  filter === "domestic"
                    ? "primary.dark"
                    : "rgba(25, 169, 108, 0.1)",
              },
            }}
          />
          <Chip
            className="text-primary"
            label="International"
            clickable
            onClick={() => setFilter("international")}
            variant={filter === "international" ? "filled" : "outlined"}
            sx={{
              ...(filter === "international"
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
                backgroundColor:
                  filter === "international"
                    ? "primary.dark"
                    : "rgba(25, 169, 108, 0.1)",
              },
            }}
          />
        </div>
      )}
      <Carousel>
        <CarouselContent className="flex ml-0">
          {filteredItems.map((tour, index) => {
            // Construct the link based on tripType
            const link =
              tour.tripType === "destination" && tour.link
                ? `/destinations/${tour.link}`
                : tour.link;

            return (
              <CarouselItem key={index} className="basis-auto px-4 py-2">
                <Cards card={{ ...tour, link }} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Sliderr;
