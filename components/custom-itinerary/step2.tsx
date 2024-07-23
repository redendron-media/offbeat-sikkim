"use client";
import React from "react";
import { Step2FormData } from "@/lib/types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import { Chip,FormControl, TextField, Button, IconButton, InputAdornment} from "@mui/material";
import { placesAndDestinations } from "@/constants";

interface Step2FormProps {
  formData: Step2FormData;
  errors: Partial<Step2FormData>;
  handleClear?: (field: keyof Step2FormData) => void;
  handleDateChange: (date: dayjs.Dayjs | null, field: keyof Step2FormData) => void;
  handleDestinationToggle: (destination: string) => void;
  selectedPlaceOfInterest: string[];
}

const Step2Form: React.FC<Step2FormProps> = ({ 
  formData,
  errors,
  handleClear,
  handleDateChange,
  handleDestinationToggle,
  selectedPlaceOfInterest,}) => {

   
    return (
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
        <div className="flex flex-col col-span-2 gap-1 -mt-6 pb-4 text-center">
          <h2 className="headlines text-primary">Please select your tour dates and destinations</h2>
          <p className="bodys text-[#575F6E]">Fill in the details below to customize your itinerary</p>
        </div>
  
        <div className="col-span-1 flex gap-2 flex-col">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-full"
              label="Start Date"
              disablePast
              value={formData.startDate ? dayjs(formData.startDate) : null}
              onChange={(date) => handleDateChange(date, "startDate")} 
              sx={{
                "& .MuiInputLabel-root": {
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
              }}
            />
          {errors.startDate && <p className="text-error bodyl">{errors.startDate}</p>}
          </LocalizationProvider>
        </div>
  
        <div className="col-span-1 flex gap-2 flex-col">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-full"
              label="End Date"
              disablePast
              value={formData.endDate ? dayjs(formData.endDate) : null}
              onChange={(date) => handleDateChange(date, "endDate")}
              sx={{
                "& .MuiInputLabel-root": {
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
              }}
            />
          {errors.endDate && <p className="text-error bodyl">{errors.endDate}</p>}
          </LocalizationProvider>
        </div>
  
        <div className="col-span-2 space-y-3">
          <p className="text-black bodym">Select Destinations</p>
          {selectedPlaceOfInterest.map((place) => {
            const availableDestinations = placesAndDestinations[place] || [];
            return(
              <div key={place} className="space-y-4">
                <h3 className="bodyl">
                {place}
                </h3>
                <div className="flex flex-wrap gap-2">
                {availableDestinations.map((destination, index) => (
              <Chip
                className="text-primary"
                key={index}
                label={destination}
                clickable
                onClick={() => handleDestinationToggle(destination)}
                variant={
                  formData.destination.includes(destination) ? "filled" : "outlined"
                }
                sx={{
                  ...(formData.destination.includes(destination)
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
                    backgroundColor: formData.destination.includes(destination)
                      ? "primary.dark"
                      : "rgba(25, 169, 108, 0.1)",
                  },
                }}
              />
            ))}
                </div>
              </div>
            )
          })}
          {errors.destination && (
            <p className="text-error bodyl">{errors.destination}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Step2Form;

