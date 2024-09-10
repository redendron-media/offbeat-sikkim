'use client';
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import PackageContactForm from "@/components/package-contact/page";
import { Button } from '../ui/button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { DialogTitle } from '@mui/material';
interface ContactDialogProps {
    link:string;
    packageTitle?:string;
    title:string;
   
}


const ContactDialog: React.FC<ContactDialogProps> = ({ link, packageTitle, title }) => {
    const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
    <>
      <Button className="w-fit" onClick={handleClickOpen}>
      {title}
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
        <PackageContactForm 
          link={link}
          packageTitle={packageTitle}
          handleClose={handleClose}
        />
      </Dialog>
    </>
  )
}

export default ContactDialog