'use client';
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';

import { Button } from '../ui/button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { DialogTitle } from '@mui/material';
import Custom_Form from './custom-itinerary-form';

const CustomItineraryDialog =()=>{
 const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <>
    <Button className="w-fit" onClick={handleClickOpen}>
        Create your Itinerary
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
            className='w-full flex justify-end'
          >
            <CloseIcon/>
          </IconButton>
        </DialogTitle>
       <Custom_Form/>
      </Dialog>
    </>
  )
}

export default CustomItineraryDialog;