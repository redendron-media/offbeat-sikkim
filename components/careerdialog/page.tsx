'use client';
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { Button } from '../ui/button';
import { FormControl,DialogTitle, IconButton, InputAdornment, InputLabel, OutlinedInput, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface Career {
    name:string;
    email: string;
    phone:string;
    resume:File | any;
    linkedn?:string;
}
const Apply = () => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 const [formData, setFormData] = useState<Career>({
     name: "",
     email: "",
     phone: "",
     resume: null,
     linkedn: ''
   });
const [errors, setErrors] = useState<Partial<Career>>({});
    const [loading, setLoading] = useState(false);
    
     const [isSubmitted, setIsSubmitted] = useState(false);
     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
       setErrors({ ...errors, [name]: "" });
     };

     const handleClear = (field: keyof Career) => {
      if (field === "resume") {
        setFormData({ ...formData, resume: null });
      } else {
        setFormData({ ...formData, [field]: "" });
      }
      setErrors({ ...errors, [field]: "" });
    };
    
  const validateForm = () => {
    const newErrors: Partial<Career> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.resume) newErrors.resume = "Resume is required";

    return newErrors;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Create FormData
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    if (formData.linkedn) {
      formDataToSend.append('linkedn', formData.linkedn);
    }
    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }

    const response = await fetch("/api/career-mail", {
      method: "POST",
      // Remove Content-Type header to let the browser set it automatically
      body: formDataToSend,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Failed to submit the form");
    }

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      resume: null,
      linkedn: "",
    });
    setErrors({});
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    setLoading(false);
  }
};
  return (
 <>
      <Button className="w-fit" onClick={handleClickOpen}>
      Apply Now
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <IconButton
            disableTouchRipple
            disableRipple
            onClick={handleClose}
            className='absolute right-2 top-2'
          >
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
        <form
      onSubmit={handleSubmit}
      className="p-5 gap-6 flex flex-col justify-center items-center rounded-lg bg-white md:grid md:grid-cols-2"
    >
  {isSubmitted ? (
        <div className="col-span-2 text-center">
          <h3 className="text-success">
            Your enquiry has been submitted successfully!
          </h3>
        </div>
      ) : (
        <>
           <FormControl variant="outlined" className="col-span-1" fullWidth>
            <InputLabel htmlFor="name">Name*</InputLabel>
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
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "#404942",
                },
              }}
            />
            {errors.name && <p className="text-error bodyl">{errors.name}</p>}
          </FormControl>
        
          <FormControl variant="outlined" className="col-span-1" fullWidth>
            <InputLabel htmlFor="name">Email*</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              label="Email*"
              value={formData.email}
              error={!!errors.email}
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
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "#404942",
                },
              }}
            />
            {errors.name && <p className="text-error bodyl">{errors.name}</p>}
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="phone">Phone*</InputLabel>
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
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "#404942",
                },
              }}
            />
            {errors.phone && <p className="text-error bodyl">{errors.phone}</p>}
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="linkedn">Linkedn Url</InputLabel>
            <OutlinedInput
              id="linkedn"
              name="linkedn"
              label="linkedn Url"
            
              value={formData.linkedn}
              onChange={handleInputChange}
              
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
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "#404942",
                },
              }}
            />
          </FormControl>

          <FormControl variant="outlined" fullWidth>
          <Button variant={'outline'} type='button'
           onClick={() => document.getElementById("file-upload")?.click()}
    >
      Upload Resume(PDF)
      <VisuallyHiddenInput
       id="file-upload"
        type="file"
       
    accept="application/pdf"
    onChange={(event) => {
      const file = event.target.files?.[0] || null; 
      if (file && file.type !== "application/pdf") {
        setErrors({ ...errors, resume: "Only PDF files are allowed" });
      } else {
        setFormData({ ...formData, resume: file });
        setErrors({ ...errors, resume: "" });
      }
    }}
      />
    </Button>
              </FormControl>
              <Button type='submit'>Apply</Button>
        </>)}
      </form>
      </Dialog>
    </>
  )
}

export default Apply;