import { defineType } from "sanity";

export const hero = defineType({
    name: "hero",
    title: "Hero",
    type: "document",
    fields: [
        {
            name: "videoDesktop",
            title: "Hero Video Desktop",
            type: "file", // Stores the video file directly
            options: {
                accept: "video/*", // Accepts only video files
            },
        },
        {
            name: "videoMobile",
            title: "Hero Video Mobile",
            type: "file", // Stores the video file directly
            options: {
                accept: "video/*", // Accepts only video files
            },
        },
    ]
});
