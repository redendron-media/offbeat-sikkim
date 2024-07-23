import {defineField, defineType} from 'sanity';

export const eventType = defineType ({
    name:'tourDetail',
    title:'tourDetail',
    type:'document',
    fields: [
        defineField({
            name:'id',
            type:'string',
            title:'Id'
        }),
        defineField({
            name:'title',
            type:'string',
            title:'Title'
        }),
        defineField({
            name:'image',
            type:'image',
            title:'Cover Image',
            options: {
                hotspot: true,
              },
        }),
        defineField({
            name:'desc',
            type:'string',
             title:'Description'
        }),
        defineField({
            name:'desc',
            type:'string',
             title:'Description'
        }),
        defineField({
            name:'durationn',
            type:'string',
             title:'Duration (Nights)'
        }),
        defineField({
            name:'durationd',
            type:'string',
             title:'Duration (Days)',
        }),
        defineField({
            name:'costDouble',
            type:'string',
             title:'Double Sharing'
        }),
        defineField({
            name:'costTriple',
            type:'string',
             title:'Triple Sharing'
        }),
        defineField({
            name:'originalPrice',
            type:'string',
             title:'Original Price'
        }),
        defineField({
            name:'currentPrice',
            type:'string',
             title:'Current Price'
        }),
        defineField({
            name: 'photoGalleries',
            title: 'Photo Galleries',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'photoGallery' }] }],
          }),
        defineField({
            name: 'tourDates',
            type: 'array',
            title: 'Current Price',
            of: []
        }),
        defineField( {
            name: 'tourDates',
            title: 'Tour Dates',
            type: 'array',
            of: [{ type: 'date' }],
          }),
        defineField({
            name:'link',
            title:'Link',
            type:'url'
        }),
        defineField({
            name: 'detailedItinerary',
            title: 'Detailed Itinerary',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'itineraryDay' }] }], 
        }),
        defineField({
            name: 'inclusions',
          title: 'Inclusions',
          type: 'array',
          of: [{ type: 'string' }], 
        }),
        defineField({
            name: 'exclusions',
          title: 'Exclusions',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField(  {
            name: 'bookingProcess',
            title: 'Booking Process',
            type: 'array',
            of: [{ type: 'string' }],
          }),
        defineField({
            name: 'thingsToCarry',
          title: 'Things to Carry',
          type: 'array',
          of: [{ type: 'string' }], 
        }),
        defineField(
            {
                name: 'thingsToCarryTrek',
                title: 'Things to Carry (Trek)',
                type: 'array',
                of: [{ type: 'reference', to: [{ type: 'thingsToCarry' }] }],
              }
        ),
        defineField(   {
            name: 'personalMedicalKit',
            title: 'Personal Medical Kit',
            type: 'array',
            of: [{ type: 'string' }],
          }),
          defineField({
            name: 'mandatoryDocuments',
            title: 'Mandatory Documents',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'mandatoryDocs' }] }],
          }),
          defineField({
            name: 'knowBeforeYouGo',
            title: 'Know Before You Go',
            type: 'array',
            of: [{ type: 'string' }],  
          }),
          defineField({
            name: 'destination',
            title: 'Destination',
            type: 'string',
          }),
          defineField({
            name: 'pdfItinerary',
            title: 'PDF Itinerary(Upcoming Tours)',
            type: 'file',
            options: {
                accept: 'application/pdf'
            },
          })
    ]
})