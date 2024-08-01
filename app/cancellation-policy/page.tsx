import React from "react";

const Cancellation = () => {
  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] py-12  lg:py-36 max-w-screen-2xl mx-auto flex flex-col gap-6">
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
    </main>
  );
};

export default Cancellation;
