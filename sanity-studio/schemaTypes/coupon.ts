import { defineType } from "sanity";

export const coupon = defineType({
    name : "coupon",
    title: "Coupon",
    type:"document",
    fields: [
        {
            name:"cname",
            title:"Coupon name",
            type:"string"
        },
        {
            name:"value",
            title:"Discount(%)",
            type:"string"
        },
    ]
})