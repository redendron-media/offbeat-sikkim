"use client";
import React from "react";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Step3FormData } from "@/lib/types";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Step3FormProps {
  formData: Step3FormData;
  errors: Partial<Step3FormData>;
  handleClear: (field: keyof Step3FormData) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChangeChildren: (index: number, value: string) => void;
  handleAddField: () => void;
  handleRemoveField: (index: number) => void;
}

const Step3Form: React.FC<Step3FormProps> = ({
  formData,
  errors,
  handleClear,
  handleInputChange,
  handleInputChangeChildren,
  handleAddField,
  handleRemoveField,
}) => {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
      <div className=" flex flex-col col-span-2 gap-1 -mt-6 pb-4 text-center">
        <h2 className="headlines text-primary ">Almost there!</h2>
        <p className="bodys text-[#575F6E]">
          Fill in the details below to customize your itinerary
        </p>
      </div>
      <div className="col-span-1 flex items-center">
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="noOfAdults">Number of Adults</InputLabel>
          <OutlinedInput
            id="noOfAdults"
            name="noOfAdults"
            type="number"
            label="Number of Adults*"
            value={formData.noOfAdults}
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disableTouchRipple
                  onClick={() => handleClear("noOfAdults")}
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
          {errors.noOfAdults && (
            <p className="text-error bodyl">{errors.noOfAdults}</p>
          )}
        </FormControl>
      </div>

      <div className="gap-3 flex flex-wrap">
        {formData.noOfChildren.map((field, index) => (
          <div key={index} className="col-span-1 flex items-center space-x-2">
            <FormControl variant="outlined" className="w-52">
              <InputLabel htmlFor={`noOfChildren-${index}`}>
                No of Children & Age
              </InputLabel>
              <Select
                className="w-full"
                id={`noOfChildren-${index}`}
                name="noOfChildren"
                value={field}
                label="No of Children & Age"
                onChange={(e) =>
                  handleInputChangeChildren(index, e.target.value)
                }
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
                <MenuItem value="0">None</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="13">13</MenuItem>
                <MenuItem value="14">14</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="16">16</MenuItem>
              </Select>
              {errors.noOfChildren && (
                <p className="text-error bodyl">{errors.noOfChildren}</p>
              )}
            </FormControl>

            {index === formData.noOfChildren.length - 1 && (
              <div className="flex flex-row">
                <IconButton
                  disableTouchRipple
                  size="small"
                  disabled={!field.trim()}
                  onClick={handleAddField}
                >
                  <AddCircleOutlineIcon className="hover:text-primary" />
                </IconButton>
                <IconButton
                      disableTouchRipple
                      size="small"
                      onClick={() => handleRemoveField(index)}
                      disabled={formData.noOfChildren.length === 1}
                    >
                      <CancelOutlinedIcon className="hover:text-error" />
                    </IconButton>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="col-span-2 flex items-center">
        <TextField
          className="w-full"
          minRows={3}
          label="Additional Information"
          variant="outlined"
          multiline
          name="additionalInformation"
          value={formData.additionalInformation}
          onChange={handleInputChange}
          sx={{
            "& .MuiInputLabel-root": {
              color: "#404942",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#404942",
              },
              "&:hover fieldset": {
                borderColor: "#404942",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#404942",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "#404942",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
              color: "#404942",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Step3Form;
