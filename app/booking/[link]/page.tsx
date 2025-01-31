"use client";
import { Button } from "@/components/ui/button";
import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormErrors, UpcomingForm } from "@/lib/types";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { client } from "@/lib/sanity";

interface CustomConnectorWrapperProps {
  activeStep: number;
}
interface Tour {
  tourDate: string;
  spots?: string;
  coupons?: { cname: string; value: string }[]; // Allow multiple coupons
}

const CustomConnectorWrapper = ({
  activeStep,
}: CustomConnectorWrapperProps) => {
  const progress = (activeStep + 1) * 25;
  const remaining = 100 - progress;
  return (
    <div className="flex w-full h-full p-4 flex-row gap-1.5">
      <motion.div
        className="h-1 rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="h-1 rounded-full bg-primary-container"
        initial={{ width: "100%" }}
        animate={{ width: `${remaining}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

const fetchPackageData = async (link: string) => {
  const query = `
    *[_type == "upcomingTripDetail" && link == "${link}"][0] {
      title,
      durationn,
      durationd,
      currentPrice,
      originalPrice,
      "tourDates": tourDates[]{
      date,
      "coupons": coalesce(coupons[]->{ cname, value }, [])
    },
      tripType
    }
  `;
  const data = await client.fetch(query);
  return data;
};

const generateDatesByMonth = (
  tourDates:
    | { date: string; coupons?: { cname: string; value: string }[] }[]
    | undefined
) => {
  return (
    tourDates?.reduce((acc: { [key: string]: Tour[] }, tourObj) => {
      const [tourDate, spots] = tourObj.date.split(" | "); // Extract date and spots
      const month = tourDate.split(" ")[1]; // Extract month
      if (!acc[month]) acc[month] = [];
      acc[month].push({ tourDate, spots, coupons: tourObj.coupons || [] }); // Store multiple coupons
      return acc;
    }, {}) || {}
  );
};

const BookingPage = () => {
  const router = useRouter();
  const { link } = useParams();
  const decodedLink = decodeURIComponent(link as string);

  const {
    data: packageData,
    isLoading,
    error,
  } = useQuery(["packageData", link], () => fetchPackageData(decodedLink), {
    enabled: !!link,
  });

  const datesByMonth = React.useMemo(
    () =>
      generateDatesByMonth(
        packageData?.tourDates?.map(
          (t: {
            date: string;
            coupons?: { cname: string; value: string }[];
          }) => ({
            date: t.date,
            coupons: t.coupons || [],
          })
        ) || []
      ),
    [packageData?.tourDates]
  );

  const initialMonth = Object.keys(datesByMonth)[0] || null;
  const initialDate = initialMonth ? datesByMonth[initialMonth][0] : null;

  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useState(0);
  const [noOfPeople, setNoOfPeople] = useState(1);
  const [availableCoupons, setAvailableCoupons] = useState<
    { cname: string; value: string }[]
  >([]);
  const [enteredCoupon, setEnteredCoupon] = useState<string>("");
  const [errors, setErrors] = useState<Partial<UpcomingForm>>({});
  const [couponError, setCouponError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(
    initialMonth
  );

  const [baseTotal, setBaseTotal] = useState(() => {
    const initialCost = Number(packageData?.currentPrice?.replace(/,/g, "")) || 0;
    return initialCost * noOfPeople;
  });

  useEffect(() => {
    if (packageData?.currentPrice) {
      const baseCost = Number(packageData.currentPrice.replace(/,/g, ""));
      setBaseTotal(baseCost * noOfPeople);
      setTotalCost(baseCost * noOfPeople); // Reset total cost when base changes
      setAppliedCoupon(null); // Reset applied coupon when base changes
    }
  }, [packageData, noOfPeople]);

  const [formData, setFormData] = useState<UpcomingForm>({
    packageName: packageData?.title,
    name: "",
    email: "",
    phone: "",
    noOfAdults: noOfPeople.toString(),
    tourDates: "",
    source: "upcoming",
    coTraveler: [],
  });
  const [paymentOption, setPaymentOption] = useState("full");

  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    cname: string;
    value: string;
  } | null>(null);
  const cost = Number(packageData?.currentPrice?.replace(/,/g, ""));

  const [totalCost, setTotalCost] = useState(() => {
    const initialCost =
      Number(packageData?.currentPrice?.replace(/,/g, "")) || 0;
    return initialCost * noOfPeople;
  });

  useEffect(() => {
    if (packageData?.currentPrice) {
      const baseCost = Number(packageData.currentPrice.replace(/,/g, ""));
      setTotalCost(baseCost * noOfPeople);
    }
  }, [packageData, noOfPeople]);

  useEffect(() => {
    if (packageData) {
      const newTourDate =
        initialDate?.tourDate || packageData?.tourDates?.[0]?.date || "";
      const newCoupons =
        initialDate?.coupons || packageData?.tourDates?.[0]?.coupons || [];
      console.log("Setting initial availableCoupons:", newCoupons);
      setAvailableCoupons(newCoupons);
      // Only update formData if necessary
      if (
        formData.packageName !== packageData.title ||
        formData.noOfAdults !== noOfPeople.toString()
      ) {
        // Update formData but only set tourDates if it's empty
        setFormData((prevData) => ({
          ...prevData,
          packageName: packageData.title,
          noOfAdults: noOfPeople.toString(),
          tourDates: prevData.tourDates || newTourDate, // Only set tourDates if it is empty
        }));
        setAvailableCoupons(newCoupons);
        setSelectedMonth(initialMonth);
      }
    }
  }, [packageData, noOfPeople, initialDate]);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    const firstTour = datesByMonth[month]?.[0];
    if (firstTour && formData.tourDates !== firstTour.tourDate) {
      setFormData((prevData) => ({
        ...prevData,
        tourDates: firstTour.tourDate,
      }));
      setAvailableCoupons(firstTour.coupons || []); // Set available coupons
    }
  };

  const handleDateSelect = (date: string) => {
    const selectedDateObj = Object.values(datesByMonth)
      .flat()
      .find((dateObj) => dateObj.tourDate === date);

    console.log("Selected Date:", date);
    console.log("Found Date Object:", selectedDateObj);

    setFormData((prevData) => ({
      ...prevData,
      tourDates: date,
    }));

    if (selectedDateObj) {
      console.log("Setting Coupons to:", selectedDateObj.coupons);
      setAvailableCoupons([...(selectedDateObj?.coupons ?? [])]);
    } else {
      console.log("No coupons found for this date");
      setAvailableCoupons([]);
    }
  };

  const handleApplyCoupon = () => {
    if (!enteredCoupon.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    
    setCouponLoading(true);
    
    const matchedCoupon = availableCoupons.find(
      (coupon) => coupon.cname === enteredCoupon.trim()
    );
  
    if (!matchedCoupon) {
      setCouponError("Invalid coupon code.");
      setCouponLoading(false);
      return;
    }
  
    try {
      const discountPercentage = Number(matchedCoupon.value);
  
      if (isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage > 100) {
        setCouponError("Invalid discount percentage.");
        return;
      }
  
      // Calculate discount amount
      const discountAmount = Math.floor((baseTotal * discountPercentage) / 100);
      
      // Set new total cost
      setTotalCost(baseTotal - discountAmount);

      setAppliedCoupon(matchedCoupon);
      

      setCouponError("");
  
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponError("Error applying coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };


  const handlePeopleInputChange = (
    field: keyof UpcomingForm,
    value: string,
    index?: number
  ) => {
    if (field === "coTraveler" && typeof index === "number") {
      setFormData((prevFormData) => {
        const updatedCoTraveler = [...(prevFormData.coTraveler || [])];
        updatedCoTraveler[index] = value;

        return {
          ...prevFormData,
          coTraveler: updatedCoTraveler,
        };
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleClear = (field: keyof UpcomingForm, index?: number) => {
    if (field === "coTraveler" && typeof index === "number") {
      const updatedCoTravellers = [...(formData.coTraveler || [])];
      updatedCoTravellers[index] = "";
      setFormData({
        ...formData,
        coTraveler: updatedCoTravellers,
      });
    } else {
      setFormData({ ...formData, [field]: "" });
    }
    setErrors({ ...errors, [field]: "" });
  };

  const handleAddField = () => {
    setNoOfPeople(noOfPeople + 1); // Increase the count first
    setFormData((prevData) => ({
      ...prevData,
      noOfAdults: (noOfPeople + 1).toString(),
      coTraveler: [...(prevData.coTraveler || []), ""], // Add an empty co-traveler slot
    }));
  };
  const handleRemoveField = () => {
    if (noOfPeople > 1) {
      setNoOfPeople(noOfPeople - 1); // Decrease the count first
      setFormData((prevData) => ({
        ...prevData,
        noOfAdults: (noOfPeople - 1).toString(),
        coTraveler: (prevData.coTraveler || []).slice(0, -1), // Remove the last co-traveler slot
      }));
    }
  };

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
  if (error || !packageData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div>Error fetching package data or package not found.</div>
      </Box>
    );
  }

  const gst = Math.round(totalCost * 0.05);
  let tcs;
  if (packageData?.title.includes("Bhutan")) {
    tcs = Math.round(totalCost * 0.05);
  } else {
    tcs = 0;
  }
  const finalCost = totalCost + gst + tcs;
  const advance = 5000 * noOfPeople;
  const paymentPartial = finalCost - advance;
  let paylater = 0;
  if (paymentOption === "partial") {
    paylater = finalCost - advance;
  }

  let gatewayCost;
  if (paymentOption === "full") {
    gatewayCost = finalCost * 100;
  } else {
    gatewayCost = advance * 100;
  }

  const formatIndian = (number: number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    return newErrors;
  };

  const makePayment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Fetch the order ID from the backend
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gatewayCost }), // Pass gatewayCost here
      });
      const { orderId } = await response.json();

      if (!orderId) {
        throw new Error("Failed to create order");
      }

      // Load the Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public Razorpay Key
          amount: gatewayCost, // Amount in paise (₹100.00)
          currency: "INR",
          order_id: orderId,
          name: "Offbeat Sikkim",
          description: "Tour Booking Payment",
          handler: async (response: any) => {
            console.log("Payment successful:", response);

            const payload = {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              tourPackage: packageData.title,
              noOfAdults: parseInt(formData.noOfAdults, 10) || 0,
              tourDates: formData.tourDates,
              modeOfPayment: paymentOption,
              amountPaid: formatIndian(gatewayCost / 100),
              amountRemaining: formatIndian(paylater),
              source: formData.source,
              coTraveler: formData.coTraveler
                ?.filter((name) => name)
                .join(", "),
            };
            let transactionId = response.razorpay_payment_id;
            const emailResponse = await fetch("/api/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...payload, transactionId }),
            });

            if (emailResponse.ok) {
              router.push(
                `/success?transactionId=${response.razorpay_payment_id}&amount=${gatewayCost}`
              );
            } else {
              console.error("Failed to send email");
              alert("Payment successful, but failed to send email.");
            }
          },
          theme: { color: "#3399cc" },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };

      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        alert("Payment failed. Please try again.");
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateCoTravellers = (): (string | undefined)[] => {
    return (formData.coTraveler || []).map((coTraveller, index) => {
      if (!coTraveller) {
        return `Co-Traveller ${index + 1} name is required`;
      }
      return undefined;
    });
  };
  const goForward = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (activeStep === 1) {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    if (activeStep === 2) {
      const coTravellerErrors = validateCoTravellers();
      const hasErrors = coTravellerErrors.some((error) => error !== undefined);

      if (hasErrors) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          coTraveler: coTravellerErrors as string[],
        }));
        return;
      }
    }

    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
      setStep(step + 1);
    } else if (activeStep === 3) {
      makePayment(e);
    }
  };

  const goBack = () => {
    setActiveStep(activeStep - 1);
    setStep(step - 1);
  };

  return (
    <main className="flex min-h-screen justify-between bg-[#F6FBF4] flex-col py-6 px-4 md:px-6 max-w-screen-2xl gap-4 mx-auto pt-20 md:pt-32">
      <section>
        <section className="flex flex-row gap-4 md:gap-8 w-full">
          <CustomConnectorWrapper activeStep={activeStep} />
        </section>
        {step === 0 && (
          <>
            <section className="bg-[#E4EAE3] rounded-xl flex-col gap-4 justify-between items-center">
              <h2 className="headlines px-6 pt-4 md:pt-6 md:displaym lg:displayl text-black">
                {packageData?.title}
              </h2>
              <p className="bodyl bg-[#286A48] rounded-b-xl text-secondary-90 px-6 py-4 md:pb-6">
                {packageData?.durationn}N {packageData?.durationd}D
              </p>
            </section>
            <section className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className=" w-full md:w-1/2 rounded-xl py-6 flex flex-col gap-4">
                <h2 className="headlines text-[#171D19] px-6 md:py-4">
                  Available Dates
                </h2>
                <FormControl className="px-4 md:px-6">
                  <div className="flex overflow-x-scroll xl:overflow-x-clip custom-scrollbar gap-2 mb-4">
                    {Object.entries(datesByMonth).map(
                      ([month, tours], index) => (
                        <Chip
                          key={index}
                          label={month}
                          clickable
                          className={cn(
                            `${selectedMonth === month ? "shadow-cardShadow" : "shadow-none"}`
                          )}
                          onClick={() => handleMonthSelect(month)}
                          variant={
                            selectedMonth === month ? "filled" : "outlined"
                          }
                          sx={{
                            ...(selectedMonth === month
                              ? {
                                  backgroundColor: "primary.main",
                                  color: "white",
                                  "& .MuiChip-label": { color: "white" },
                                }
                              : {
                                  borderColor: "primary.main",
                                  color: "primary.main",
                                  "& .MuiChip-label": { color: "primary.main" },
                                }),
                            "&:hover": {
                              backgroundColor:
                                selectedMonth === month
                                  ? "primary.dark"
                                  : "rgba(25, 169, 108, 0.1)",
                            },
                          }}
                        />
                      )
                    )}
                  </div>
                  {selectedMonth && (
                    <div className="flex overflow-x-scroll custom-scrollbar gap-4 py-3">
                      {datesByMonth[selectedMonth].map((dateObj, index) => (
                        <Chip
                          key={index}
                          label={
                            <div className="space-y-2">
                              <div>{dateObj.tourDate || ""}</div>
                              <div
                                className={cn(
                                  " rounded-xl p-2",
                                  `text-${
                                    formData.tourDates === dateObj.tourDate
                                      ? "primary"
                                      : "white"
                                  } ${
                                    formData.tourDates === dateObj.tourDate
                                      ? "bg-secondary-95"
                                      : "bg-primary"
                                  }`
                                )}
                                style={{ fontSize: "0.75rem" }}
                              >
                                Starting Price: INR {packageData?.currentPrice}
                                /-
                              </div>
                            </div>
                          }
                          clickable
                          className={cn(
                            `py-10 `,
                            `${
                              formData.tourDates === dateObj.tourDate
                                ? "shadow-cardShadow"
                                : "shadow-none"
                            }`
                          )}
                          onClick={() => {
                            console.log("Clicked date: ", dateObj.tourDate); // Debugging
                            handleDateSelect(dateObj.tourDate);
                          }}
                          variant={
                            formData.tourDates === dateObj.tourDate
                              ? "filled"
                              : "outlined"
                          }
                          sx={{
                            ...(formData.tourDates === dateObj.tourDate
                              ? {
                                  backgroundColor: "primary.main",
                                  color: "white",
                                  "& .MuiChip-label": { color: "white" },
                                }
                              : {
                                  borderColor: "primary.main",
                                  color: "primary.main",
                                  "& .MuiChip-label": {
                                    color: "primary.main",
                                  },
                                }),
                            "&:hover": {
                              backgroundColor:
                                formData.tourDates === dateObj.tourDate
                                  ? "primary.dark"
                                  : "rgba(25, 169, 108, 0.1)",
                            },
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {formData.tourDates && selectedMonth && (
                    <div className="text-start p-2">
                      {selectedMonth &&
                        (() => {
                          const selectedDateObj = datesByMonth[
                            selectedMonth
                          ]?.find(
                            (dateObj: { tourDate: string }) =>
                              dateObj.tourDate === formData.tourDates
                          );
                          return selectedDateObj?.spots ? (
                            <span className="bodyl text-error">
                              Only {selectedDateObj.spots} spots left!
                            </span>
                          ) : null;
                        })()}
                    </div>
                  )}
                </FormControl>
              </div>
              <div className=" w-full md:w-1/2  md:h-[65svh] flex flex-col justify-between gap-4">
                <div className="h-fit py-6 rounded-xl">
                  <h2 className="headlines text-[#171D19]  md:py-4">Cost</h2>
                  <div className=" flex flex-row items-stretch gap-1 mt-4">
                    <div className="w-full text-center text-balance bg-primary-90 px-1 py-4 bodys lg:titlem">
                      <p>Room Sharing</p>
                    </div>
                    <div className="w-full h-full text-center text-balance bg-primary-90 px-1 py-4 bodys lg:titlem">
                      <p>Original Price (Per Head)</p>
                    </div>
                    <div className="w-full text-center text-balance bg-primary-90 px-1 py-4 bodys lg:titlem">
                      <p>Limited Price (Per Head)</p>
                    </div>
                  </div>

                  <div className=" flex flex-row items-center gap-1 justify-between">
                    <div className="w-full text-center text-balance  px-1  py-4 bodys lg:titlem">
                      <p>Double / Triple</p>
                    </div>
                    <div className="w-full text-center text-balance  px-1  py-4 bodys lg:titlem">
                      <p className="line-through text-neutral-60">
                        INR {packageData?.originalPrice}/-
                      </p>
                    </div>
                    <div className="w-full text-center text-balance  px-1  py-4 bodys lg:titlem">
                      <p>INR {packageData?.currentPrice}/-</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {step === 1 && (
          <section className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
            <div className="bg-[#E4EAE3] w-full md:w-1/2 rounded-xl py-6 flex flex-col gap-4">
              <h2 className="headlines text-start text-[#171D19] px-6 border border-b-2 border-b-[#C0C9C0] md:py-4">
                Fill in the details
              </h2>
              <div className="px-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput
                      id="name"
                      name="name"
                      label="Name*"
                      value={formData.name}
                      error={!!errors.name}
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            disableTouchRipple
                            onClick={() => handleClear("name")}
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        color: "#404942",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#404942",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#404942",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#404942",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#404942",
                          },
                          "& input": {
                            color: "#404942",
                          },
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input":
                          {
                            color: "#404942",
                          },
                        "& .MuiOutlinedInput-input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #E4EAE3 inset",
                          WebkitTextFillColor: "#404942",
                        },
                      }}
                    />
                    {errors.name && (
                      <p className="text-error bodyl">{errors.name}</p>
                    )}
                  </FormControl>

                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      name="email"
                      type="email"
                      label="Email*"
                      error={!!errors.email}
                      value={formData.email}
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            disableTouchRipple
                            onClick={() => handleClear("email")}
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        color: "#404942",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#404942",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#404942",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#404942",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#404942",
                          },
                          "& input": {
                            color: "#404942",
                          },
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input":
                          {
                            color: "#404942",
                          },
                        "& .MuiOutlinedInput-input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #E4EAE3 inset",
                          WebkitTextFillColor: "#404942",
                        },
                      }}
                    />
                    {errors.email && (
                      <p className="text-error bodyl">{errors.email}</p>
                    )}
                  </FormControl>

                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <OutlinedInput
                      id="phone"
                      name="phone"
                      label="Phone*"
                      type="number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={!!errors.phone}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            disableTouchRipple
                            onClick={() => handleClear("phone")}
                          >
                            <CancelOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        color: "#404942",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#404942",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#404942",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "#404942",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#404942",
                          },
                          "& input": {
                            color: "#404942",
                          },
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input":
                          {
                            color: "#404942",
                          },
                        "& .MuiOutlinedInput-input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #E4EAE3 inset",
                          WebkitTextFillColor: "#404942",
                        },
                      }}
                    />
                    {errors.phone && (
                      <p className="text-error bodyl">{errors.phone}</p>
                    )}
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 md:h-[65svh] flex flex-col justify-between gap-4">
              <div className="h-fit bg-[#E4EAE3] pt-6 rounded-xl">
                <div className=" flex flex-col gap-2 ">
                  <div className="w-full text-balance  px-4  pt-4 headlines md:headlinem">
                    <p>{packageData?.title}</p>
                  </div>
                  <div className="pb-6 px-4 bg-[#286A48] rounded-b-xl pt-2 text-secondary-90">
                    <p className="bodys lg:titlem">{formData.tourDates}</p>
                    <p className="bodys lg:titlem">
                      {packageData?.durationn}N{packageData?.durationd}D
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
            <div className="bg-[#E4EAE3] w-full md:w-1/2 rounded-xl py-6 flex flex-col gap-4">
              <h2 className="headlines  text-[#171D19] px-6 border border-b-2 border-b-[#C0C9C0] md:py-4">
                Fill in the details
              </h2>
              <div className="flex flex-col gap-4 h-full">
                <div className="px-6 flex flex-row justify-between items-center">
                  <p className="bodys lg:titlem">Adults</p>
                  <div className="flex gap-0.5 justify-between items-center border border-secondary rounded-2xl">
                    <IconButton
                      onClick={handleRemoveField}
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                    >
                      <RemoveIcon className="text-primary" />
                    </IconButton>
                    <p className="text-base">{noOfPeople}</p>
                    <IconButton
                      onClick={handleAddField}
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                    >
                      <AddIcon className="text-primary" />
                    </IconButton>
                  </div>
                </div>

                {noOfPeople > 1 && (
                  <div className="flex px-6 flex-col gap-4">
                    <p className="bodys lg:titlem">Co-Traveller&apos;s Name</p>
                    {formData.coTraveler?.map((coTraveller, index) => {
                      return (
                        <div key={index} className="space-y-4">
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor={`name-${index}`}>
                              Co-Traveller {index + 1}
                            </InputLabel>
                            <OutlinedInput
                              id={`name-${index}`}
                              name={`name-${index}`}
                              label={`Co-Traveller ${index + 1}*`}
                              value={coTraveller || ""}
                              error={!!errors.coTraveler?.[index]}
                              onChange={(e) =>
                                handlePeopleInputChange(
                                  "coTraveler",
                                  e.target.value,
                                  index
                                )
                              }
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    disableTouchRipple
                                    onClick={() =>
                                      handleClear("coTraveler", index)
                                    }
                                  >
                                    <CancelOutlinedIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                              sx={{
                                color: "#404942",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#404942",
                                },
                                "& .MuiInputLabel-root": {
                                  color: "#404942",
                                },
                                "& .MuiOutlinedInput-input": {
                                  color: "#404942",
                                },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "#404942",
                                  },
                                  "& input": {
                                    color: "#404942",
                                  },
                                },
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input":
                                  {
                                    color: "#404942",
                                  },
                                "& .MuiOutlinedInput-input:-webkit-autofill": {
                                  WebkitBoxShadow: "0 0 0 1000px #E4EAE3 inset",
                                  WebkitTextFillColor: "#404942",
                                },
                              }}
                            />
                          </FormControl>
                          {errors.coTraveler?.[index] && (
                            <p className="text-error bodyl">
                              {errors.coTraveler[index]}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
              <div className="h-fit bg-[#E4EAE3] pt-6 rounded-xl">
                <div className=" flex flex-col gap-2 ">
                  <div className="w-full text-balance px-6 pt-4 headlines md:headlinem">
                    <p>{packageData?.title}</p>
                  </div>
                  <div className="px-6 bg-[#286A48] pb-4 rounded-b-xl pt-2 text-secondary-90">
                    <p className="bodys  lg:titlem">{formData.tourDates}</p>
                    <p className="bodys lg:titlem">
                      {packageData?.durationn}N{packageData?.durationd}D
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-fit bg-[#E4EAE3] pt-6 rounded-xl">
                <div className=" flex flex-col gap-2 ">
                  <div className="w-full text-balance px-6   pt-4 headlines">
                    <p>Apply Coupon</p>
                  </div>
                  <div className="px-6 pb-4 rounded-b-xl pt-2 text-secondary-90">
                    <div className="space-y-4">
                      <FormControl variant="outlined" fullWidth>
                        <OutlinedInput
                          id={`coupon`}
                          name={`coupon`}
                          value={enteredCoupon}
                          error={!!couponError}
                          onChange={(e) => {
                            setEnteredCoupon(e.target.value);
                            setCouponError(""); // Clear error while typing
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                            <div className="flex gap-2">
                              {appliedCoupon && (
                                  <IconButton
                                  disableTouchRipple
                                  onClick={() => {
                                    setAppliedCoupon(null);
                                    setEnteredCoupon("");
                                    setTotalCost(baseTotal);
                                  }}
                                >
                                  <CancelOutlinedIcon />
                                </IconButton>
                              )}
                              <Button onClick={handleApplyCoupon}>
                                {couponLoading ? (
                                  <CircularProgress className="text-white" size={24} />
                                ) : (
                                  "Apply"
                                )}
                              </Button>
                            </div>
                          </InputAdornment>
                          }
                          sx={{
                            color: "#404942",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#404942",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#404942",
                            },
                            "& .MuiOutlinedInput-input": {
                              color: "#404942",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#404942",
                              },
                              "& input": {
                                color: "#404942",
                              },
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input":
                              {
                                color: "#404942",
                              },
                            "& .MuiOutlinedInput-input:-webkit-autofill": {
                              WebkitBoxShadow: "0 0 0 1000px #E4EAE3 inset",
                              WebkitTextFillColor: "#404942",
                            },
                          }}
                        />
                      </FormControl>
                      {couponError && (
                        <p className="text-error bodyl">{couponError}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-fit bg-[#E4EAE3] py-6 rounded-xl">
                <h2 className="headlines text-start px-6 text-[#171D19] border border-b-2 border-b-[#C0C9C0] md:py-4">
                  Payment Details
                </h2>
                <div className=" flex flex-col gap-2 px-6 bodys py-2 lg:titlem">
                  <div className="w-full flex flex-row justify-between items-center text-balance">
                    <p>Trip Package</p>
                    <p>
                      INR {formatIndian(cost)}/- x {noOfPeople}
                    </p>
                  </div>
                  {appliedCoupon && (
                    <div className="w-full flex flex-row justify-between items-center text-balance">
                      <p>Coupon Discount ({appliedCoupon.cname})</p>
                     <p>- INR {formatIndian(Math.floor((Number(appliedCoupon.value) / 100) * baseTotal))}/-</p>
                    </div>
                  )}
                  <div className="w-full flex flex-row justify-between items-center text-balance">
                    <p>GST @ 5%</p>
                    <p>INR {formatIndian(gst)}/-</p>
                  </div>
                  {tcs !== 0 && (
                    <div className="w-full flex flex-row justify-between items-center text-balance">
                      <p>TCS @ 5%</p>
                      <p>INR {formatIndian(tcs)}/-</p>
                    </div>
                  )}
                </div>
                <div className="w-full px-6 flex flex-row justify-between items-center border border-t-2 border-t-[#C0C9C0] pt-4 text-balance">
                  <h2 className="headlines text-center md:text-start text-[#171D19]">
                    Total Cost
                  </h2>
                  <p className="text-secondary-oncontainer text-balance titlel md:headlinem">
                    INR {formatIndian(finalCost)}/-
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
            <div className="bg-[#E4EAE3] w-full md:w-1/2 rounded-xl py-6 flex flex-col gap-4">
              <h2 className="headlines text-[#171D19] px-6 border border-b-2 border-b-[#C0C9C0] md:py-4">
                Booking Details
              </h2>

              <div className="w-[80%] space-y-2 mx-auto">
                <h2 className="titlel text-[#171D19] md:py-4">
                  Personal Details
                </h2>
                <div className=" border-2 bg-[#E4EAE3] border-[#C0C9C0] pb-2 rounded-xl">
                  <div className=" flex flex-col gap-2 px-3 md:px-6 bodys py-2 lg:titlem">
                    <div className="w-full flex flex-row  gap-2 items-center text-balance">
                      <PersonIcon className="text-sm md:text-base" />
                      <p>{formData.name}</p>
                    </div>
                    <div className="w-full flex flex-row gap-2 items-center text-balance">
                      <AlternateEmailIcon className="text-sm md:text-base" />
                      <p>{formData.email}</p>
                    </div>
                    <div className="w-full flex flex-row gap-2 items-center text-balance">
                      <PhoneIcon className="text-sm md:text-base" />
                      <p>{formData.phone}</p>
                    </div>
                    <div className="w-full flex flex-row gap-2 items-center text-balance">
                      <GroupIcon className="text-sm md:text-base" />
                      <p>
                        {noOfPeople} {noOfPeople > 1 ? "Adults" : "Adult"}
                      </p>
                    </div>
                    {formData.coTraveler && formData.coTraveler.length > 0 && (
                      <div className="w-full flex flex-row gap-2 items-center text-balance">
                        <PersonAddIcon className="text-sm md:text-base" />
                        <p>
                          {formData.coTraveler
                            .filter((name) => name)
                            .join(", ")}{" "}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[80%] space-y-2 mx-auto">
                <h2 className="titlel text-[#171D19] md:py-4">
                  Payment Details
                </h2>
                <div className=" border-2 bg-[#E4EAE3] border-[#C0C9C0] pb-2 rounded-xl">
                  <div className=" flex flex-col gap-2 px-3 md:px-6 bodys py-2 lg:titlem">
                    <div className="w-full flex flex-row justify-between items-center text-balance">
                      <p>Trip Package</p>
                      <p>
                        INR {formatIndian(cost)}/- x {noOfPeople}
                      </p>
                    </div>
                    <div className="w-full flex flex-row justify-between items-center text-balance">
                      <p>GST @ 5%</p>
                      <p>INR {formatIndian(gst)}/-</p>
                    </div>
                    {tcs !== 0 && (
                      <div className="w-full flex flex-row justify-between items-center text-balance">
                        <p>TCS @ 5%</p>
                        <p>INR {formatIndian(tcs)}/-</p>
                      </div>
                    )}
                  </div>
                  <div className="w-full px-3 md:px-6 flex flex-row justify-between items-center border border-t-2 border-t-[#C0C9C0] pt-2 text-balance">
                    <h2 className="titlem lg:titlel text-center md:text-start text-[#171D19]">
                      Total Cost
                    </h2>
                    <p className="text-secondary-oncontainer text-balance font-bold titlem md:titlel lg:headlines">
                      INR {formatIndian(finalCost)}/-
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
              <div className="h-fit bg-[#E4EAE3] pt-6 rounded-xl">
                <div className=" flex flex-col gap-2 ">
                  <div className="w-full text-balance px-6   pt-4 headlines md:headlinem">
                    <p>{packageData?.title}</p>
                  </div>
                  <div className="px-6 bg-[#286A48] pb-4 rounded-b-xl pt-2 text-secondary-90">
                    <p className="bodys  lg:titlem">{formData.tourDates}</p>
                    <p className="bodys lg:titlem">
                      {packageData?.durationn}N{packageData?.durationd}D
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-fit w-full bg-[#E4EAE3] py-6 space-y-2 rounded-xl">
                <FormControl component="fieldset" className="px-4 w-full">
                  <RadioGroup
                    aria-label="payment options"
                    value={paymentOption}
                    onChange={(event) => setPaymentOption(event.target.value)}
                    name="paymentOptions"
                  >
                    <FormControlLabel
                      value="full"
                      control={<Radio />}
                      className="titlel"
                      label={`Pay full amount now INR ${formatIndian(finalCost)}/-`}
                    />
                    <div className="flex justify-between items-center gap-2 w-full my-2">
                      <div className="h-0.5 bg-[#C0C9C0] w-full" />
                      <p className="text-center">or</p>
                      <div className="h-0.5 bg-[#C0C9C0] w-full" />
                    </div>
                    <FormControlLabel
                      value="partial"
                      control={<Radio />}
                      label="Pay advance now and remaining amount later"
                    />
                    <div className="space-y-2 pt-4 bodys lg:titlem px-2">
                      <div className="w-full  flex flex-row  justify-between items-center text-balance">
                        <p>Advance</p>
                        <p>INR {formatIndian(advance)}/-</p>
                      </div>
                      <div className="w-full flex flex-row justify-between items-center text-pretty">
                        <p className="w-1/2 xl:w-2/3">
                          Pay due amount 2 days before trip starts
                        </p>
                        <p>INR {formatIndian(paymentPartial)}/-</p>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </section>
        )}
      </section>

      <section
        className={cn(
          `bg-[#E4EAE3]  shadow-cardShadow border-t-2 sticky flex left-0 bottom-0 w-full rounded-xl p-4 gap-2 md:p-6 text-start`,
          `${activeStep !== 0 ? "flex-col" : "flex-row justify-between"}`
        )}
      >
        {activeStep < 2 && (
          <div className="flex flex-col gap-1">
            <h2 className="titles md:titlem font-normal text-[#171D19]">
              Pay
              <span className=" text-balance titlel md:headlines text-primary">
                {" "}
                INR {formatIndian(advance)}/-
              </span>{" "}
              now
            </h2>

            <h2 className="text-secondary-oncontainer text-balance titlel md:headlines">
              <span className="titlem font-normal">to confirm your trip</span>
            </h2>
          </div>
        )}

        <div className="flex flex-row justify-between items-center">
          {activeStep !== 0 && (
            <Button variant={"outline"} onClick={goBack}>
              Go Back
            </Button>
          )}
          <Button onClick={goForward}>
            {activeStep === 3 ? (
              loading ? (
                <CircularProgress className="text-white" size={24} />
              ) : (
                "Pay now"
              )
            ) : (
              "Book Now"
            )}
          </Button>
        </div>
      </section>
    </main>
  );
};
const queryClient = new QueryClient();

const PackagePageWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingPage />
    </QueryClientProvider>
  );
};

export default PackagePageWrapper;
