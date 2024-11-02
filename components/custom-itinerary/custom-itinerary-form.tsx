"use client";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Step1Form from "./step1";
import Step2Form from "./step2";
import Step3Form from "./step3";
import {
  Step1FormData,
  Step2FormData,
  Step3FormData,
  FormData,
} from "@/lib/types";
import dayjs from "dayjs";
import { CircularProgress, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { cn } from "@/lib/utils";

interface CustomConnectorWrapperProps {
  activeStep: number;
}
const CustomConnectorWrapper = ({
  activeStep,
}: CustomConnectorWrapperProps) => {
  const progress = (activeStep + 1) * 25;
  const remaining = 100 - progress;
  return (
    <div className="flex h-full p-4 flex-row gap-1.5">
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

const Custom_Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    travel_style: "Premium",
    places: "",
    accommodation: "Resort",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    destination: [],
    noOfAdults: "",
    noOfChildren: [""],
    additionalInformation: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  


  const handleInputChangeChildren = (index: number, value: string) => {
    const updatedFields = [...formData.noOfChildren];

    if (value === "0") {
      
      updatedFields[index] = "";
    } else {
      updatedFields[index] = value;
    }
  
    const cleanedFields = updatedFields.filter((field) => field.trim() !== "");
    setFormData((prevFormData) => ({
      ...prevFormData,
      noOfChildren: cleanedFields.length > 0 ? cleanedFields : [""], 
    }));
  
    setErrors((prevErrors) => ({ ...prevErrors, noOfChildren: [] }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value as string });
    setErrors((prevErrors) => ({ ...prevErrors, [name as string]: "" }));
  };

  const handleClear = (field: keyof FormData) => {
    setFormData({ ...formData, [field]: "" });
  };

  const handleDateChange = (date: dayjs.Dayjs | null, field: keyof Step2FormData) => {
    const newFormData = {
      ...formData,
      [field]: date ? date.format("YYYY-MM-DD") : "",
    };
  
   
    if (newFormData.startDate && newFormData.endDate) {
      const start = dayjs(newFormData.startDate);
      const end = dayjs(newFormData.endDate);
      const numberOfDays = end.diff(start, "day") + 1; 
      newFormData.noOfDays = numberOfDays >= 0 ? numberOfDays : 0; 
    }
  
    setFormData(newFormData);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  
  const handleDestinationToggle = (destination: string) => {
    setFormData((prevData) => ({
      ...prevData,
      destination: prevData.destination.includes(destination)
        ? prevData.destination.filter((d) => d !== destination)
        : [...prevData.destination, destination],
    }));
    setErrors((prevErrors) => ({ ...prevErrors, destination: [""] }));
  };
  const handleAddField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      noOfChildren: [...prevFormData.noOfChildren, ""],
    }));
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = formData.noOfChildren.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      noOfChildren: updatedFields,
    }));
  };

  const validateStep1 = () => {
    const newErrors: Partial<Step1FormData> = {};
    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.email) newErrors.email = "Please enter your email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.phone) newErrors.phone = "Please enter your phone number";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.travel_style)
      newErrors.travel_style = "Please select your travel style";
    if (!formData.places)
      newErrors.places = "Please select your place of interest";
    // if (!formData.accommodation)
    //   newErrors.accommodation = "Please select your accommodation type";
    if (!formData.address)
      newErrors.address= "Please select your address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<Step2FormData> = {};

    if (!formData.startDate) newErrors.startDate = "Please select a start date";
    if (!formData.endDate) newErrors.endDate = "Please select an end date";
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }
    if (formData.destination.length === 0)
      newErrors.destination = ["Please select at least one destination"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Partial<Step3FormData> = {};
    if (!formData.noOfAdults)
      newErrors.noOfAdults = "Number of adults is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;

    if (activeStep === 0) {
      isValid = validateStep1();
    } else if (activeStep === 1) {
      isValid = validateStep2();
    } else if (activeStep === 2) {
      isValid = validateStep3();
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep3()) {
      setLoading(true);
      setIsSubmitted(false);

      const payload = {
        name: formData.name,
        phone_number: formData.phone,
        email: formData.email,
        start_Date: formData.startDate,
        no_of_adults: parseInt(formData.noOfAdults, 10) || 0,
        no_of_children: formData.noOfChildren.filter(age => age.trim() !== "").length,
        children_details: formData.noOfChildren
        .filter(age => age.trim() !== "")
        .map(age => ({ age: parseInt(age, 10) })),
        travel_style: formData.travel_style,
        destination: formData.places,
        // accommodation: formData.accommodation,
        endDate: formData.endDate,
        destinations: formData.destination,
        comments: formData.additionalInformation,
        no_of_days:formData.noOfDays,
        address:formData.address,
      };

      const config = {
        method: "post",
        url: "/api/trip-plan-request",
        headers: {
          Accept: "application/json",
        },
        data: payload,
      };

      try {
        const response = await axios(config);
        console.log("Response:", response.data); // Add logging
        setResponseMessage(response.data.message);
      } catch (error: any) {
        console.error("Submission error:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config,
        });
        setResponseMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
        setIsSubmitted(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  return (
    <form className="w-full flex flex-col px-2.5 md:px-16 py-12 gap-8">
      <CustomConnectorWrapper activeStep={activeStep} />

      <div className="flex-1">
        {activeStep === 0 && (
          <Step1Form
            formData={formData}
            errors={errors}
            handleClear={handleClear}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        )}
        {activeStep === 1 && (
          <Step2Form
            formData={formData}
            errors={errors}
            handleClear={handleClear}
            handleDateChange={handleDateChange}
            handleDestinationToggle={handleDestinationToggle}
            selectedPlaceOfInterest={formData.places}
          />
        )}
        {activeStep === 2 && (
          <Step3Form
            formData={formData}
            errors={errors}
            handleClear={handleClear}
            handleInputChange={handleInputChange}
            handleInputChangeChildren={handleInputChangeChildren}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
          />
        )}
        {activeStep === 3 && (
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2 h-48 items-center justify-center">
            <div className=" flex flex-col col-span-2 gap-4 -mt-6 pb-4 text-center">
              <h2 className="headlines text-primary ">
                Your itinerary has been created successfully!
              </h2>
              <p className="bodyl text-[#575F6E]">
              Our representative will get back to you shortly. Stay tuned for an exciting journey ahead!
              </p>
            </div>
          </div>
        )}
      </div>
      {activeStep !== 3 && (
        <div
          className={cn(
            "flex flex-row ",
            `${activeStep === 0 ? "justify-end" : "justify-between"}`
          )}
        >
          {activeStep !== 0 && (
            <Button
              variant={"outline"}
              className="gap-1 flex flex-row items-center px-4 md:px-11"
              onClick={handleBack}
              type="button"
            >
              <ArrowBackIcon className="text-lg" />
              <span className="labell">Back</span>
            </Button>
          )}

          {activeStep === 2 ? (
            <Button
              type="button"
              className="gap-1 flex flex-row labell items-center px-4 md:px-11"
              onClick={handleSubmit}
              disabled={loading}
            >
              {" "}
              {loading ? <CircularProgress size={24} /> : "Create Itinerary"}
              {!loading && <ArrowForwardIcon className="text-lg" />} 
            </Button>
          ) : (
            <Button
              type="button"
              className="gap-1 flex flex-row labell self-end px-4 md:px-11"
              onClick={handleNext}
            >
              {" "}
              Next
              <ArrowForwardIcon className="text-lg" />
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default Custom_Form;
