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
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
const CustomOutlinedInput = styled(OutlinedInput)({
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#2C322D",
  },
});

const HeroHome = () => {
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
    <div className="py-24 px-3  md:px-14 lg:py-36 xl:py-44 bg-[url('../public/images/hero.webp')] bg-cover bg-center bg-no-repeat w-full h-full rounded-lg flex flex-col gap-4 md:gap-6">
      <Stack direction={"column"} gap={1}>
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

      <Stack direction={"row"} gap={{ xs: 2, sm: 3 }}>
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

            <Stack direction={"row"} gap={0.5} alignItems={"center"}>
              <StarIcon className="text-[#e7c262] text-lg" />
              <p className="font-bold text-[13px]">5.0</p>
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
            <Stack direction={"row"} gap={0.5} alignItems={"center"}>
              <StarIcon className="text-[#e7c262] text-lg" />
              <p className="font-bold text-[13px]">5.0</p>
            </Stack>
          </Stack>
        </Link>
      </Stack>
    </div>
  );
};

export default HeroHome;
