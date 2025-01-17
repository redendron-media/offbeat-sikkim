'use client';

import React from 'react'
import { useParams } from "next/navigation";
import { carreers } from '@/constants/careers';
import Apply from '@/components/careerdialog/page';

const CareerPage = () => {
    const {link} = useParams();
const matchedCareer = carreers.find(career =>career.link === link);
    
if (!matchedCareer) {
  return (
    <main className="px-4 md:px-6 h-[90vh] bg-[#F6FBF4] max-w-screen-2xl mx-auto pt-20 md:pt-32 pb-12 space-y-4">
      <h1 className="text-secondary-oncontainer flex-1 displays lg:displaym">
        Career Not Found
      </h1>
      <p className="text-black bodym md:bodyl">
        The career you are looking for does not exist. Please check the URL or explore our other opportunities.
      </p>
    </main>
  );
}

  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] max-w-screen-2xl mx-auto pt-20 md:pt-32 pb-12 space-y-4">
           <h1 className="text-secondary-oncontainer displays lg:displaym ">
           {matchedCareer.title}
        </h1>
        <p>Welcome to Offbeat Sikkim! We&apos;re your go-to platform for exploring the pristine beauty of Northeast India and Bhutan. From adventurous treks to unique tours, we craft unforgettable journeys for travelers seeking off-the-beaten-path experiences.</p>
    <div className="flex flex-col gap-8 py-6">
      <div className=" w-full flex flex-col gap-4 ">
        <h1 className="text-secondary-oncontainer headlines ">
        What You&apos;ll Be Doing:
        </h1>
        <p className="text-black bodym md:bodyl">
          {matchedCareer.what}
        </p>
        <ul className='list-disc pl-5'>
          {
            matchedCareer.whatpoints.map((point,index)=>(
              <li key={index}>{point}</li>
            ))
          }
        </ul>
      </div>

      <div className=" w-full flex flex-col gap-4">
        <h1 className="text-secondary-oncontainer headlines ">
        Who We&apos;re Looking For:
        </h1>
        <p className="text-black bodym md:bodyl">
        We&apos;re seeking someone who:
</p>
        <ul className='list-disc pl-5'>
          {
            matchedCareer.who.map((point,index)=>(
              <li key={index}>{point}</li>
            ))
          }
        </ul>
      </div>
      <div className=" w-full flex flex-col gap-4">
        <h1 className="text-secondary-oncontainer headlines ">
        What&apos;s in It for You:
        </h1>
        <p className="text-black bodym md:bodyl">
        By joining Offbeat Sikkim, you&apos;ll gain:
</p>
        <ul className='list-disc pl-5'>
          {
            matchedCareer.foryou.map((point,index)=>(
              <li key={index}>{point}</li>
            ))
          }
        </ul>
      </div>
      <div className=" w-full flex flex-col gap-4">
        <h1 className="text-secondary-oncontainer headlines ">
        What You Need to Apply:
</h1>
       
        <ul className='list-disc pl-5'>
          {
            matchedCareer.prerequisites.map((point,index)=>(
              <li key={index}>{point}</li>
            ))
          }
        </ul>
      </div>
      <div className="md:w-1/4 w-full flex flex-col gap-4 ">
       <Apply/>
      </div>
    </div>
  </main>
  )
}

export default CareerPage;