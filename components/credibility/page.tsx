import Image from "next/image";
import Link from "next/link";
import React from "react";

const Credibility = () => {
  return (
    <div className="px-4 md:px-6 py-16 md:py-24 flex flex-col gap-10">
      <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
        We are affliated with
      </h2>
      <div className="flex flex-row  justify-center gap-12 md:gap-8 lg:gap-14 xl:gap-20 items-start">
    <Link href="https://msme.gov.in/" target="_blank">
      <div className="flex flex-col items-center text-center">
        <Image src="/icons/msme.png" alt="MSME" width={200} height={200} />
        <div className="h-16 flex flex-col justify-center">
          <p className="labels md:labell">Ministry of Micro, Small & Medium</p>
          <p className="labels md:labell">  Enterprises</p>
        </div>
      </div>
    </Link>
    <Link href="https://sikkimtourism.gov.in/Public/index" target="_blank">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/icons/sikkimtourismlogo.png"
          alt="Sikkim Tourism"
          width={200}
          height={200}
        />
        <div className="h-16 flex flex-col justify-center">
          <p className="labels md:labell">Tourism Department,</p>
          <p className="labels md:labell">Govt. Of Sikkim</p>
        </div>
      </div>
    </Link>
  </div>
    </div>
  );
};

export default Credibility;
