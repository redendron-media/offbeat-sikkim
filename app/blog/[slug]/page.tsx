import { headers } from 'next/headers';
import ShareButton from "@/components/client/share";
import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/lib/sanity";
import { BlogPage } from "@/lib/types";
import { Stack } from "@mui/material";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
export const revalidate = 60;

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current =='${slug}']{
  "currentSlug":slug.current,
    title,
    titleImage,
    caption,
    content,
    image1,
    content2,
    content3,
  content4,
    content5,
    image2,
    image3,
    image4,
    _createdAt
}[0]`;
  const data = await client.fetch(query);
  return data;
}

function formatDate(dateString:string) {
    const dateParts = dateString.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }
  
async function BlogArticle({ params }: { params: { slug: string } }) {
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const currentPageLink = headersList.get('referer') || "";
  const data: BlogPage = await getData(params.slug);
  const originalDate = new Date(data._createdAt).toISOString().split('T')[0]
  const formattedDate = formatDate(originalDate)

  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] max-w-screen-2xl mx-auto py-12 md:py-[76px] flex flex-col gap-6 md:gap-9">
      <Stack gap={1} className="md:px-28 lg:px-52 text-start">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
        <h1 className="headlines md:displaym lg:displayl text-[#171D19]">
          {data.title}
        </h1>
        <ShareButton currentPageLink={currentPageLink}/>
        </div>
        
        <p className="bodym text-[#404942]">
            {formattedDate}
            </p>
      </Stack>
      <Image
        src={urlFor(data.titleImage).url()}
        priority
        width={800}
        height={400}
        className="object-cover self-center rounded-lg"
        alt="Title Image"
      />
      <p className="bodym md:px-28 lg:px-52 text-[#404942]">{data.caption}</p>
      <div className=" md:px-28 lg:px-52 text-black bodym md:bodyl">
        <PortableText value={data.content} />
      </div>
      {data.image1 && (
        <Image
          src={urlFor(data.image1).url()}
          priority
          width={800}
          height={400}
          className="object-cover self-center rounded-lg"
          alt="Image"
        />
      )}
      {data.content2 && (
        <div className=" md:px-28 lg:px-52 text-black bodym md:bodyl">
          <PortableText value={data.content2} />
        </div>
      )}

      {data.image2 && (
        <Image
          src={urlFor(data.image2).url()}
          priority
          width={800}
          height={400}
          className="object-cover self-center rounded-lg"
          alt="Image"
        />
      )}
      {data.content3 && (
        <div className=" md:px-28 lg:px-52 text-black bodym md:bodyl">
          <PortableText value={data.content3} />
        </div>
      )}

      {data.image3 && (
        <Image
          src={urlFor(data.image3).url()}
          priority
          width={800}
          height={400}
          className="object-cover self-center rounded-lg"
          alt="Image"
        />
      )}
      {data.content4 && (
        <div className=" md:px-28 lg:px-52 text-black bodym md:bodyl">
          <PortableText value={data.content4} />
        </div>
      )}

      {data.image4 && (
        <Image
          src={urlFor(data.image4).url()}
          priority
          width={800}
          height={400}
          className="object-cover self-center rounded-lg"
          alt="Image"
        />
      )}
      {data.content5 && (
        <div className=" md:px-28 lg:px-52 text-black bodym md:bodyl">
          <PortableText value={data.content5} />
        </div>
      )}

    </main>
  );
}

export default BlogArticle;
