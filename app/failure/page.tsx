"use client";
import React from 'react'
import Link from "next/link";
import { useSearchParams,redirect } from "next/navigation";

const Failure = () => {
  const searchParams = useSearchParams();
  const formatIndian = (number: number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };
  // if (!searchParams.get("transactionId")) {
  //   redirect('/');
  // }
  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] py-12 md:py-56 lg:py-52 max-w-screen-2xl mx-auto">
    <section className="flex flex-col gap-4 items-center text-center">
      <h1 className="headlinem md:displaym text-error">
       There was a problem with the selected payment method.
      </h1>
      <h4 className="titlem text-pretty md:titlel">
        The transaction was declined and the booking will be canceled
      </h4>

      <p className="bodyl text-pretty">
        Your transaction ID is: {searchParams.get("transactionId")}
      </p>
      <p className="bodyl text-pretty">
        Order Total: INR{" "}
        {formatIndian(Number(searchParams.get("amount")) / 100)}/-
      </p>

      <p className="bodyl text-pretty">
        Kindly{" "}
        <Link href={"/Contact"}>
          <span className="underline underline-offset-1">
            Contact Us
          </span>
        </Link> for support.
      </p>
    </section>
  </main>
  )
}

export default Failure