"use client";
import { Button } from "@/components/ui/button";
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
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import ContactDialog from "@/components/contact-dialog/page";
import Sliderr from "@/components/Slider";
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
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/contact-form/page";
import { client, urlFor } from "@/lib/sanity";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Image from "next/image";
import { CardTrip, TripDetail } from "@/lib/types";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CustomComponents from "@/components/portabletext-components/page";
import ExpandableContent from "@/components/expandable-div/page";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const fetchPackageData = async (packageType: string, link: string) => {
  const query = `
    {
      "packageData": *[_type == "${packageType}" && link == "${link}"][0] {
        title,
        desc,
        image,
        durationn,
        durationd,
        currentPrice,
        originalPrice,
        detailedItinerary,
        inclusions,
        exclusions,
        thingsToCarry,
        link,
        thingsToCarryTrek,
        faqs,
        bookingProcess,
        mandatoryDocuments,
        knowBeforeYouGo,
        privateTrip,
        photoGalleries,
        tourDates,
        "pdfItinerary": pdfItinerary.asset->url
      },
      "relatedPackages": *[_type == "${packageType}" && link != "${link}"] {
        id,
        title,
        cover,
        link,
        durationn,
        durationd,
        currentPrice,
        originalPrice,
        tripType
      }
    }`;
  return await client.fetch(query);
};

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

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const PackagePage: React.FC = () => {
  const { link } = useParams();
  const [value, setValue] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const currentPageLink = `https://offbeatsikkim.com/${pathname}`;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 3,
        spacing: 3,
      },
      breakpoints: {
        "(min-width: 500px)": {
          slides: {
            perView: 4,
            spacing: 2,
          },
        },
        "(min-width: 650px)": {
          slides: {
            perView: 7,
            spacing: 2,
          },
        },
        "(min-width: 980px)": {
          slides: {
            perView: "auto",
          },
        },
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const decodedLink = decodeURIComponent(link as string);
  const linkString = Array.isArray(link) ? link[0] : link;
  const isUpcoming = decodedLink.startsWith("upcoming");
  const isTrek = decodedLink.endsWith("trek");
  const isCurated = decodedLink.startsWith("curated");
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const packageType = isUpcoming
    ? "upcomingTripDetail"
    : isTrek
      ? "trekTripDetail"
      : "curatedTripDetail";

  const { data, error, isLoading } = useQuery<{
    packageData: TripDetail;
    relatedPackages: CardTrip[];
  }>(
    ["packageData", packageType, decodedLink],
    () => fetchPackageData(packageType, decodedLink),
    {
      enabled: !!link,
      retry: 2,
      staleTime: 1000 * 60 * 5,
    }
  );

  useEffect(() => {
    if (!data || !sectionRefs.current) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  useEffect(() => {
    if (activeSection && navRef.current) {
      const activeTab = navRef.current.querySelector(
        `[data-id="${activeSection}"]`
      ) as HTMLElement;
      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeSection]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    console.error("Failed to load package data:", error);
    return <div>Failed to load package data.</div>;
  }
  const packageData = data?.packageData;

  const relatedPackages = data?.relatedPackages;

  if (!packageData) {
    return <div>Package data is unavailable.</div>;
  }
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
      const sectionElement = document.getElementById(sectionName);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionName);
      }
    }
  };

  const pdfUrl = `${packageData?.pdfItinerary ?? ""}?dl=Itinerary.pdf`;
  return (
    <main className=" relative bg-[#F6FBF4]  pt-20 md:pt-32  max-w-screen-2xl mx-auto">
      {packageData && (
        <>
          <div className="flex flex-col px-4 md:px-6">
            <section
              className={`flex flex-col justify-center gap-6 py-9 px-4 relative  md:px-14 md:py-24 md:gap-6 min-h-[60vh] rounded-xl overflow-hidden`}
            >
              <motion.div
                className="absolute inset-0 w-full z-0"
                style={{ scale }}
              >
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                  src={urlFor(packageData.image).url()}
                  alt={packageData.title}
                  fill
                  className="rounded-lg object-cover"
                  priority
                />
                {/* <div ref={sliderRef} className="keen-slider h-full">
                  {packageData.photoGalleries?.map((image, index) => (
                    <div key={index} className="keen-slider__slide">
                      <div className="w-full h-full relative z-40">
                        <Image
                          src={urlFor(image.images).url()}
                          fill
                          alt={image.title}
                          loading="lazy"
                          className="z-40 object-bottom"
                        />
                      </div>
                    </div>
                  ))}
                </div> */}
              </motion.div>
              <Stack className="z-10 px-4 md:px-6" direction={"column"} gap={1}>
                <h2 className="headlines md:displaym lg:displayl text-white">
                  {packageData.title}
                </h2>
                <p className="bodys md:bodym lg:bodyl lg:pr-32 text-white">
                  {packageData.desc}
                </p>
              </Stack>

              {isUpcoming && (
                <Stack
                  className="z-10 px-4 md:px-6"
                  direction={{ xs: "column", sm: "row" }}
                  gap={1}
                >
                  {pdfUrl ? (
                    <a
                      href={pdfUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className=" w-fit flex gap-1 xs:bodys">
                        Download Itinerary{" "}
                        <DownloadIcon className="xs:text-sm text-[20px] mt-0.5" />
                      </Button>
                    </a>
                  ) : (
                    <></>
                  )}
                </Stack>
              )}

              {/* <div className="w-full backdrop-blur-lg absolute left-0 right-0 bottom-10 lg:bottom-0">
              <div ref={thumbnailRef} className=" keen-slider backdrop-blur z-50">
                  {packageData.photoGalleries?.map((image, index) => (
                    <div key={index} className="keen-slider__slide z-50">
                      <Image
                        src={urlFor(image.images).url()}
                        width={100}
                        height={150}
                        alt={image.title}
                        className="z-50 object-contain "
                      />
                    </div>
                  ))}
                </div>
              </div> */}
            </section>
            <div className="px-4 md:px-6">
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
                      {packageData.durationn} Nights {packageData.durationd}{" "}
                      Days
                    </p>
                  </Stack>
                </Stack>
                {isUpcoming && (
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
                      <span className="text-primary font-semibold ">
                        INR {packageData.currentPrice}/-
                      </span>{" "}
                      {packageData.originalPrice && (
                        <span className="bodys font-normal line-through">
                          {" "}
                          {packageData.originalPrice}
                        </span>
                      )}{" "}
                      per head
                    </p>
                  </Stack>
                )}
              </section>

              <section className="flex flex-row">
                <div className=" w-full flex flex-col lg:w-2/3">
                  <section
                    ref={navRef}
                    className="bg-neutral-95 titlem md:titlel items-center 2xl:justify-center whitespace-nowrap shadow-sm hide-scrollbar sticky top-16 lg:top-20 z-10 overflow-x-scroll pt-6 rounded-xl my-6  px-6 flex gap-4 md:gap-6 xl:gap-8 2xl:gap-10"
                  >
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
                      <h2 className="headlines text-[#171D19]">
                        Your itinerary
                      </h2>
                      <Button variant={"outline"} onClick={handleClickOpen}>
                        <span className="hidden md:flex">Share</span>{" "}
                        <ShareIcon className="text-sm ml-1" />{" "}
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
                        link={linkString!}
                        packageTitle={packageData.title}
                        title="Enquire Now"
                      />
                    )}
                    {isUpcoming && (
                      <Link href={`/booking/${packageData.link}`}>
                        <Button>View Dates</Button>
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

                  {packageData.privateTrip && (
                    <section className="py-6 bg-[#E4EAE3] rounded-xl px-4 md:px-6 flex flex-col gap-4 w-fit scroll-mt-56 my-12 md:my-[76px]">
                      <h2 className="headlines text-[#171D19]">
                        Private Trip Pricing:
                      </h2>

                      <TableContainer
                        component={Paper}
                        className="bg-[#E4EAE3] border-0 shadow-none"
                      >
                        <Table aria-label="Private trip table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">
                                <span className="titlem  font-semibold">
                                  People
                                </span>
                              </TableCell>
                              <TableCell align="left">
                                <span className="titlem font-semibold">
                                  Price
                                </span>{" "}
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {packageData.privateTrip.map((item, index) => (
                              <TableRow
                                key={index}
                                className="bodym "
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell
                                  align="center"
                                  sx={{ border: "none" }}
                                >
                                  <span className="bodys md:bodym lg:bodyl">
                                    {item.pax}
                                  </span>
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ border: "none" }}
                                >
                                  <span className="bodys md:bodym lg:bodyl">
                                    INR {item.price} per person
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </section>
                  )}
                  {(packageData.inclusions || packageData.exclusions) && (
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
                      {packageData.inclusions && (
                        <div
                          ref={(el) => {
                            sectionRefs.current["inclusions"] = el;
                          }}
                          id="inclusions"
                          className="bg-[#E4EAE3] w-full scroll-mt-56 rounded-xl p-6 hidden lg:flex flex-col gap-4"
                        >
                          <ExpandableContent maxHeight={350} className="p-6">
                            <h2 className="headlines text-[#171D19]">
                              Inclusions
                            </h2>
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
                          </ExpandableContent>
                        </div>
                      )}

                      {packageData.exclusions && (
                        <div
                          ref={(el) => {
                            sectionRefs.current["exclusions"] = el;
                          }}
                          id="exclusions"
                          className="bg-[#E4EAE3] scroll-mt-56 w-full rounded-xl p-6 hidden lg:flex  flex-col gap-4"
                        >
                          <ExpandableContent maxHeight={350} className="p-6">
                            <h2 className="headlines text-[#171D19]">
                              Exclusions
                            </h2>
                            {packageData.exclusions?.map((item, index) => (
                              <Stack
                                id={`${index}`}
                                direction={"row"}
                                gap={2}
                                key={index}
                                className="border border-b-2 border-b-[#C0C9C0] py-2"
                              >
                                <ClearIcon className=" bg-error text-white rounded-full p-1" />
                                <p className="text-[#171D19] bodyl">{item}</p>
                              </Stack>
                            ))}
                          </ExpandableContent>
                        </div>
                      )}
                    </section>
                  )}

                  <section className="my-12  flex flex-col gap-12 md:gap-4">
                    {(packageData.thingsToCarry ||
                      packageData.thingsToCarryTrek) && (
                      <div
                        ref={(el) => {
                          sectionRefs.current["thingstocarry"] = el;
                        }}
                        id="thingstocarry"
                        className="bg-[#E4EAE3] scroll-mt-56 rounded-xl h-full "
                      >
                        <ExpandableContent maxHeight={350} className="p-6">
                          <h2 className="headlines text-[#171D19]">
                            Things to Carry
                          </h2>
                          <p className="bodym text-[#404942]">
                            Essential Items to Pack: Please refer to the list
                            below for recommendations on what to bring for your
                            trip.
                          </p>

                          {packageData.thingsToCarryTrek?.map((item, index) => (
                            <Stack
                              key={`${index}`}
                              direction={"column"}
                              gap={1}
                            >
                              <p className="text-[#171D19] bodyl">
                                {item.title}
                              </p>
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
                            <ul
                              key={index}
                              className="text-[#171D19] space-y-4"
                            >
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
                        </ExpandableContent>
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
                                    <p className="text-[#171D19] bodym">
                                      {list}
                                    </p>
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
                        className=" bg-[#E4EAE3] w-full scroll-mt-56 rounded-xl "
                      >
                        <ExpandableContent
                          maxHeight={300}
                          className="flex flex-col p-6"
                        >
                          <h2 className="headlines text-[#171D19]">
                            Know Before You Go
                          </h2>
                          {packageData.knowBeforeYouGo.map((booking, index) => (
                            <ul
                              key={index}
                              className=" text-[#171D19] space-y-4"
                            >
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
                        </ExpandableContent>
                      </div>
                    )}
                    {packageData.faqs && (
                      <ExpandableContent
                        className=" bg-[#E4EAE3] w-full scroll-mt-56 rounded-xl flex flex-col gap-4 p-6"
                        maxHeight={300}
                      >
                        <h2 className="headlines text-[#171D19] mb-4">
                          Frequently Asked Questions
                        </h2>
                        {packageData.faqs.map((faq, index) => (
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
                                {faq.question}
                              </p>
                            </AccordionSummary>
                            <AccordionDetails className="bodym text-[#171D19]">
                              <ul className="space-y-4 list-disc pl-4">
                                {faq.answer.map(
                                  (answer, answerIndex) => (
                                    <li key={answerIndex}>{answer}</li>
                                  )
                                )}
                              </ul>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </ExpandableContent>
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
                            INR 5,000 per head
                          </p>
                        </Stack>
                      )}

                      <Link href={`/booking/${packageData.link}`}>
                        <Button>View Dates</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className=" sticky md:top-28 lg:top-30 z-10  flex-col flex gap-4">
                      <h2 className="headlines text-center">
                        Got any questions?
                      </h2>
                      <h4 className="titlem text-center">
                        Allow us to help you
                      </h4>
                      <ContactForm />
                    </div>
                  )}
                </div>
              </section>

              <div className="my-4">
                <section className="flex justify-end md:justify-start">
                  {!isUpcoming && (
                    <ContactDialog
                      link={linkString!}
                      packageTitle={packageData.title}
                      title="Enquire Now"
                    />
                  )}
                  {isUpcoming && (
                    <Link href={`/booking/${packageData.link}`}>
                      <Button>View Dates</Button>
                    </Link>
                  )}
                </section>
              </div>

              <section className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
                <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
                  Related Packages
                </h2>
                <Sliderr items={relatedPackages ?? []} />
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
                <Stack direction={"column"} gap={1} className="w-1/2 py-2">
                  <p className="labels md:labell text-black text-balance">
                    Confirm your booking with only{" "}
                  </p>
                  <p className="bodys  font-semibold md:bodyl text-primary">
                    INR 5,000 per head
                  </p>
                </Stack>
              )}
              {isUpcoming && (
                <Link href={`/booking/${packageData.link}`}>
                  <Button>
                    <span className="labels md:labell">View Dates</span>
                  </Button>
                </Link>
              )}
            </Stack>
            {!isUpcoming && (
              <ContactDialog
                link={linkString!}
                packageTitle={packageData.title}
                title="Enquire Now"
              />
            )}
          </div>
        </>
      )}
    </main>
  );
};

const queryClient = new QueryClient();

const PackagePageWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PackagePage />
    </QueryClientProvider>
  );
};

export default PackagePageWrapper;
