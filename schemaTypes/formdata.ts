import { defineField, defineType } from 'sanity';

export const formData = defineType({
  name: 'formData',
  type: 'document',
  title: 'Form Data',
  fields: [
    defineField({
      name: 'transactionId',
      type: 'string',
      title: 'Transaction ID'
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name'
    }),
    defineField({
      name: 'phone',
      type: 'string',
      title: 'Phone'
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email'
    }),
    defineField({
      name: 'tourPackage',
      type: 'string',
      title: 'Tour Package'
    }),
    defineField({
      name: 'noOfAdults',
      type: 'number',
      title: 'Number of Adults'
    }),
    defineField({
      name: 'tourDates',
      type: 'string',
      title: 'Tour Dates'
    }),
    defineField({
      name: 'modeOfPayment',
      type: 'string',
      title: 'Mode of Payment'
    }),
    defineField({
      name: 'amountPaid',
      type: 'string',
      title: 'Amount Paid'
    }),
    defineField({
      name: 'amountRemaining',
      type: 'string',
      title: 'Amount Remaining'
    }),
    defineField({
      name: 'source',
      type: 'string',
      title: 'Source'
    })
  ]
});
