import { defineField, defineType } from "sanity";

export const guestdiary = defineType({
    name: "guestdiary",
    title: "Guest Diary",
    type: "document",
    fields:[
        defineField({
            name:"guestImage",
            type:'array',
            title:'Guest Images',
            of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'images',
                      type: 'image',
                      title: 'Images',
                      options: {
                        hotspot: true,
                      },
                    },
                  ],
                },
              ],
        }),
    ]
    });