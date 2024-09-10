import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const WhatsAppButton = () => {
  return (
   <Link href={`https://wa.me/916297364884?text=hello!%20i%20have%20an%20enquiry%20`} target='_blank'>
    <Image src={'/icons/whatsapp.png'} width={42} height={42} className='z-50 fixed bottom-20 md:size-12 lg:size-14 md:bottom-[10%] right-2 md:right-4  object-cover' alt={`<a href='https://pngtree.com/freepng/whatsapp-icon_8704827.html'>png image from pngtree.com/</a>`}  />
   </Link>
  )
}

export default WhatsAppButton