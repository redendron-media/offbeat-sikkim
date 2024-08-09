"use client";
import { Button } from "@/components/ui/button";
import {
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
import React, { ChangeEvent, useEffect, useState } from "react";
import { UpcomingForm } from "@/lib/types";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { motion } from "framer-motion";
import { packagesData } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import { payment } from "@/action/ServerActions";

interface CustomConnectorWrapperProps {
  activeStep: number;
}

const CustomConnectorWrapper = ({
  activeStep,
}: CustomConnectorWrapperProps) => {
  const progress = (activeStep + 1) * 50;
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

const BookingPage = () => {
  const router = useRouter();
  const { link } = useParams();
  const decodedLink = decodeURIComponent(link as string);
  const packageData = packagesData.find(
    (packagedata) => packagedata.link === decodedLink
  );

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useState(0);
  const [noOfPeople, setNoOfPeople] = useState(1);
  const [errors, setErrors] = useState<Partial<UpcomingForm>>({});
  const [formData, setFormData] = useState<UpcomingForm>({
    packageName: packageData?.title || "",
    name: "",
    email: "",
    phone: "",
    noOfAdults: noOfPeople.toString(),
    tourDates:packageData?.tourDates?.[0] ?? "",
    source: "upcoming",
  });
  const [paymentOption, setPaymentOption] = useState("full");
  
  const [loading,setLoading] = useState(false);
  const cost = Number(packageData?.currentPrice?.replace(/,/g, ""));
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleClear = (field: keyof UpcomingForm) => {
    setFormData({ ...formData, [field]: "" });
    setErrors({ ...errors, [field]: "" });
  };

  const totalCost = cost * noOfPeople;
  const gst = Math.round(totalCost * 0.05);
  let tcs;
  if(packageData?.title.includes("Bhutan")) {
     tcs = Math.round(totalCost * 0.05);;
  } else { tcs = 0}
  const finalCost = totalCost + gst + tcs;
  const advance = 5000 * noOfPeople;
  const paymentPartial = finalCost - advance;
  let paylater = 0;
  if (paymentOption === "partial") {
    paylater = finalCost - advance;
  }

  let gatewayCost ;
  if(paymentOption === "full"){
    gatewayCost = finalCost* 100;
  } else {
    gatewayCost = advance * 100;
  }

  const formatIndian = (number: number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };

  const validateForm = () => {
    const newErrors: Partial<UpcomingForm> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    return newErrors;
  };

  const handleValidateAndNext = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep(step + 1);
    setActiveStep(activeStep + 1);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      noOfAdults: noOfPeople.toString(),
    }));
  }, [noOfPeople]);

  const makePayment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      tourPackage: formData.packageName,
      noOfAdults: parseInt(formData.noOfAdults, 10) || 0,
      tourDates: formData.tourDates,
      modeOfPayment: paymentOption,
      amountPaid: formatIndian(gatewayCost/100),
      amountRemaining: formatIndian(paylater),
      source: formData.source,
    };

    const redirect = await payment(formData.phone, gatewayCost);
    const transactionId = redirect.transactionid;

    const response = await fetch("/api/store-formdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactionId, formData: payload }),
    });


    // await fetch("/api/send-email", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ ...payload, transactionId }),
    // });

    console.log("redirect >>", redirect.url);
    router.push(redirect.url);
  }
  return (
    <main className="flex bg-[#F6FBF4] flex-col py-6 px-4 md:px-6 max-w-screen-2xl gap-4 mx-auto">
      {step === 0 && (
        <>
          <section className="bg-[#E4EAE3] rounded-xl px-6 py-4 md:p-6 flex-col gap-4 justify-between items-center">
            <h2 className="headlines md:displaym lg:displayl text-black">
              {packageData?.title}
            </h2>
            <p className="bodyl text-black">
              {packageData?.durationn}N {packageData?.durationd}D
            </p>
          </section>
          <section className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="bg-[#E4EAE3] w-full md:w-1/2 rounded-xl py-6 flex flex-col gap-4">
              <h2 className="headlines text-[#171D19] px-6 border border-b-2 border-b-[#C0C9C0] md:py-4">
                Available Dates
              </h2>
              <FormControl className="px-4 md:px-6">
                <RadioGroup
                  aria-labelledby="dates"
                  name="tourDates"
                  value={formData?.tourDates}
                  onChange={handleRadioChange}
                >
                  {packageData?.tourDates?.map((date, index) => (
                    <FormControlLabel
                      id={`${index}`}
                      key={index}
                      value={date}
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "#19A96C",
                            },
                          }}
                        />
                      }
                      label={date}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <div className=" w-full md:w-1/2  md:h-[65svh] flex flex-col justify-between gap-4">
              <div className="h-fit bg-[#E4EAE3] py-6 rounded-xl">
                <h2 className="headlines px-6 text-[#171D19] border border-b-2 border-b-[#C0C9C0] md:py-4">
                  Cost
                </h2>
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

              <div className="bg-[#E4EAE3] w-full rounded-xl p-4 md:p-6 text-start flex flex-col gap-1">
                <h2 className="titlem md:headlines font-normal text-[#171D19]">
                  Starting Price
                </h2>
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-secondary-oncontainer text-balance titlel md:headlinem">
                    INR {packageData?.currentPrice}/-{" "}
                    <span className="titlem font-normal">per head</span>
                  </h2>
                  <Button onClick={() => setStep(step + 1)}>Book now</Button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {step > 0 && (
        <section className="flex flex-row gap-4 md:gap-8 w-full">
          <CustomConnectorWrapper activeStep={activeStep} />
        </section>
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

              <div className="hidden md:flex">
                <Button
                  className="w-fit "
                  onClick={() => {
                    setStep(step - 1);
                  }}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 md:h-[65svh] flex flex-col justify-between gap-4">
            <div className="h-fit bg-[#E4EAE3] py-6 rounded-xl">
              <h2 className="headlines md:text-start px-6 text-[#171D19] border border-b-2 border-b-[#C0C9C0] md:py-4">
                Trip Detail
              </h2>
              <div className=" flex flex-col gap-2 px-4">
                <div className="w-full text-balance  px-1  pt-4 headlines md:headlinem">
                  <p>{packageData?.title}</p>
                </div>

                <p className="bodys lg:titlem">{formData.tourDates}</p>
                <p className="bodys lg:titlem">
                  {packageData?.durationn}N{packageData?.durationd}D
                </p>
              </div>
            </div>

            <div className="bg-[#E4EAE3] w-full rounded-xl p-4 md:p-6 text-start flex flex-col gap-1">
              <h2 className="titlem md:headlines font-normal text-[#171D19]">
                Starting Price
              </h2>
              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                <h2 className="text-secondary-oncontainer text-balance titlel md:headlinem">
                  INR {packageData?.currentPrice}/-{" "}
                  <span className="titlem font-normal">per head</span>
                </h2>
                <div className="flex flex-row justify-between">
                  <Button
                    className="flex md:hidden"
                    onClick={() => setStep(step - 1)}
                  >
                    Go Back
                  </Button>
                  <Button onClick={handleValidateAndNext}>Continue</Button>
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
            <div className="flex flex-col justify-between h-full">
              <div className="px-6 flex flex-row justify-between items-center">
                <p className="bodys lg:titlem">Adults</p>
                <div className="flex gap-0.5 justify-between items-center border border-secondary rounded-2xl">
                  <IconButton
                    onClick={() => {
                      setNoOfPeople(Math.max(noOfPeople - 1, 1));
                    }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                  >
                    <RemoveIcon className="text-primary" />
                  </IconButton>
                  <p className="text-base">{noOfPeople}</p>
                  <IconButton
                    onClick={() => {
                      setNoOfPeople(noOfPeople + 1);
                    }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                  >
                    <AddIcon className="text-primary" />
                  </IconButton>
                </div>
              </div>
              <Button
                className="w-fit mx-6 hidden md:flex"
                onClick={() => setStep(step - 1)}
              >
                Go Back
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
            <div className="h-fit bg-[#E4EAE3] py-6 rounded-xl">
              <h2 className="headlines text-start px-6 text-[#171D19] border border-b-2 border-b-[#C0C9C0] md:py-4">
                Trip Detail
              </h2>
              <div className=" flex flex-col gap-2 px-6">
                <div className="w-full text-balance  px-1 pt-4 headlines md:headlinem">
                  <p>{packageData?.title}</p>
                </div>

                <p className="bodys lg:titlem">{formData?.tourDates}</p>
                <p className="bodys lg:titlem">{packageData?.durationn}N{packageData?.durationd}D</p>
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
                <div className="w-full flex flex-row justify-between items-center text-balance">
                  <p>GST @ 5%</p>
                  <p>INR {formatIndian(gst)}/-</p>
                </div>
                { 
                  tcs !== 0 && (
                    <div className="w-full flex flex-row justify-between items-center text-balance">
                    <p>TCS @ 5%</p>
                    <p>INR {formatIndian(tcs)}/-</p>
                  </div>
                  )
                }
              
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

            <div className="w-full rounded-xl p-4 md:p-6 text-start flex flex-row md:flex-col justify-between md:items-end">
              <Button
                className="w-fit flex md:hidden"
                onClick={() => {setStep(step - 1);setActiveStep(activeStep-1)}}
              >
                Go Back
              </Button>
              <Button
                className="w-fit"
                onClick={() => {
                  setStep(step + 1);
                  setActiveStep(activeStep + 1);
                }}
              >
                Continue
              </Button>
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
                </div>
              </div>
            </div>

            <div className="w-[80%] space-y-2 mx-auto">
              <h2 className="titlel text-[#171D19] md:py-4">Payment Details</h2>
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
                  {
                    tcs !== 0 && (
                      <div className="w-full flex flex-row justify-between items-center text-balance">
                      <p>TCS @ 5%</p>
                      <p>INR {formatIndian(tcs)}/-</p>
                    </div>
                    )
                  }
                
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
            <div className="px-6">
              <Button
                className="w-fit hidden md:flex"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                Go Back
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
            <div className="h-fit bg-[#E4EAE3] py-6 rounded-xl">
              <h2 className="headlines  px-6 text-[#171D19] border border-b-2 border-b-[#C0C9C0] md:py-4">
                Trip Detail
              </h2>
              <div className=" flex flex-col gap-2 px-6">
                <div className="w-full text-balance  px-1  pt-4 headlines md:headlinem">
                  <p>{packageData?.title}</p>
                </div>

                <p className="bodys lg:titlem">{formData.tourDates}</p>
                <p className="bodys lg:titlem">{packageData?.durationn}N{packageData?.durationd}D</p>
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

            <div className=" w-full rounded-xl p-4 md:p-6 text-start flex md:flex-col justify-between md:items-end">
              <Button
                className="w-fit md:hidden"
                onClick={() => {
                  setActiveStep(activeStep - 1);
                  setStep(step - 1);
                }}
              >
                Go Back
              </Button>
              <Button disabled={loading} className="w-fit" onClick={makePayment}>
              {" "}
              {loading ? <CircularProgress className="text-white" size={24} /> : "Pay now"}
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BookingPage;
