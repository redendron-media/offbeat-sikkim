"use client";
import {
  Stack,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  styled,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import RotatingLogo from "@/components/animated-logo/page";
import ScrollToSection from "@/components/ScrollToSection/page";
import { useRouter } from "next/navigation";
const CustomOutlinedInput = styled(OutlinedInput)({
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#2C322D",
  },
  "& .MuiOutlinedInput-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #F6FBF4 inset",
    WebkitTextFillColor: "#404942",
  },
});

const HeroHome = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [daysValue, setDaysValue] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    setSearchValue(newValue);
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDaysValue(event.target.value);
  };

  const getSearchURL = (input: string, days: string): string => {
    const encodedSearch = encodeURIComponent(input.trim());
    const encodedDays = encodeURIComponent(days.trim());
    return encodedSearch || encodedDays
      ? `/search?query=${encodedSearch}&days=${encodedDays}`
      : "";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchValue.trim()) {
      const searchURL = getSearchURL(searchValue, daysValue);
      if (searchURL) {
        router.push(searchURL);
      }
    }
  };
  const text = "Where to next?";

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  return (
    <div className="relative h-screen w-full rounded-lg flex items-start justify-center px-4 md:px-14 flex-col gap-4 md:gap-6">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <motion.div className="absolute  inset-0 w-full z-0">
        <div className="absolute inset-0 bg-black/20 z-10 " />
        <Image
          src="/images/hero.webp"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      </div>
     

      <Stack className="z-10" direction={"column"} gap={1}>
        <h1 className="displays md:displayl text-white">
          {text.split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 3,
                delay: index * 0.15,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </Stack>
        
      <div className="w-full md:w-[96%] lg:w-3/4 flex flex-col items-center gap-2 z-10">
        <motion.div
       className="flex flex-row w-full flex-grow overflow-hidden"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <FormControl className="w-[45%] md:w-1/4 bg-[#F6FBF4] border-none rounded-s-lg rounded-e-none">
        <CustomOutlinedInput
              value={daysValue}
              onChange={handleDaysChange}
              type="number"
              placeholder="Duration(days)"
              className="w-full bg-[#F6FBF4] labell md:bodyl rounded-s-lg rounded-e-none"
              sx={{
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield", // Firefox
                },
              }}
            />
        </FormControl>

        <CustomOutlinedInput
          id="search"
          className="w-full rounded-e-lg rounded-s-none bg-[#F6FBF4] labell md:bodyl"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          endAdornment={
            <InputAdornment position="end" className="pr-2">
              <Link href={getSearchURL(searchValue, daysValue)} passHref>
                <IconButton
                  aria-label="Search"
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
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
      </motion.div>
      </div>
    

      <motion.div
        initial={{
          opacity:0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
        className="z-10"
      >
        <Stack
          className=" flex flex-wrap gap-2"
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
      </motion.div>

      <motion.div 
      className="z-10 h-auto flex absolute items-center bottom-24 md:bottom-8 transform justify-center left-1/2 -translate-x-1/2 right-1/2"
      initial= {{
        opacity:0,
      }}
      animate={{
        opacity:1, 
      }}
      transition={{
        duration:3,
        ease:"easeIn"
      }}
      >
        <ScrollToSection targetId="next-section">
          <RotatingLogo />
        </ScrollToSection>
      </motion.div>
    </div>
  );
};

export default HeroHome;
