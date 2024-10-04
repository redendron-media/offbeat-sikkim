"use client";
import {
  Stack,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import RotatingLogo from "@/components/animated-logo/page";
import ScrollToSection from "@/components/ScrollToSection/page";
const CustomOutlinedInput = styled(OutlinedInput)({
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#2C322D",
  },
});


const HeroHome= () => {
  const [searchValue, setSearchValue] = useState<String>("");
  const [searchURL, setSearchURL] = useState("");
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    const encodedSearch = encodeURIComponent(newValue.trim());
    setSearchURL(encodedSearch ? `/search?query=${encodedSearch}` : "");
  };

  return (
    <div className="relative h-screen w-full rounded-lg flex items-start justify-center px-4 md:px-14 flex-col gap-4 md:gap-6">
      <motion.div className="absolute  inset-0 w-full z-0">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <Image
          src="/images/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <Stack className="z-10" direction={"column"} gap={1}>
        <h1 className="displays md:displayl text-white">Where to next?</h1>
        <p className="bodym md:titlel text-white">Let us plan your trip</p>
      </Stack>

      <FormControl className="bg-[#F6FBF4] rounded-lg w-full md:w-[96%] lg:w-3/4">
        <CustomOutlinedInput
          id="search"
          value={searchValue}
          onChange={handleInputChange}
          endAdornment={
            <InputAdornment position="end">
              <Link href={searchURL} passHref>
                <IconButton
                  aria-label="Search"
                  disabled={!searchValue.trim()}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </Link>
            </InputAdornment>
          }
          placeholder="Search Destinations, Packages, etc."
        />
      </FormControl>

      <Stack
        className="z-10 flex flex-wrap gap-2"
       
        direction={"row"}
        gap={{ xs: 2, sm: 3 }}
      >
        <Link href={"https://g.co/kgs/ycR2zwv"} target="_blank">
          <Stack
            direction={"row"}
            gap={1}
            className="rounded-[5px] bg-[#FEFEEC] pl-1 pr-2 py-2"
          >
            <Image
              src={"/icons/google.svg"}
              width={40}
              height={31}
              alt="Google"
            />

            <Stack direction={"row"} alignItems={"center"}>
              {[...Array(5)].map((_, index) => (
                <StarIcon key={index} className="text-[#e7c262] text-lg" />
              ))}
            </Stack>
          </Stack>
        </Link>
        <Link
          target="_blank"
          href={
            "https://www.tripadvisor.in/Attraction_Review-g659796-d26790117-Reviews-Offbeatsikkim-Gangtok_East_Sikkim_Sikkim.html"
          }
        >
          <Stack
            direction={"row"}
            gap={1}
            className="rounded-[5px] bg-[#FEFEEC] pl-1 pr-2 py-2"
          >
            <Image
              src={"/icons/tripadvisor.svg"}
              width={40}
              height={31}
              alt="Google"
            />
            <Stack direction={"row"} alignItems={"center"}>
              {[...Array(5)].map((_, index) => (
                <StarIcon key={index} className="text-[#e7c262] text-lg" />
              ))}
            </Stack>
          </Stack>
        </Link>
      </Stack>
      <div className="z-10 h-auto flex absolute bottom-8 left-1/2 transform -translate-x-1/2 justify-center">
      <ScrollToSection targetId="next-section">
          <RotatingLogo />
        </ScrollToSection>
      </div>
    </div>
  );
};

export default HeroHome;
