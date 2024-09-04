"use client";
import { Button } from "@/components/ui/button";
import {
  packagesData,
  UpcomingTours,
  CuratedPackages,
  Treks,
} from "@/constants";
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import { useInView } from "react-intersection-observer";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import ContactDialog from "@/components/contact-dialog/page";
import Sliderr from "@/components/Slider";
import { TripDetail } from "@/lib/types";
import PhotoGallery from "@/components/photo-gallery/page";
import Link from "next/link";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/contact-form/page";
interface PackageData {
  title: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function allyProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface SectionConfig {
  id: string;
  label: string;
  condition: boolean;
}

function PackagePage() {
  const { link } = useParams();
  const [value, setValue] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const currentPageLink = `https://offbeatsikkim.com/${pathname}`;
  const handleClickOpen = () => {
    setIsShareOpen(true);
  };

  const handleClose = () => {
    setIsShareOpen(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(currentPageLink).then(() => {
      alert("Copied to clipboard ");
    });
  };

  const decodedLink = decodeURIComponent(link as string);
  const linkString = Array.isArray(link) ? link[0] : link;
  const packageData = packagesData.find(
    (packagedata) => packagedata.link === decodedLink
  );

  const isUpcoming = decodedLink.startsWith("upcoming");
  const isTrek = decodedLink.endsWith("trek");
  const isCurated = decodedLink.startsWith("curated");

  let filteredPackages: TripDetail[] = [];
  if (isUpcoming) {
    filteredPackages = UpcomingTours.filter((pkg) => pkg.link !== decodedLink);
  } else if (isTrek) {
    filteredPackages = Treks.filter((pkg) => pkg.link !== decodedLink);
  } else if (isCurated) {
    filteredPackages = CuratedPackages.filter(
      (pkg) => pkg.link !== decodedLink
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log(entry.target.id, entry.isIntersecting);
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!packageData) {
    return <div>Package data is unavailable.</div>;
  }

  const sections: SectionConfig[] = [
    {
      id: "itinerary",
      label: "Itinerary",
      condition: !!packageData.detailedItinerary,
    },
    {
      id: "gallery",
      label: "Gallery",
      condition: !!packageData.photoGalleries,
    },
    {
      id: isDesktop ? "inclusions" : "inclusions-mobile",
      label: "Inclusions",
      condition: !!packageData.inclusions,
    },
    {
      id: isDesktop ? "exclusions" : "exclusions-mobile",
      label: "Exclusions",
      condition: !!packageData.exclusions,
    },
    {
      id: "thingstocarry",
      label: "Things to Carry",
      condition: !!(packageData.thingsToCarry || packageData.thingsToCarryTrek),
    },
    {
      id: "bookingprocess",
      label: "Booking Process",
      condition: !!packageData.bookingProcess,
    },
    {
      id: "mandatorydocuments",
      label: "Mandatory Documents",
      condition: !!packageData.mandatoryDocuments,
    },
    {
      id: "knowbeforeyougo",
      label: "Know Before You Go",
      condition: !!packageData.knowBeforeYouGo,
    },
  ];

  const filteredSections = sections
  .filter((section) => section.condition)
  .filter((section, index, self) => {
    // Prevent duplicates in case both desktop and mobile versions are being rendered
    return self.findIndex((s) => s.label === section.label) === index;
  });

  const scrollToSection = (sectionName: string) => {
    if (!isDesktop && sectionName === "exclusions-mobile") {
    
      setValue(1);
  
    
      setTimeout(() => {
        const sectionElement = document.getElementById(sectionName);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
          setActiveSection(sectionName);
        }
      }, 100);
    } else if (!isDesktop && sectionName === "inclusions-mobile") {
 
      setValue(0);
  
  
      setTimeout(() => {
        const sectionElement = document.getElementById(sectionName);
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: "smooth" });
          setActiveSection(sectionName);
        }
      }, 100);
    } else {
      // For desktop or other sections
      const sectionElement = document.getElementById(sectionName);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionName);
      }
    }
  };

  return (
    <main className=" relative bg-[#F6FBF4]  max-w-screen-2xl mx-auto">
      {packageData && (
        <>
          <div className="flex flex-col px-4 md:px-6">
            <section
              className={`flex flex-col justify-center gap-6 py-9 px-4  md:px-14 md:py-24 md:gap-6 min-h-[50vh] rounded-xl bg-cover bg-center bg-no-repeat bg-black bg-opacity-30 bg-blend-overlay`}
              style={{ backgroundImage: `url(/${packageData.image}.webp)` }}
            >
              <Stack direction={"column"} gap={1}>
                <h2 className="headlines md:displaym lg:displayl text-white">
                  {packageData.title}
                </h2>
                <p className="bodys md:bodym lg:bodyl text-white">
                  {packageData.desc}
                </p>
              </Stack>

              {isUpcoming && (
                <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
                  <Link
                    href={`/${packageData.pdf}.pdf`}
                    download={`${packageData.pdf}`}
                  >
                    <Button className=" w-fit flex gap-1 xs:bodys">Download Itinerary  <DownloadIcon className="xs:text-sm text-[20px] mt-0.5"/></Button>
                   
                  </Link>
                </Stack>
              )}
            </section>
            <section className="py-6 rounded-xl px-4 md:px-6 flex flex-col md:flex-row gap-4">
              <Stack
                direction={"row"}
                gap={1}
                className="bg-primary-container shadow-cardShadow w-fit rounded-xl px-3 py-3"
                alignItems={"center"}
              >
                <AccessTimeIcon className="text-primary-oncontainer" />
                <Stack direction={"column"} gap={1} justifyContent={"center"}>
                
                  <p className=" bodys md:bodyl flex text-black">
                    {packageData.durationn} Nights {packageData.durationd} Days
                  </p>
                </Stack>
              </Stack>
              <Stack
                 direction={"row"}
                 gap={1}
                 className="bg-primary-98 shadow-cardShadow w-fit rounded-xl px-3 py-3"
                 alignItems={"center"}
              >
              <p className="labels md:labell text-black text-balance">
                    Starts at{" "}
                  </p>
                  <p className="bodys  md:bodyl text-black">
                    <span className="text-primary font-semibold ">INR {packageData.currentPrice}/-</span>
                   {" "}
                    {packageData.originalPrice && (
                      <span className="bodys font-normal line-through">
                        {" "}{packageData.originalPrice}
                      </span>
                    )}
                    {" "} per head
                  </p>
              </Stack>
            </section>
            <section className="flex flex-row">
              <div className=" w-full flex flex-col lg:w-2/3">

                <section className="bg-primary-container titlem md:titlel items-center 2xl:justify-center whitespace-nowrap shadow-cardShadow hide-scrollbar sticky top-16 md:top-14 lg:top-16 z-10 overflow-x-scroll pt-6 rounded-xl my-6  px-6 flex gap-4 md:gap-6 xl:gap-8 2xl:gap-10">
                  
                  {filteredSections.map((section) => (
                    <p
                      key={section.id}
                      className={cn(
                        "cursor-pointer pb-4",
                        activeSection === section.id
                          ? "text-primary border-b-4 border-primary"
                          : "text-primary-oncontainer"
                      )}
                      onClick={() => scrollToSection(section.id)}
                    >
                      {section.label}
                    </p>
                  ))}
                  
                </section>

                <section
                  ref={(el) => {
                    sectionRefs.current["itinerary"] = el;
                  }}
                  id="itinerary"
                  className="bg-[#E4EAE3] scroll-mt-56 py-6 rounded-xl my-6  px-6 flex flex-col gap-4"
                >
                  <Stack
                    direction={"row"}
                    className="justify-between items-center"
                  >
                    <h2 className="headlines text-[#171D19]">Your itinerary</h2>
                    <Button variant={"outline"} onClick={handleClickOpen}>
                      <span className="hidden md:flex">Share</span> <ShareIcon className="text-sm ml-1" />{" "}
                    </Button>
                    <Dialog open={isShareOpen} maxWidth="md" fullWidth>
                      <DialogTitle className="bg-[#F5F5F5]">
                        <IconButton
                          disableTouchRipple
                          disableRipple
                          onClick={handleClose}
                          className="absolute right-2 top-2"
                        >
                          <CloseIcon />
                        </IconButton>
                      </DialogTitle>
                      <div className="py-6 px-5 flex flex-col gap-5 text-[#051E13] bg-[#F5F5F5] ">
                        <p className="bodyl text-[#404942]">Copy Link </p>
                        <OutlinedInput
                          id="link"
                          name="link"
                          type="text"
                          value={currentPageLink}
                          disabled
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                disableTouchRipple
                                disableRipple
                                onClick={handleCopyClick}
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <p className="bodyl text-[#404942]">
                          Or share link via{" "}
                        </p>
                        <Stack direction={"row"} gap={2}>
                          <FacebookShareButton url={currentPageLink}>
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>
                          <WhatsappShareButton url={currentPageLink}>
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <TwitterShareButton url={currentPageLink}>
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                        </Stack>
                      </div>
                    </Dialog>
                  </Stack>
                  <p className="bodym text-[#404942]">
                    Here&apos;s a detailed breakdown of what you can expect on
                    each day of your trip
                  </p>
                  {packageData.detailedItinerary?.map((day, index) => (
                    <Accordion
                      key={index}
                      defaultExpanded={index === 0}
                      className="bg-transparent border-none shadow-none"
                    >
                      <AccordionSummary
                        className="px-2"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                      >
                        <p className="bodyl text-balance text-[#171D19]">
                          {day.day}: {day.title}
                        </p>
                      </AccordionSummary>
                      <AccordionDetails className="bodym text-[#171D19]">
                        <ul className="space-y-4 list-disc pl-4">
                          {day.activities.map((activity, activityIndex) => (
                            <li key={activityIndex}>{activity}</li>
                          ))}
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </section>

                <section className="flex justify-end md:justify-start">
                  {!isUpcoming && (
                    <ContactDialog
                      link={linkString}
                      packageTitle={packageData.title}
                      title="Enquire Now"
                      tourDates={
                        packageData.tourDates ? packageData.tourDates : []
                      }
                    />
                  )}
                  {isUpcoming && (
                    <Link href={`/booking/${packageData.link}`}>
                      <Button>Book Now</Button>
                    </Link>
                  )}
                </section>

                <section
                  ref={(el) => {
                    sectionRefs.current["gallery"] = el;
                  }}
                  id="gallery"
                  className="flex flex-col scroll-mt-56 gap-5 py-12 md:py-[76px]"
                >
                  <h2 className="text-black headlines md:displaym">
                    Photo Gallery
                  </h2>
                  <PhotoGallery items={packageData.photoGalleries ?? []} />
                </section>

                <section className=" flex flex-col scroll-mt-56 md:gap-4">
                  <div
                    ref={(el) => {
                      sectionRefs.current["inclusions-mobile"] = el;
                    }}
                    id="inclusions-mobile"
                    className="bg-[#E4EAE3] w-full rounded-xl scroll-mt-56  flex flex-col lg:hidden gap-4"
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      variant="fullWidth"
                    >
                      <Tab label="Inclusions" {...allyProps(0)} />
                      <Tab label="Exclusions" {...allyProps(1)} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>
                      <>
                        {packageData.inclusions?.map((item, index) => (
                          <Stack
                            id={`${index}`}
                            direction={"row"}
                            gap={2}
                            key={index}
                            className="border border-b-2 border-b-[#C0C9C0] py-2"
                          >
                            <CheckIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                            <p className="text-[#171D19] bodyl">{item}</p>
                          </Stack>
                        ))}
                      </>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <div
                        ref={(el) => {
                          sectionRefs.current["exclusions-mobile"] = el;
                        }}
                        id="exclusions-mobile"
                        className="scroll-mt-56"
                      >
                        {packageData.exclusions?.map((item, index) => (
                          <Stack
                            id={`${index}`}
                            direction={"row"}
                            gap={2}
                            key={index}
                            className="border border-b-2  border-b-[#C0C9C0] py-2 "
                          >
                            <ClearIcon className="text-[#002111] bg-primary-container rounded-full" />
                            <p className="text-[#171D19] w-full text-balance bodyl">
                              {item}
                            </p>
                          </Stack>
                        ))}
                      </div>
                    </CustomTabPanel>
                  </div>

                  <div
                    ref={(el) => {
                      sectionRefs.current["inclusions"] = el;
                    }}
                    id="inclusions"
                    className="bg-[#E4EAE3] w-full scroll-mt-56 rounded-xl p-6 hidden lg:flex flex-col gap-4"
                  >
                    <h2 className="headlines text-[#171D19]">Inclusions</h2>
                    {packageData.inclusions?.map((item, index) => (
                      <Stack
                        id={`${index}`}
                        direction={"row"}
                        gap={2}
                        key={index}
                        className="border border-b-2 border-b-[#C0C9C0] py-2"
                      >
                        <CheckIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                        <p className="text-[#171D19] bodyl">{item}</p>
                      </Stack>
                    ))}
                  </div>

                  <div
                    ref={(el) => {
                      sectionRefs.current["exclusions"] = el;
                    }}
                    id="exclusions"
                    className="bg-[#E4EAE3] scroll-mt-56 w-full rounded-xl p-6 hidden lg:flex  flex-col gap-4"
                  >
                    <h2 className="headlines text-[#171D19]">Exclusions</h2>
                    {packageData.exclusions?.map((item, index) => (
                      <Stack
                        id={`${index}`}
                        direction={"row"}
                        gap={2}
                        key={index}
                        className="border border-b-2 border-b-[#C0C9C0] py-2"
                      >
                        <ClearIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                        <p className="text-[#171D19] bodyl">{item}</p>
                      </Stack>
                    ))}
                  </div>
                </section>

                <section className="my-12  flex flex-col gap-12 md:gap-4">
                  {(packageData.thingsToCarry ||
                    packageData.thingsToCarryTrek) && (
                    <div
                      ref={(el) => {
                        sectionRefs.current["thingstocarry"] = el;
                      }}
                      id="thingstocarry"
                      className="bg-[#E4EAE3] scroll-mt-56 rounded-xl h-full flex flex-col gap-4 p-6"
                    >
                      <h2 className="headlines text-[#171D19]">
                        Things to Carry
                      </h2>
                      <p className="bodym text-[#404942]">
                        Essential Items to Pack: Please refer to the list below
                        for recommendations on what to bring for your trip.
                      </p>

                      {packageData.thingsToCarryTrek?.map((item, index) => (
                        <Stack key={`${index}`} direction={"column"} gap={1}>
                          <p className="text-[#171D19] bodyl">{item.title}</p>
                          <ul className=" text-[#171D19] space-y-2">
                            {item.list?.map((listItem, listIndex) => (
                              <li key={listIndex}>
                                <Stack
                                  direction={"row"}
                                  gap={2}
                                  className="border border-b-2 items-center border-b-[#C0C9C0] py-2"
                                >
                                  <CheckIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                                  <p className="text-[#171D19] bodym">
                                    {listItem}
                                  </p>
                                </Stack>
                              </li>
                            ))}
                          </ul>
                        </Stack>
                      ))}

                      {packageData.thingsToCarry?.map((thing, index) => (
                        <ul key={index} className="text-[#171D19] space-y-4">
                          <li className="bodyl">
                            <Stack
                              direction={"row"}
                              gap={2}
                              className="border border-b-2 items-start border-b-[#C0C9C0] py-2"
                            >
                              <CheckIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                              <p className="text-[#171D19]">{thing}</p>
                            </Stack>
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                  {packageData.bookingProcess && (
                    <div
                      ref={(el) => {
                        sectionRefs.current["bookingprocess"] = el;
                      }}
                      id="bookingprocess"
                      className=" bg-[#E4EAE3] scroll-mt-56 w-full rounded-xl flex flex-col gap-4 p-6"
                    >
                      <h2 className="headlines text-[#171D19]">
                        Booking and Confirmation Process
                      </h2>
                      {packageData.bookingProcess?.map((booking, index) => (
                        <ul key={index} className=" text-[#171D19] space-y-4">
                          <li key={index} className="bodyl">
                            {" "}
                            <Stack
                              direction={"row"}
                              gap={2}
                              className="border border-b-2 items-start  py-2"
                            >
                              <CheckIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                              <p className="text-[#171D19]">{booking}</p>
                            </Stack>
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                </section>

                <section className=" flex flex-col gap-12 md:gap-4">
                  {packageData.mandatoryDocuments && (
                    <div
                      ref={(el) => {
                        sectionRefs.current["mandatorydocuments"] = el;
                      }}
                      id="mandatorydocuments"
                      className="bg-[#E4EAE3] scroll-mt-56 rounded-xl h-full flex flex-col gap-4 p-6"
                    >
                      <h2 className="headlines text-[#171D19]">
                        Mandatory Documents
                      </h2>
                      {packageData.mandatoryDocuments.map((item, index) => (
                        <Stack key={`${index}`} direction={"column"} gap={1}>
                          <p className="text-[#171D19] bodyl">{item.title}</p>
                          <ul className=" text-[#171D19] space-y-2">
                            {item.desc?.map((list, index) => (
                              <li key={index}>
                                <Stack
                                  direction={"row"}
                                  gap={2}
                                  className="border border-b-2 items-center border-b-[#C0C9C0] py-2"
                                >
                                  <CheckIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                                  <p className="text-[#171D19] bodym">{list}</p>
                                </Stack>
                              </li>
                            ))}
                          </ul>
                        </Stack>
                      ))}
                    </div>
                  )}
                  {packageData.knowBeforeYouGo && (
                    <div
                      ref={(el) => {
                        sectionRefs.current["knowbeforeyougo"] = el;
                      }}
                      id="knowbeforeyougo"
                      className=" bg-[#E4EAE3] w-full scroll-mt-56 rounded-xl flex flex-col gap-4 p-6"
                    >
                      <h2 className="headlines text-[#171D19]">
                        Know Before You Go
                      </h2>
                      {packageData.knowBeforeYouGo.map((booking, index) => (
                        <ul key={index} className=" text-[#171D19] space-y-4">
                          <li key={index} className="bodyl">
                            {" "}
                            <Stack
                              direction={"row"}
                              gap={2}
                              className="border border-b-2 items-start border-b-[#C0C9C0] py-2"
                            >
                              <CheckIcon className="text-[#002111] bg-primary-container rounded-full p-1" />
                              <p className="text-[#171D19]">{booking}</p>
                            </Stack>
                          </li>
                        </ul>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              <div className="relative p-6 hidden lg:flex w-full justify-center items-start">
                {isUpcoming ? (
                  <div className="flex flex-col gap-4 sticky md:top-28 lg:top-20 z-10 w-full p-6 bg-[#E4EAE3] rounded-xl">
                    {packageData.currentPrice && (
                      <Stack direction={"column"} gap={1}>
                        <p className="labels md:titlel text-black text-balance">
                         Confirm your booking with only 
                        </p>
                        <p className="bodys md:headlines text-primary">
                          INR 5,000
                        </p>
                      </Stack>
                    )}

                    <Link href={`/booking/${packageData.link}`}>
                      <Button>Book Now</Button>
                    </Link>
                  </div>
                ) : (
                  <div className=" sticky md:top-28 lg:top-30 z-10  flex-col flex gap-4">
                    <h2 className="headlines text-center">
                      Got any questions?
                    </h2>
                    <h4 className="titlem text-center">Allow us to help you</h4>
                    <ContactForm />
                  </div>
                )}
              </div>
            </section>

            <div className="my-4">
              <section className="flex justify-end md:justify-start">
                {!isUpcoming && (
                  <ContactDialog
                    link={linkString}
                    packageTitle={packageData.title}
                    title="Enquire Now"
                    tourDates={
                      packageData.tourDates ? packageData.tourDates : []
                    }
                  />
                )}
                {isUpcoming && (
                  <Link href={`/booking/${packageData.link}`}>
                    <Button>Book Now</Button>
                  </Link>
                )}
              </section>
            </div>

            <section className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
              <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
                Related Packages
              </h2>
              <Sliderr items={filteredPackages} />
            </section>

            <section className="flex flex-col justify-center items-center w-full gap-6 py-[60px]">
              <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
                Have a Question?
              </h2>
              <p className="bodym md:titles text-[#202822] text-center">
                Reach out to us for your travel planning needs.
              </p>

              <Link href={"/Contact"}>
                <Button>Contact Us</Button>
              </Link>
            </section>
          </div>
          <div className="flex lg:hidden bg-[#F6FBF4] rounded-t-xl  w-full p-4 shadow-footerShadow sticky z-30 bottom-0 left-0 flex-row justify-between end items-center">
            <Stack
              className="w-full"
              alignItems={"center"}
              direction={"row"}
              justifyContent={"space-between"}
              gap={{ xs: 1, md: 3 }}
            >
              {packageData.currentPrice && (
                <Stack direction={"column"} gap={1} className=" px-3 py-2">
                  <p className="labels md:labell text-black text-balance">
                   Confirm your booking with only{" "}
                  </p>
                  <p className="bodys  font-semibold md:bodyl text-primary">
                    INR 5,000
                   
                  </p>
                </Stack>
              )}

              {packageData.costDouble && (
                <Stack direction={"column"} gap={1} className=" px-3 py-2">
                  <p className="labels md:labell text-black">Starts at</p>
                  <p className="bodys  font-semibold md:bodyl text-black">
                    {packageData.costDouble} per head
                  </p>
                </Stack>
              )}

              {isUpcoming && (
                <Link href={`/booking/${packageData.link}`}>
                  <Button>Book Now</Button>
                </Link>
              )}
            </Stack>
            {!isUpcoming && (
              <ContactDialog
                link={linkString}
                packageTitle={packageData.title}
                title="Enquire Now"
                tourDates={packageData.tourDates ? packageData.tourDates : []}
              />
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default PackagePage;
