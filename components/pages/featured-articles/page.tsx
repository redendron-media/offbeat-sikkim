import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FeaturedArticles = () => {
  return (
    <section className="relative px-4 md:px-6 py-16 md:py-24 rounded-lg flex flex-col gap-4 md:gap-6">
         <div className="absolute  inset-0 w-full z-0">
            <Image
              src={'/images/featured-articles.webp'}
              alt="Hero Background"
              fill
              className="rounded-lg object-cover"
              loading='lazy'
            />
          </div>
        <h2 className='headlines md:displaym text-white z-10'>Featured Articles</h2>
        <p className='bodyl z-10 text-[#F3FCF2]'>Check out Offbeat Sikkim’s Blog for tips, stories and expert advice on himalayan adventures</p>
        <Link className='z-10' href={'/blog'}>
       <Button className='w-fit'>Explore Articles</Button>
        </Link>
    </section>
  )
}

export default FeaturedArticles