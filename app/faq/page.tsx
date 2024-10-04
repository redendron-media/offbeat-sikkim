import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

const Faq = () => {
  return (
    <main className="bg-[#F6FBF4] p-6 pt-20 md:pt-32 max-w-screen-2xl mx-auto space-y-8">
      <h2 className="text-secondary-oncontainer headlines md:displays text-pretty lg:displaym text-center">
        Frequently Asked Questions
      </h2>
      <section className="bg-[#E4EAE3] py-6 space-y-6 rounded-xl px-4 md:px-6">
        <Accordion
          key="1"
          defaultExpanded={Number("1") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel1-content`}
            id={`panel1-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              What regions in North East India do you offer trips to?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              We offer trips to Sikkim, North Bengal, Meghalaya, Arunachal
              Pradesh, Nagaland, and Bhutan.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="2"
          defaultExpanded={Number("2") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel2-content`}
            id={`panel2-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              Are your trips customizable?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Yes, our trips are fully customizable. You can choose your
              destinations, activities, accommodations, and duration based on
              your preferences.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="3"
          defaultExpanded={Number("3") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel3-content`}
            id={`panel3-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              What is the best time to visit these regions?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              The best time to visit Sikkim, North Bengal, Meghalaya, Arunachal
              Pradesh, and Nagaland is from October to May, while Bhutan is
              ideal between March to May and September to November.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="4"
          defaultExpanded={Number("4") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel4-content`}
            id={`panel4-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              What types of accommodation do you offer?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              We offer a range of accommodations, from budget-friendly hotels
              and homestays to luxury resorts. You can
              choose based on your preferences and budget.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="5"
          defaultExpanded={Number("5") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel5-content`}
            id={`panel5-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              Are your trips suitable for solo travelers, families, or groups?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Our trips are designed to cater to all types of travelers,
              including solo adventurers, families, and groups. We can tailor
              the experience to meet your specific needs.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="6"
          defaultExpanded={Number("6") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel6-content`}
            id={`panel6-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              Can I include trekking or adventure activities in my trip?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Absolutely! We offer a variety of adventure activities, including
              trekking, rafting, and wildlife safaris. These can be included in
              your itinerary based on your interests.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="7"
          defaultExpanded={Number("7") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel7-content`}
            id={`panel7-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              How are the itineraries planned?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Our itineraries are carefully crafted by travel experts who know
              the region well. We balance sightseeing, cultural experiences, and
              relaxation, but you can customize the itinerary to suit your
              preferences.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="8"
          defaultExpanded={Number("8") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel8-content`}
            id={`panel8-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              Will I have a local guide during my trip?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Yes, we provide knowledgeable local guides who can offer insights
              into the culture, history, and natural beauty of the destinations
              you visit.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="9"
          defaultExpanded={Number("9") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel9-content`}
            id={`panel9-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              What should I pack for my trip?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Packing recommendations vary based on the season and activities
              planned. Generally, we recommend packing comfortable clothing,
              sturdy footwear, travel essentials, and any personal items you may
              need. A detailed packing list will be provided upon booking.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="10"
          defaultExpanded={Number("10") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel10-content`}
            id={`panel10-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              What is your cancellation policy?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Our cancellation policy details the terms and conditions for
              canceling a trip. You can view the full policy on our <Link href={'/cancellation-policy'} className="underline" target="_blank">Cancellation Policy
              </Link> 
              {" "}page. If you have any specific questions, feel free to
              contact our support team.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="11"
          defaultExpanded={Number("11") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel11-content`}
            id={`panel11-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              Will I get a refund if I cancel my trip?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Refunds are provided according to the terms outlined in our{" "}
              <Link href={'/cancellation-policy'} className="underline" target="_blank">Cancellation Policy</Link>. The amount refunded will depend on the timing
              of your cancellation and the type of package booked.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="12"
          defaultExpanded={Number("12") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel12-content`}
            id={`panel12-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              Can I reschedule my trip after booking?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              Yes, rescheduling is possible, subject to the conditions specified
              in our <Link href={'/cancellation-policy'} className="underline" target="_blank">Cancellation Policy</Link>. Any applicable fees
              will be outlined in the policy.
            </p>
          </AccordionDetails>
        </Accordion>

        <Accordion
          key="13"
          defaultExpanded={Number("13") === 1}
          className="bg-transparent border-none shadow-none"
        >
          <AccordionSummary
            className="px-2"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel13-content`}
            id={`panel13-header`}
          >
            <p className="titlem md:titlel font-semibold text-balance text-[#171D19]">
              What happens if my trip is canceled due to unforeseen
              circumstances?
            </p>
          </AccordionSummary>
          <AccordionDetails className="bodym md:bodyl px-2 text-pretty text-[#171D19]">
            <p>
              For cancellations due to unforeseen events like natural disasters
              or pandemics, please refer to our <Link href={'/cancellation-policy'} className="underline" target="_blank">Cancellation Policy</Link> for detailed
              information on how we handle such situations.
            </p>
          </AccordionDetails>
        </Accordion>
      </section>
    </main>
  );
};

export default Faq;
