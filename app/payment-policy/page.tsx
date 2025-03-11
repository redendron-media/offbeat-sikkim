'use client';
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const PaymentPolicy = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);

    // Reset "Copied!" text after 2 seconds
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] py-12  pt-20 md:pt-32 lg:py-36 max-w-screen-2xl mx-auto flex flex-col gap-6">
      <h1 className="text-secondary-oncontainer headlines md:displays lg:displaym">
        Payment Policy
      </h1>
      <ul className="space-y-3 list-disc list-outside pl-8">
        <li className="text-black bodym md:bodyl">
          To confirm your booking, a deposit of 30%% of the total amount is
          required in advance.
        </li>
        <li className="text-black bodym md:bodyl">
          The remaining amount must be paid at least 2 days before the trip
          departure.
        </li>
      </ul>

      <h1 className="text-secondary-oncontainer headlines md:displays lg:displaym">
        Cancellation Policy
      </h1>
      <ul className="space-y-3 list-disc list-outside pl-8">
        <li className="text-black bodym md:bodyl">
          No Refund shall be made with respect to the initial booking amount for
          any cancellations. However, if cancellations are made 30 days before
          the start date of the trip, 50% of the trip cost will be charged as
          cancellation fees.
        </li>
        <li className="text-black bodym md:bodyl">
          If cancellations are made 15-30 days before the start date of the
          trip, 75% of the trip cost will be charged as cancellation fees.
        </li>
        <li className="text-black bodym md:bodyl">
          If cancellations are made within 0-15 days before the start date of
          the trip, 100% of the trip cost will be charged as cancellation fees.
        </li>
        <li className="text-black bodym md:bodyl">
          The refund will be processed within 48 hours.
        </li>
        <li className="text-black bodym md:bodyl">
          In the case of unforeseen weather conditions or government
          restrictions, certain activities may be cancelled and in such cases,
          the operator will try their best to provide an alternate feasible
          activity. However, no refund shall be provided for the same.
        </li>
      </ul>

      <h4 className="titlel">Payment Options</h4>
      <div className="flex flex-row flex-wrap gap-12">
        <div className="bg-[#E4EAE3] w-fit scroll-mt-56 rounded-xl">
          <h2 className="titlel text-white p-6 bg-primary rounded-t-xl">
            Bank Transfer
          </h2>
          <div className="p-6 space-y-2">
            <p className="text-black bodym md:bodyl">
              <span className="font-bold">A/C No:</span> 531501010035344
            </p>
            <p className="text-black bodym md:bodyl">
              <span className="font-bold">A/C Name:</span> Offbeatsikkim Travels
            </p>
            <p className="text-black bodym md:bodyl">
              <span className="font-bold">IIFC Code: </span>UBIN0553158
            </p>
            <Button
                onClick={() => handleCopy(
                  `A/C Name: Offbeatsikkim Travels\nA/C No: 531501010035344\nIFSC Code: UBIN0553158`
                )} 
                className="w-full"
                size={"sm"}
              >
               {copiedText === `A/C Name: Offbeatsikkim Travels\nA/C No: 531501010035344\nIFSC Code: UBIN0553158`
                ? "Copied!" 
                : "Copy Details"}
              </Button>
          </div>
        </div>

        <div className=" bg-[#E4EAE3] w-fit scroll-mt-56 rounded-xl flex flex-col justify-between">
          <h2 className="titlel text-white p-6 bg-secondary rounded-t-xl">UPI</h2>
          <div className="p-6 space-y-2">
          <p className="text-black bodym md:bodyl">
            <span className="font-bold">UPI ID: </span> 8597669309@ibl
          </p>
          <p className="text-black bodym md:bodyl">
            <span className="font-bold">UPI Name:</span> OFFBEAT SIKKIM
          </p>
          <Button
                onClick={() => handleCopy(
                  `8597669309@ibl`
                )} 
                className="w-full bg-secondary hover:bg-secondary/90"
                size={"sm"}
              >
               {copiedText === `8597669309@ibl`
                ? "Copied!" 
                : "Copy UPI Id  "}
              </Button>
          </div>
        
        </div>
      </div>
    </main>
  );
};

export default PaymentPolicy;
