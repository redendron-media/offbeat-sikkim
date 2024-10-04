"use client";

import Link from "next/link";
import { useSearchParams,redirect } from "next/navigation";

import React, { Suspense } from "react";

const Success = () => {
  const searchParams = useSearchParams();
  const formatIndian = (number: number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };
  if (!searchParams.get("transactionId")) {
    redirect('/');
  }

  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] pt-20 md:pt-32 py-12 md:py-56 lg:py-52 max-w-screen-2xl mx-auto">
      <section className="flex flex-col gap-4 items-center text-center">
        <h1 className="headlinem md:displaym text-primary">
          Thank you, your trip package has been booked!
        </h1>
        <h4 className="titlem text-pretty md:titlel">
          An email confirmation has been sent to you.
        </h4>

        <p className="bodyl text-pretty">
          Your transaction ID is: {searchParams.get("transactionId")}
        </p>
        <p className="bodyl text-pretty">
          Order Total: INR{" "}
          {formatIndian(Number(searchParams.get("amount")) / 100)}/-
        </p>

        <p className="bodyl text-pretty">
          Please{" "}
          <Link href={"/Contact"}>
            <span className="underline underline-offset-1">
              Contact Us
            </span>
          </Link> for any queries.
        </p>
      </section>
    </main>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Success />
  </Suspense>
);


export default SuspenseWrapper;
