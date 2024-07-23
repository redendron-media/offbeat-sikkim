"use client";
import { ContactForm as ContactFormType} from "@/lib/types";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Button } from "../ui/button";

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: "",
    email: "",
    phone: "",
    additional: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormType>>({});
  const [isSubmitted,setIsSubmitted] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleClear = (field: keyof ContactFormType) => {
    setFormData({ ...formData, [field]: "" });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors: Partial<ContactFormType> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    return newErrors;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try{
      console.log(formData);
      const response = await fetch('/api/send-email-contact',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if(response.ok) {
        setIsSubmitted(true);
      }else{
        console.error('Email sending failed.');
      }
    }catch(error) {
      console.error('Error:', error);
    } 
  };


  return (
    <form onSubmit={handleSubmit} className="p-5 gap-6 flex flex-col justify-center items-center shadow-cardShadow bg-white w-[320px] md:w-[368px] rounded-lg">
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
              WebkitBoxShadow: "0 0 0 1000px white inset",
              WebkitTextFillColor: "#404942",
            },
          }}
        />
        {errors.name && <p className="text-error bodyl">{errors.name}</p>}
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
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
              color: "#404942",
            },
            "& .MuiOutlinedInput-input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
              WebkitTextFillColor: "#404942",
            },
          }}
        />
        {errors.email && <p className="text-error bodyl">{errors.email}</p>}
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
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
              color: "#404942",
            },
            "& .MuiOutlinedInput-input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
              WebkitTextFillColor: "#404942",
            },
          }}
        />
        {errors.phone && <p className="text-error bodyl">{errors.phone}</p>}
      </FormControl>

      <TextField
        className="w-full"
        minRows={5}
        label="Additional Information"
        variant="outlined"
        multiline
        name="additional"
        value={formData.additional}
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
              borderColor: "primary.main", // Use the primary color for the focus state
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
      <Button type="submit" className="w-fit">Get in Touch</Button>
      {isSubmitted &&  (
        <div className="w-full">
      <p className="bodym  px-4 text-[#051E13]">Enquiry submitted! We will get back to you shortly</p>

        </div>
      )
      }
     
    </form>
  );
};

export default ContactForm;
