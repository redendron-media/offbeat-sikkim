'use client';
import React, { useState } from "react";
import { Button } from "../ui/button";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { Dialog, DialogTitle, IconButton, InputAdornment, OutlinedInput, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ShareButton = ({currentPageLink}:{currentPageLink:string}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const handleClickOpen = () => {
    setIsShareOpen(true);
  };

  const handleClose = () => {
    setIsShareOpen(false);
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(currentPageLink).then(() => {
      alert("Copied to clipboard ");
    });
  };

  return (
    <>
      <Button className="w-fit" variant={"outline"} onClick={handleClickOpen}>
        Share <ShareIcon className="text-sm ml-1" />{" "}
      </Button>
      <Dialog open={isShareOpen} maxWidth="md" fullWidth>
        <DialogTitle className="bg-[#F5F5F5]">
          <IconButton
            disableTouchRipple
            disableRipple
            onClick={handleClose}
            className="absolute right-2 top-2"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className="py-6 px-5 flex flex-col gap-5 text-[#051E13] bg-[#F5F5F5] ">
          <p className="bodyl text-[#404942]">Copy Link </p>
          <OutlinedInput
            id="link"
            name="link"
            type="text"
            value={currentPageLink}
            disabled
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disableTouchRipple
                  disableRipple
                  onClick={handleCopyClick}
                >
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <p className="bodyl text-[#404942]">Or share link via </p>
          <Stack direction={"row"} gap={2}>
            <FacebookShareButton url={currentPageLink}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={currentPageLink}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton url={currentPageLink}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </Stack>
        </div>
      </Dialog>
    </>
  );
};

export default ShareButton;
