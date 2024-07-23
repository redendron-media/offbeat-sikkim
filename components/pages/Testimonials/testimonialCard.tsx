'use client';
import { TestimonialCard as Testimonial } from "@/lib/types";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Image from "next/image";
import { Dialog, IconButton, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';

type TestimonialProps = {
  card: Testimonial;
};

const TestimonialCard = ({ card }: TestimonialProps) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (!card) {
    return <></>;
  }
  return (
    <Card className="size-[200px] rounded-[10px] text-[#051E13] bg-[#F5F5F5] shadow-cardShadow py-6 px-5 flex flex-col gap-2">
        <h2 className="titlem select-none">{card.title}</h2>
        <Stack direction={"row"} gap={1}>
        {[...Array(5)].map((_,index)=>(
            index < card.rating? <StarIcon key={index} className="text-[#EBC351]"/> : <></>
        ))
        }
        </Stack>
        <p className="bodys line-clamp-5 overflow-ellipsis select-none">{card.testimonial}</p> 
        <p onClick={handleClickOpen} className="bodys cursor-pointer select-none underline text-neutral-24">Read More</p>
        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
       <div className="py-6 px-5 flex flex-col gap-2 text-[#051E13] bg-[#F5F5F5] rounded-[10px] shadow-cardShadow">
       <h2 className="titlem ">{card.title}</h2>
        <Stack direction={"row"} gap={1}>
        {[...Array(5)].map((_,index)=>(
            index < card.rating? <StarIcon key={index} className="text-[#EBC351]"/> : <></>
        ))
        }
        </Stack>
        <p className="bodym">{card.testimonial}</p> 
       </div>
      </Dialog>
    </Card>
  );
};

export default TestimonialCard;
