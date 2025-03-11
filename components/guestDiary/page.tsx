"use client";

import React, { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity";
import {
  ColumnsPhotoAlbum,
  MasonryPhotoAlbum,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/masonry.css";
import type { Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// Define breakpoints for responsive loading
const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const query = `
 *[_type == "guestdiary"]{
  "guestImage": guestImage[].images.asset->{
    _id,
    url
  }
}
`;

export default function GuestDiary() {
  const [guestImages, setGuestImages] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<boolean>();
  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await client.fetch(query);
        console.log("Fetched Data from Sanity:", data); // Debugging

        if (!data.length) return;

        // Use a Set to track unique image IDs (to remove duplicates)
        const uniqueImages = new Map<string, Photo>();

        await Promise.all(
          data.flatMap((entry: any) =>
            entry.guestImage.map(async (image: any) => {
              if (!image || !image._id) {
                console.warn("Invalid Image Data:", image);
                return null; // Skip invalid images
              }

              const imgUrl = urlFor(image).url();

              // Get natural image dimensions
              const loadImage = (src: string) =>
                new Promise<{ src: string; width: number; height: number }>(
                  (resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () =>
                      resolve({
                        src,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                      });
                  }
                );

              const { src, width, height } = await loadImage(imgUrl);

              // Add image only if it is unique
              if (!uniqueImages.has(image._id)) {
                uniqueImages.set(image._id, {
                  key: image._id, // Unique key
                  src,
                  width,
                  height,
                  alt: "Guest Gallery Image",
                  srcSet: breakpoints.map((breakpoint) => ({
                    src: urlFor(image).width(breakpoint).url(),
                    width: breakpoint,
                    height: Math.round((height / width) * breakpoint),
                  })),
                } as Photo);
              }
            })
          )
        );

        setGuestImages(Array.from(uniqueImages.values())); // Convert Map back to array
      } catch (error) {
        console.error("Error fetching guest diary images:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) return <p>Loading gallery...</p>;

  return (
    <section  className="py-12 md:py-[76px] space-y-6 md:space-y-12 scroll-mt-24">
      <h2 className="headlines md:displays lg:displaym text-secondary-oncontainer">
        Guest Gallery
      </h2>
      <div className="relative w-full overflow-hidden h-[70dvh] lg:h-[90dvh]">
        <MasonryPhotoAlbum photos={guestImages} />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[#F6FBF4] z-10 pointer-events-none" />
        <p
          onClick={() => setOpen(true)}
          className="text-primary bg-white/10 text-center titlel md:headlines z-30 absolute bottom-0 left-0 right-0 g-white p-2  shadow-md "
        >
          View all
        </p>
      </div>

      <Lightbox
        slides={guestImages}
        open={open}
        close={() => setOpen(false)}
        plugins={[Fullscreen, Thumbnails, Zoom]}
      />
    </section>
  );
}
