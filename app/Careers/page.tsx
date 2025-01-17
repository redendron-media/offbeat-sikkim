import { Button } from "@/components/ui/button";
import { Card } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Careers = () => {
  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] max-w-screen-2xl mx-auto pt-20 md:pt-32">
      <div className="flex flex-col-reverse md:flex-row gap-6 items-center">
        <div className="hidden w-full lg:flex flex-col gap-2 items-center lg:flex-row">
          <Image
            src={'/images/career1.jpg'}
            width={240}
            height={500}
            alt="Career"  
            className="rounded-lg"        
          />
            <Image
            src={'/images/career2.jpg'}
            width={240}
            height={500}
            alt="Career"    
            className="rounded-lg"      
          />
        </div>
        <div className="flex items-center lg:hidden md:w-1/2">
        <Image
            src={'/images/career2.jpg'}
            width={320}
            height={500}
            alt="Career"    
            className="rounded-lg"      
          />
        </div>
        <div className="w-full flex flex-col gap-4 md:px-4 py-16">
          <h1 className="text-secondary-oncontainer displays lg:displaym ">
            Join our <span className="text-primary">Dream team</span>   
          </h1>
          <p className="text-black bodym md:bodyl">
  Offbeat Sikkim is powered by a passionate team of explorers, storytellers, and go-getters. Imagine a group of adventure-loving individuals brought together in a creative and open environment. Add the drive to follow their dreams and the love for sharing authentic travel experiences—that’s Offbeat Sikkim for you.
</p>

        </div>
      </div>

      <div className="flex flex-col gap-8 py-16">
        <h1 className="text-secondary-oncontainer displays lg:displaym ">
          Explore Careers
        </h1>

        <div className=" flex flex-wrap gap-4">
        <div className="w-full p-4 lg:h-fit flex flex-row justify-between  gap-2 rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow ">
            <div>
            <h1 className="titlel">Sales and Business Development Associate</h1>
            <p className="text-black bodym md:bodyl">Sikkim - Full Time</p>
            </div>
          
          
            <Link href={'/Careers/business-asscociate'}>
          <Button className="w-fit">Apply</Button>
            </Link>
        </div>
        </div>
      </div>
    </main>
  );
};

export default Careers;