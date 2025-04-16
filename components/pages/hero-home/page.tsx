"use client"; // ✅ Must be a Client Component

import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollToSection from "@/components/ScrollToSection/page";
import RotatingLogo from "@/components/animated-logo/page";
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import { Typewriter } from "react-simple-typewriter";

export default function HeroHome({
  videoUrls,
}: {
  videoUrls: { videoDesktopUrl: string; videoMobileUrl: string };
}) {
  const text = "Where to next?";

  const [videoSrc, setVideoSrc] = useState(videoUrls.videoDesktopUrl); // Default to desktop

  // Function to detect and set correct video source
  useEffect(() => {
    const updateVideoSource = () => {
      if (window.innerWidth <= 767) {
        setVideoSrc(videoUrls.videoMobileUrl); // Mobile video
      } else {
        setVideoSrc(videoUrls.videoDesktopUrl); // Desktop video
      }
    };

    updateVideoSource(); // Run on mount

    // Listen for screen size changes
    window.addEventListener("resize", updateVideoSource);
    return () => window.removeEventListener("resize", updateVideoSource);
  }, [videoUrls]);

  return (
    <div className="relative h-[80vh] md:h-screen w-full rounded-lg flex items-center  justify-center px-4 md:px-14 flex-col gap-4 md:gap-6">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute inset-0 w-full z-0">
          <div className="absolute inset-0 bg-black/20 z-20 " />
          <video
            autoPlay
            loop
            muted
            playsInline
            width="100%"
            key={videoSrc} // Force reloading video when source changes
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Motion Animated Text */}
      <Stack className="z-10" direction={"column"} gap={1}>
        <h1 className="displays md:displayl text-white text-center">
          <span className="text-primary">Travel </span>
          <span>
            <Typewriter
              words={[
                "is human",
                "is eco-friendly",
                "connects people",
                "is therapy",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>
      </Stack>

      <motion.div
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
        className="z-10 lg:absolute lg:left-8 lg:bottom-8 text-center"
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
                width={31}
                height={21}
                alt="Google"
              />

              <Stack
                className="text-lg"
                direction={"row"}
                alignItems={"center"}
              >
                5 <StarIcon className="text-[#e7c262] text-xs" />
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
                width={31}
                height={21}
                alt="Google"
              />
              <Stack
                className="text-lg"
                direction={"row"}
                alignItems={"center"}
              >
                5 <StarIcon className="text-[#e7c262] text-xs" />
              </Stack>
            </Stack>
          </Link>
        </Stack>
      </motion.div>

      <motion.div
        className="z-10 h-auto flex absolute items-center bottom-8 transform betwee justify-center left-1/2 -translate-x-1/2 right-1/2"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 3,
          ease: "easeIn",
        }}
      >
        <ScrollToSection targetId="next-section">
          <RotatingLogo />
        </ScrollToSection>
      </motion.div>
    </div>
  );
}
