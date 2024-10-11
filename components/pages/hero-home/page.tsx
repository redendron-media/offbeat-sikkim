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
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [searchURL, setSearchURL] = useState("");
  const router = useRouter();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    setSearchValue(newValue);
  };

  const handleMonthChange = (event: SelectChangeEvent<string>): void => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
  };

  const getSearchURL = (input: string, month: string): string => {
    const encodedSearch = encodeURIComponent(input.trim());
    const encodedMonth = encodeURIComponent(month.trim());
    return encodedSearch || encodedMonth
      ? `/search?query=${encodedSearch}&month=${encodedMonth}`
      : "";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchValue.trim()) {
      const searchURL = getSearchURL(searchValue, selectedMonth);
      if (searchURL) {
        router.push(searchURL); // Trigger the search by navigating to the search URL
      }
    }
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
      </Stack>

      <div className=" w-full md:w-[96%] lg:w-3/4 flex flex-row ">
        <FormControl className="w-[90%] md:w-1/4 bg-[#F6FBF4] border-none rounded-s-lg rounded-e-none">
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
            className="px-4 py-2 rounded-s-lg rounded-e-none  border-none"
            renderValue={(selected) => (
              <span className="labell md:bodyl text-[#2C322D]">{selected || "Select Month"}</span>
            )}
          >
            <MenuItem value="">
              <em>Month</em>
            </MenuItem>
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
        </FormControl>

        <CustomOutlinedInput
          id="search"
          className="w-full rounded-e-lg rounded-s-none bg-[#F6FBF4] labell md:bodyl"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
         
          endAdornment={
            <InputAdornment position="end" className="pr-2">
              <Link href={getSearchURL(searchValue, selectedMonth)} passHref>
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
      </div>

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
      <div className="z-10 h-auto flex absolute  bottom-12  md:bottom-8 left-1/2 transform -translate-x-1/2 justify-center">
        <ScrollToSection targetId="next-section">
          <RotatingLogo />
        </ScrollToSection>
      </div>
    </div>
  );
};

export default HeroHome;
