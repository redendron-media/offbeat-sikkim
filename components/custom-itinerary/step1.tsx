"use client";
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, IconButton, InputAdornment, Input, SelectChangeEvent, OutlinedInput } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Step1FormData } from "@/lib/types";


interface Step1FormProps {
  formData: Step1FormData;
  errors: Partial<Step1FormData>;
  handleClear: (field: keyof Step1FormData) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
 
}

const Step1Form: React.FC<Step1FormProps> = ({ formData, errors, handleClear, handleInputChange, handleSelectChange }) => {
 
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
      <div className="flex flex-col col-span-2 gap-1 -mt-6 pb-4 text-center">
        <h2 className="headlines text-primary">Create your customized itinerary in 3..2..1!</h2>
        <p className="bodys text-[#575F6E]">Fill in the details below to customize your itinerary</p>
      </div>

      <div className="col-span-1 flex items-center">
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
                <IconButton disableTouchRipple onClick={() => handleClear("name")}>
                  <CancelOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
            sx={{
              color: "#404942",
              "& .MuiOutlinedInput-notchedOutline" : {
                borderColor : "#404942",
             },
              "& .MuiInputLabel-root": {
                color: "#404942",
              },
              "& .MuiOutlinedInput-input": {
                color: '#404942'
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#404942",
                },
                "& input": {
                  color: "#404942",
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "#404942",
              },
              "& .MuiOutlinedInput-input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #F6FBF4 inset",
                WebkitTextFillColor: "#404942",
              },
            }}
          />
          {errors.name && <p className="text-error bodyl">{errors.name}</p>}
        </FormControl>
      </div>

      <div className="col-span-1 flex items-center">
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            label='Email*'
            error={!!errors.email}
            value={formData.email}
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton disableTouchRipple onClick={() => handleClear("email")}>
                  <CancelOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
            sx={{
              color: "#404942",
              "& .MuiOutlinedInput-notchedOutline" : {
                borderColor : "#404942",
             },
              "& .MuiInputLabel-root": {
                color: "#404942",
              },
              "& .MuiOutlinedInput-input": {
                color: '#404942'
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#404942",
                },
                "& input": {
                  color: "#404942",
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "#404942",
              },
              "& .MuiOutlinedInput-input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #F6FBF4 inset",
                WebkitTextFillColor: "#404942",
              },
            }}
          />
          {errors.email && <p className="text-error bodyl">{errors.email}</p>}
        </FormControl>
      </div>
      <div className="col-span-1 flex items-center">
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
                <IconButton disableTouchRipple onClick={() => handleClear("phone")}>
                  <CancelOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
            sx={{
              color: "#404942",
              "& .MuiOutlinedInput-notchedOutline" : {
                borderColor : "#404942",
             },
              "& .MuiInputLabel-root": {
                color: "#404942",
              },
              "& .MuiOutlinedInput-input": {
                color: '#404942'
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#404942",
                },
                "& input": {
                  color: "#404942",
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "#404942",
              },
              "& .MuiOutlinedInput-input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #F6FBF4 inset",
                WebkitTextFillColor: "#404942",
              },
            }}
          />
          {errors.phone && <p className="text-error bodyl">{errors.phone}</p>}
        </FormControl>
      </div>

      <FormControl className="col-span-1">
        <InputLabel id="travel_style">Travel Style</InputLabel>
        <Select
          className="w-full"
          labelId="travel_style"
          label="Travel Style"
          name="travel_style"
          value={formData.travel_style}
          onChange={handleSelectChange}
          required
          error={!!errors.travel_style}
          sx={{
            color: "#404942",
            "& .MuiInputLabel-root": {
              color: "#404942",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#404942",
            },
            "& input": {
              color: "#404942",
            },
          }}
        >
       <MenuItem value="Premium">Premium</MenuItem>
       <MenuItem value="Mid-Range">Mid-Range</MenuItem>
        </Select>
        {errors.travel_style && <p className="text-error bodyl">{errors.travel_style}</p>}
      </FormControl>

      <FormControl className="col-span-1">
        <InputLabel id="places">Places of Interest</InputLabel>
        <Select
          className="w-full"
          labelId="places"
          label="Places of Interest"
          name="places"
          value={formData.places}
          onChange={handleSelectChange}
          required
          error={!!errors.places}
          sx={{
            color: "#404942",
            "& .MuiInputLabel-root": {
              color: "#404942",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#404942",
            },
            "& input": {
              color: "#404942",
            },
          }}
        >
          <MenuItem value="Sikkim">Sikkim</MenuItem>
          <MenuItem value="North Bengal">North Bengal</MenuItem>
          <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
          <MenuItem value="Nagaland">Nagaland</MenuItem>
          <MenuItem value="Meghalaya">Meghalaya</MenuItem>
          <MenuItem value="Bhutan">Bhutan</MenuItem>
        </Select>
        {errors.places && <p className="text-error bodyl">{errors.places}</p>}
      </FormControl>

      <FormControl className="col-span-1">
        <InputLabel id="accommodation">Accommodation Type</InputLabel>
        <Select
          className="w-full"
          labelId="accommodation"
          label="Accommodation Type"
          name="accommodation"
          value={formData.accommodation}
          onChange={handleSelectChange}
          required
          error={!!errors.accommodation}
          sx={{
            color: "#404942",
            "& .MuiInputLabel-root": {
              color: "#404942",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#404942",
            },
            "& input": {
              color: "#404942",
            },
          }}
        >
        <MenuItem value="Resort">Resort</MenuItem>
        <MenuItem value="Hotel">Hotel</MenuItem>
        <MenuItem value="Homestay">Homestay</MenuItem>

        </Select>
        {errors.accommodation && <p className="text-error bodyl">{errors.accommodation}</p>}
      </FormControl>
    </div>
  );
};

export default Step1Form;