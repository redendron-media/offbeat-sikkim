import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const WhatsAppButton = () => {
  return (
   <Link href={'https://api.whatsapp.com/send/?phone=917029749687&text&type=phone_number&app_absent=0'} target='_blank'>
    <Image src={'/icons/whatsapp.png'} width={42} height={42} className='z-50 fixed bottom-16 md:size-12 lg:size-14 md:bottom-[10%] right-2 md:right-4  object-cover' alt={`<a href='https://pngtree.com/freepng/whatsapp-icon_8704827.html'>png image from pngtree.com/</a>`}  />
   </Link>
  )
}

export default WhatsAppButton