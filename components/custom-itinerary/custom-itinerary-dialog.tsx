"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";

import { Button } from "../ui/button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { DialogTitle } from "@mui/material";
import Custom_Form from "./custom-itinerary-form";
import Image from "next/image";

const CustomItineraryDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=" relative px-5 rounded-lg py-14 lg:py-12 flex flex-col text-center gap-3 items-center justify-center">
      <div className="absolute  inset-0 w-full z-0 rounded-lg">
        <div className="absolute rounded-lg inset-0 bg-black/20 z-10" />
        <Image
          src={"/4.jpg"}
          alt="Create Your Itinerary"
          fill
          className="object-cover z-0 rounded-lg"
        />
      </div>
      <h2 className="headlines md:displays z-10  text-white">
        Your Personalized Itinerary Awaits
      </h2>
      <div className="flex flex-col gap-6 z-10 items-center justify-center">
        <p className="bodyl z-10 text-white">
          Customize your NorthEast India/Bhutan itinerary in 60 seconds.
        </p>
        <Button className="w-fit" onClick={handleClickOpen}>
          Create your Itinerary
        </Button>
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            <IconButton
              disableTouchRipple
              disableRipple
              onClick={handleClose}
              className="w-full flex justify-end"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Custom_Form />
        </Dialog>
      </div>
    </div>
  );
};

export default CustomItineraryDialog;
