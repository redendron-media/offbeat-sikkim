import {defineField, defineType} from 'sanity'

const tripDetailFields = [
  defineField({
    name: 'id',
    type: 'string',
    title: 'ID',
  }),
  defineField({
    name: 'title',
    type: 'string',
    title: 'Title',
  }),
  defineField({
    name: 'tripType',
    type: 'string',
    title: 'Trip Type',
    options: {
      list: [
        {title: 'Upcoming', value: 'upcoming'},
        {title: 'Curated', value: 'curated'},
        {title: 'Trek', value: 'trek'},
      ],
      layout: 'radio',
    },
  }),
  defineField({
    name: 'image',
    type: 'image',
    title: 'Cover Image for page ',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'cover',
    type: 'image',
    title: 'Cover Image for card',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'desc',
    type: 'string',
    title: 'Description',
  }),
  defineField({
    name: 'durationn',
    type: 'string',
    title: 'Duration (Nights)',
  }),
  defineField({
    name: 'durationd',
    type: 'string',
    title: 'Duration (Days)',
  }),
  defineField({
    name: 'costDouble',
    type: 'string',
    title: 'Double Sharing',
  }),
  defineField({
    name: 'costTriple',
    type: 'string',
    title: 'Triple Sharing',
  }),
  defineField({
    name: 'originalPrice',
    type: 'string',
    title: 'Original Price',
  }),
  defineField({
    name: 'currentPrice',
    type: 'string',
    title: 'Current Price',
  }),
  defineField({
    name: 'photoGalleries',
    title: 'Photo Galleries',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
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
  defineField({
    name: 'tourDates',
    title: 'Tour Dates',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'tourDate',
            type: 'string',
            title: 'Tour Date',
          },
          {
            name: 'spots',
            type: 'string',
            title: 'Spots Remaining',
          },
        ],
      },
    ],
  }),
  defineField({
    name: 'link',
    title: 'Link',
    type: 'string',
  }),
  defineField({
    name: 'detailedItinerary',
    title: 'Detailed Itinerary',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'day',
            type: 'string',
            title: 'Day',
          },
          {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
          {
            name: 'activities',
            type: 'array',
            title: 'Activities',
            of: [{type: 'string'}],
          },
        ],
      },
    ],
  }),
  defineField({
    name: 'inclusions',
    title: 'Inclusions',
    type: 'array',
    of: [{type: 'string'}],
  }),
  defineField({
    name: 'exclusions',
    title: 'Exclusions',
    type: 'array',
    of: [{type: 'string'}],
  }),
  defineField({
    name: 'bookingProcess',
    title: 'Booking Process',
    type: 'array',
    of: [{type: 'string'}],
  }),
  defineField({
    name: 'thingsToCarry',
    title: 'Things to Carry',
    type: 'array',
    of: [{type: 'string'}],
  }),
  defineField({
    name: 'thingsToCarryTrek',
    title: 'Things to Carry Trek',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
          {
            name: 'list',
            type: 'array',
            title: 'List',
            of: [{type: 'string'}],
          },
        ],
      },
    ],
  }),
  defineField({
    name: 'personalMedicalKit',
    title: 'Personal Medical Kit',
    type: 'array',
    of: [{type: 'string'}],
  }),
  defineField({
    name: 'mandatoryDocuments',
    title: 'Mandatory Documents',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Title',
          },
          {
            name: 'desc',
            type: 'array',
            title: 'Description',
            of: [{type: 'string'}],
          },
        ],
      },
    ],
  }),
  defineField({
    name: 'knowBeforeYouGo',
    title: 'Know Before You Go',
    type: 'array',
    of: [{type: 'string'}],
  }),
  defineField({
    name: 'destination',
    title: 'Destination',
    type: 'string',
  }),
  defineField({
    name: 'pdfItinerary',
    title: 'PDF Itinerary (Upcoming Tours)',
    type: 'file',
    options: {
      accept: 'application/pdf',
    },
  }),
]

