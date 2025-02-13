"use client";
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  InputAdornment,
  Input,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Step1FormData } from "@/lib/types";

interface Step1FormProps {
  formData: Step1FormData;
  errors: Partial<Step1FormData>;
  handleClear: (field: keyof Step1FormData) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
}

const Step1Form: React.FC<Step1FormProps> = ({
  formData,
  errors,
  handleClear,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
      <div className="flex flex-col col-span-2 gap-1 -mt-6 pb-4 text-center">
        <h2 className="headlines text-primary">
          Create your customized itinerary in 3..2..1!
        </h2>
        <p className="bodys text-[#575F6E]">
          Fill in the details below to customize your itinerary
        </p>
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
        <InputLabel id="address">Address</InputLabel>
        <Select
          className="w-full"
          labelId="address"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleSelectChange}
          required
          error={!!errors.address}
          MenuProps={{
            sx:{
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#19A96C',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#A5F3C3',
              },
            }
          }}
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
          <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
          <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
          <MenuItem value="Assam">Assam</MenuItem>
          <MenuItem value="Bihar">Bihar</MenuItem>
          <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
          <MenuItem value="Goa">Goa</MenuItem>
          <MenuItem value="Gujarat">Gujarat</MenuItem>
          <MenuItem value="Haryana">Haryana</MenuItem>
          <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
          <MenuItem value="Jharkhand">Jharkhand</MenuItem>
          <MenuItem value="Karnataka">Karnataka</MenuItem>
          <MenuItem value="Kerala">Kerala</MenuItem>
          <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
          <MenuItem value="Maharashtra">Maharashtra</MenuItem>
          <MenuItem value="Manipur">Manipur</MenuItem>
          <MenuItem value="Meghalaya">Meghalaya</MenuItem>
          <MenuItem value="Mizoram">Mizoram</MenuItem>
          <MenuItem value="Nagaland">Nagaland</MenuItem>
          <MenuItem value="Odisha">Odisha</MenuItem>
          <MenuItem value="Punjab">Punjab</MenuItem>
          <MenuItem value="Rajasthan">Rajasthan</MenuItem>
          <MenuItem value="Sikkim">Sikkim</MenuItem>
          <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
          <MenuItem value="Telangana">Telangana</MenuItem>
          <MenuItem value="Tripura">Tripura</MenuItem>
          <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
          <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
          <MenuItem value="West Bengal">West Bengal</MenuItem>
          <MenuItem value="Andaman and Nicobar Islands">
            Andaman and Nicobar Islands
          </MenuItem>
          <MenuItem value="Chandigarh">Chandigarh</MenuItem>
          <MenuItem className="whitespace-normal" value="Dadra and Nagar Haveli and Daman and Diu">
            Dadra and Nagar Haveli and Daman and Diu
          </MenuItem>
          <MenuItem value="Delhi">Delhi</MenuItem>
          <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
          <MenuItem value="Puducherry">Puducherry</MenuItem>
        </Select>
        {errors.address && (
          <p className="text-error bodyl">{errors.address}</p>
        )}
      </FormControl>

      <FormControl className="col-span-1">
        <InputLabel id="travel_style">Accomodation</InputLabel>
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
          <MenuItem
            value="Economy"
            className="whitespace-nowrap overflow-x-auto"
          >
            Economy (Homestay and 2 star hotels)
          </MenuItem>
          <MenuItem
            value="Mid-Range"
            className="whitespace-nowrap overflow-x-auto"
          >
            Mid Scale(2-3 start hotels )
          </MenuItem>
          <MenuItem
            value="Upscale"
            className="whitespace-nowrap overflow-x-auto"
          >
             Upscale(3-4 star hotels )
          </MenuItem>
          <MenuItem
            value="Luxury"
            className="whitespace-nowrap overflow-x-auto"
          >
            Luxury(4-5 star hotels/ Heritage  hotels)
          </MenuItem>
          <MenuItem
            value="All"
            className="whitespace-nowrap overflow-x-auto"
          >
            All options
          </MenuItem>
        </Select>
        {errors.travel_style && (
          <p className="text-error bodyl">{errors.travel_style}</p>
        )}
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
          <MenuItem value="Sikkim Darjeeling">Sikkim and Darjeeling</MenuItem>
          <MenuItem value="North Bengal">North Bengal</MenuItem>
          <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
          <MenuItem value="Nagaland">Nagaland</MenuItem>
          <MenuItem value="Meghalaya">Meghalaya</MenuItem>
          <MenuItem value="Bhutan">Bhutan</MenuItem>
        </Select>
        {errors.places && <p className="text-error bodyl">{errors.places}</p>}
      </FormControl>
{/* 
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
        {errors.accommodation && (
          <p className="text-error bodyl">{errors.accommodation}</p>
        )}
      </FormControl> */}
    </div>
  );
};

export default Step1Form;
