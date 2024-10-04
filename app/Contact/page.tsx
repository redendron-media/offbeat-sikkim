import { Stack } from "@mui/material";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactForm from "@/components/contact-form/page";
import Link from "next/link";
function Contact() {
  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] py-12 pt-20 md:pt-32 lg:py-20 max-w-screen-2xl mx-auto">
      <div className="flex flex-col items-center justify-between md:flex-row gap-10 bg-[url('../public/images/featured-articles.jpg')] bg-cover bg-center bg-no-repeat py-[52px] px-4 rounded-lg">
        <Stack direction={"column"} gap={3}>
          <h1 className="text-white headlines md:displays lg:displaym">
            What&apos;s on your mind?
          </h1>
          <Link href="mailto:team@offbeatsikkim.com">
            <Stack direction={"row"} gap={1}>
              <AlternateEmailIcon className="text-white" />
              <p className="bodyl text-white hover:text-primary hover:transition-colors hover:duration-500">
                team@offbeatsikkim.com
              </p>
            </Stack>
          </Link>
          <Link href="tel:+917029749687">
            <Stack direction={"row"} gap={1}>
              <PhoneIcon className="text-white" />
              <p className="bodyl text-white hover:text-primary hover:transition-colors hover:duration-500">
                +91 70297 49687{" "}
              </p>
            </Stack>
          </Link>
        </Stack>
        <div className="w-[320px] md:w-[368px]">
        <ContactForm />
        </div>
      </div>
    </main>
  );
}

export default Contact;