const destinationFields = [
  defineField({
    name: 'id',
    type: 'string',
    title: 'ID',
  }),
  defineField({
    name: 'title',
    type: 'string',
    title: 'Title',
  }),
  defineField({
    name: 'destination',
    title: 'Destination',
    type: 'string',
  }),
  defineField({
    name: 'desc',
    type: 'string',
    title: 'Description',
  }),
  defineField({
    name: 'image',
    type: 'image',
    title: 'Cover Image for page ',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'cover',
    type: 'image',
    title: 'Cover Image for card',
    options: {
      hotspot: true,
    },
  }),
  defineField({
    name: 'faq',
    title: 'Faq',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          {
            name: 'question',
            type: 'string',
            title: 'Question',
          },
          {
            name: 'answer',
            type: 'string',
            title: 'Answer',
          },
        ],
      },
    ],
  }),
  defineField({
    name: 'bestTime',
    title: 'Best time to visit',
    type: 'object',
    fields: [
      {
        name: 'intro',
        title: 'Introduction',
        type: 'string',
      },
      {
        name: 'steps',
        title: 'Best Time Periods',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'step',
                title: 'Period',
                type: 'string',
              },
              {
                name: 'substeps',
                title: 'Details',
                type: 'array',
                of: [{ type: 'string' }],
              },
            ],
          },
        ],
      },
      {
        name: 'conclusion',
        title: 'Conclusion',
        type: 'string',
      },
    ],
  }),

  defineField({
    name: 'thingsToDo',
    title: 'Things to do',
    type: 'object',
    fields: [
      {
        name: 'intro',
        title: 'Introduction',
        type: 'string',
      },
      {
        name: 'steps',
        title: 'Activities',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'step',
                title: 'Activity',
                type: 'string',
              },
              {
                name: 'substeps',
                title: 'Details',
                type: 'array',
                of: [{ type: 'string' }],
              },
            ],
          },
        ],
      },
      {
        name: 'conclusion',
        title: 'Conclusion',
        type: 'string',
      },
    ],
  }),

  defineField({
    name: 'reach',
    title: 'How to reach',
    type: 'object',
    fields: [
      {
        name: 'intro',
        title: 'Introduction',
        type: 'string',
      },
      {
        name: 'steps',
        title: 'Directions',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'step',
                title: 'Direction',
                type: 'string',
              },
              {
                name: 'substeps',
                title: 'Details',
                type: 'array',
                of: [{ type: 'string' }],
              },
            ],
          },
        ],
      },
      {
        name: 'conclusion',
        title: 'Conclusion',
        type: 'string',
      },
    ],
  }),

  defineField({
    name: 'festivals',
    title: 'Major festivals',
    type: 'object',
    fields: [
      {
        name: 'intro',
        title: 'Introduction',
        type: 'string',
      },
      {
        name: 'steps',
        title: 'Festivals',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'step',
                title: 'Festival',
                type: 'string',
              },
              {
                name: 'substeps',
                title: 'Details',
                type: 'array',
                of: [{ type: 'string' }],
              },
            ],
          },
        ],
      },
      {
        name: 'conclusion',
        title: 'Conclusion',
        type: 'string',
      },
    ],
  }),

  defineField({
    name: 'topten',
    title: 'Top ten places to visit',
    type: 'object',
    fields: [
      {
        name: 'intro',
        title: 'Introduction',
        type: 'string',
      },
      {
        name: 'steps',
        title: 'Places',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'step',
                title: 'Place',
                type: 'string',
              },
              {
                name: 'substeps',
                title: 'Details',
                type: 'array',
                of: [{ type: 'string' }],
              },
            ],
          },
        ],
      },
      {
        name: 'conclusion',
        title: 'Conclusion',
        type: 'string',
      },
    ],
  }),

  defineField({
    name: 'permit',
    title: 'Permit',
    type: 'object',
    fields: [
      {
        name: 'intro',
        title: 'Introduction',
        type: 'string',
      },
      {
        name: 'steps',
        title: 'Permit Types',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'step',
                title: 'Permit Type',
                type: 'string',
              },
              {
                name: 'substeps',
                title: 'Details',
                type: 'array',
                of: [{ type: 'string' }],
              },
            ],
          },
        ],
      },
      {
        name: 'conclusion',
        title: 'Conclusion',
        type: 'string',
      },
    ],
  }),
 
]
export const upcomingTripDetail = defineType({
  name: 'upcomingTripDetail',
  title: 'Upcoming Trip Detail',
  type: 'document',
  fields: tripDetailFields,
})

export const curatedTripDetail = defineType({
  name: 'curatedTripDetail',
  title: 'Curated Trip Detail',
  type: 'document',
  fields: tripDetailFields,
})

export const trekTripDetail = defineType({
  name: 'trekTripDetail',
  title: 'Trek Trip Detail',
  type: 'document',
  fields: tripDetailFields,
})

export const destinations = defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: destinationFields,
})
