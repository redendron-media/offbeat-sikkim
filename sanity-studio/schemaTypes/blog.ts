import { defineField } from "sanity";

export const blog = defineField ({
    name:'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        defineField({
            name:'title',
            type:'string',
            title:'Title of blog'
        }),
        defineField({
            name:'slug',
            type: 'slug',
            title:'Slug of your blog article',
            options: {
                source:'title'
            }
        }),
        defineField({
           name:'tags',
           title: "Tags", 
           type: "array",
           of: [{type: 'reference', to:[{ type: "tag"}]}],
        }),
        defineField({
            name: 'titleImage',
            type: 'image',
            title:'Cover Image',
        }),
        defineField({
            name:'caption',
            type:'string',
            title:'Caption',
        }),
        defineField({
            name:'content',
            type:'array',
            title:'Para 1',
            of: [
                {
                    type:'block',
                },
                
            ],
        }),
        defineField({
            name: 'image1',
            type: 'image',
            title:'Image 1',
        }),
        defineField({
            name:'content2',
            type:'array',
            title:'Para 2',
            of: [
                {
                    type:'block',
                },
            ],
        }),
        defineField({
            name: 'image2',
            type: 'image',
            title:'Image 2',
        }),
        defineField({
            name:'content3',
            type:'array',
            title:'Para 3',
            of: [
                {
                    type:'block',
                },
            ],
        }),
        defineField({
            name: 'image3',
            type: 'image',
            title:'Image 3',
        }),
        defineField({
            name:'content4',
            type:'array',
            title:'Para 4',
            of: [
                {
                    type:'block',
                },
            ],
        }),
        defineField({
            name: 'image4',
            type: 'image',
            title:'Image 4',
        }),
        defineField({
            name:'content5',
            type:'array',
            title:'Para 5',
            of: [
                {
                    type:'block',
                },
            ],
        }),
    ]
});