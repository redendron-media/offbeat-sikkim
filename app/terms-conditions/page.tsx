import React from "react";

const TermsandConditions = () => {
  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4]  py-12 pt-20 md:pt-32 lg:py-20 max-w-screen-2xl mx-auto flex flex-col gap-4">
      <h1 className="text-secondary-oncontainer headlines md:displays lg:displaym">
        Terms & Conditions
      </h1>
      <ul className="space-y-3 list-disc list-outside pl-8">
        <li className="text-black bodym md:bodyl">
          Full payment of the trip cost must be made before the trip begins.
          Pending payments may eventually lead to the cancellation of the trip.
        </li>
        <li className="text-black bodym md:bodyl">
          The package prices may vary depending on the number of travellers.
        </li>
        <li className="text-black bodym md:bodyl">
          The IDs shall all be verified before boarding. No boarding shall be
          entertained without a valid Govt. ID.
        </li>
        <li className="text-black bodym md:bodyl">
          Transfer of bookings is not permitted. Only the names mentioned at the
          time of confirmation shall be allowed to travel.
        </li>
        <li className="text-black bodym md:bodyl">
          No refunds shall be made towards any inclusion(s) not availed by the
          client.
        </li>
        <li className="text-black bodym md:bodyl">
          Travellers must take care of their luggage & belongings. The
          management shall not be responsible for any damage or any missing
          items along the tour.
        </li>
        <li className="text-black bodym md:bodyl">
          The company shall not be liable for damages/charges incurred by
          travellers if any of the following reasons apply:  <br /><br />
          <ul className="space-y-2 list-disc list-outside pl-4 md:pl-8">
            <li className="text-black bodym md:bodyl">
            Natural disaster, war, civil unrest, and alteration or cancellation of tour itinerary due to such causes.
            </li>
            <li className="text-black bodym md:bodyl">
            Accidents during transportation or accommodations, damage by fire.
            </li>
            <li className="text-black bodym md:bodyl">
            Orders of either Indian governments or immigration regulations, isolation resulting from infectious diseases, and tour itinerary alteration or cancellation owing to such causes.
            </li>
            <li className="text-black bodym md:bodyl">
            Accidents that might occur during the travellers&apos; free activities.
            </li>
            <li className="text-black bodym md:bodyl">
            Food poisoning.
            </li>
          </ul>
        </li>
      </ul>
    </main>
  );
};

export default TermsandConditions;
