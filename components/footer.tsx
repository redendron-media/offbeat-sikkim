import { Stack } from "@mui/material";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import BusinessIcon from '@mui/icons-material/Business';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from "next/link";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Footer = () => {
  return (
    <section className="w-full flex bg-[#DCE5DC] px-4 md:px-6 py-14 gap-9 flex-col rounded-t-xl lg:rounded-t-2xl">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-7">
          <div className="flex flex-col gap-7">
            <h1 className="headlinem">Get In Touch</h1>
            <div className="flex flex-col gap-3">
              <Link href="tel:+917029749687">
                <Stack direction={"row"} gap={1}>
                  <PhoneIcon />
                  <p className="bodyl hover:text-primary hover:transition-colors hover:duration-500">
                    +91 70297 49687{" "}
                  </p>
                </Stack>
              </Link>
              <Link href="mailto:team@offbeatsikkim.com">
                <Stack direction={"row"} gap={1}>
                  <AlternateEmailIcon />
                  <p className="bodyl hover:text-primary hover:transition-colors hover:duration-500">
                    team@offbeatsikkim.com
                  </p>
                </Stack>
              </Link>
              <Stack direction={"row"} gap={1}>
                  <BusinessIcon />
                  <p className="bodyl hover:text-primary hover:transition-colors hover:duration-500">
                   Dotapu, Upper Syari, Gangtok, Sikkim-737101
                  </p>
                </Stack>
                <Stack direction={"row"} gap={3.5} className="mt-4">
              <Link
                className="cursor-pointer"
                href={"https://www.instagram.com/offbeatsikkim"}
                target="_blank"
              >
                <InstagramIcon className="hover:text-primary text-[32px] duration-700 transition-colors" />
              </Link>
              <Link
                className="cursor-pointer"
                href={"https://www.facebook.com/offbeatsikkim/"}
                target="_blank"
              >
                <FacebookIcon className="hover:text-primary text-[32px] duration-700 transition-colors" />
              </Link>
              <Link
                className="cursor-pointer"
                href={"https://www.linkedin.com/company/offbeat-sikkim/"}
                target="_blank"
              >
                <LinkedInIcon className="hover:text-primary text-[32px] duration-700 transition-colors" />
              </Link>
            </Stack>
            </div>
          </div>
          <Stack direction={"column"} gap={3.5}>
          <div className="hidden md:flex flex-col gap-1.5">
            <Link href="/Careers">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                 Careers
                </p>
              </Link>
            <Link href="/faq">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                 Frequently Asked Questions
                </p>
              </Link>
              <Link href="/terms-conditions">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                  Terms and Conditions
                </p>
              </Link>
              <Link href="/payment-policy">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                 Payment Policy
                </p>
              </Link>
              <Link href="/cancellation-policy">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                  Cancellation Policy
                </p>
              </Link>
              <Link href="/privacy-policy">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                  Privacy Policy
                </p>
              </Link>
          </div>

            <div className="md:hidden">
            <Accordion className="bg-transparent border-none shadow-none">
              <AccordionSummary
               className="px-2"
               expandIcon={<ExpandMoreIcon />}
              >
                   <p className="bodyl text-balance text-[#171D19]">
                        Quick Links
                          </p>
              </AccordionSummary>
              <AccordionDetails>
              <div className="flex flex-col gap-1.5">
            <Link href="/Careers">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                 Careers
                </p>
              </Link>
            <Link href="/faq">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                 Frequently Asked Questions
                </p>
              </Link>
              <Link href="/terms-conditions">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                  Terms and Conditions
                </p>
              </Link>
              <Link href="/payment-policy">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                 Payment Policy
                </p>
              </Link>
              <Link href="/cancellation-policy">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                  Cancellation Policy
                </p>
              </Link>
              <Link href="/privacy-policy">
                <p className="bodyl hover:text-primary hover:underline hover:transition-colors hover:duration-500">
                  Privacy Policy
                </p>
              </Link>
          </div>
              </AccordionDetails>
            </Accordion>
            </div>
           
          </Stack>
        </div>

        <Stack
          direction={"column"}
          gap={{ sm: 3.5, md: 2.5 }}
          className="md:text-center items-center md:mt-4"
        >
          <p className="bodym">
            © Offbeat Sikkim Travels, All rights reserved
          </p>
          <Link
            className="hover:text-primary flex flex-row items-center gap-1 transition-colors "
            href={"https://www.redendron.media/"}
            target="_blank"
          >
            <p className="bodym hover:text-primary duration-700 transition-colors">
              Creative Credit: Redendron Media
            </p>
            <LaunchIcon className="text-xs lg:text-base hover:text-primary duration-700 transition-colors"/>
          </Link>
        </Stack>
      </div>
    </section>
  );
};

export default Footer;
