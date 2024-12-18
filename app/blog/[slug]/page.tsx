import { headers } from "next/headers";
import ShareButton from "@/components/client/share";
import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/lib/sanity";
import { BlogPage } from "@/lib/types";
import { Chip, Stack } from "@mui/material";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import Link from "next/link";
export const revalidate = 60;
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    _createdAt,
      tags[]-> {
      _id,"slug": slug.current ,name
    }
}[0]`;
  const data = await client.fetch(query);
  return data;
}

async function incrementViewCount(slug:string): Promise<number> {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`
  console.log("Base URL:", baseUrl);
  const res = await fetch(`${baseUrl}/api/incrementView`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({slug}),
  });
  console.log("Response Status:", res.status);
  if (!res.ok){
    console.log("Failed to increment view count, Response Text:", await res.text());
    throw new Error('Failed to increment view count');
  }

  const {views} = await res.json();
  console.log("View count received:", views); 
  return views;
}

function formatDate(dateString: string) {
  const dateParts = dateString.split("-");
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}


interface BlogArticleProps {
  params: { slug: string };
}

async function BlogArticle({ params }: PageProps) {
  const resolvedParams = await params;

  if (!resolvedParams || !resolvedParams.slug) {
    throw new Error("Slug parameter is required.");
  }

 const data: BlogPage = await getData(resolvedParams.slug);
  const originalDate = new Date(data._createdAt).toISOString().split("T")[0];
  const formattedDate = formatDate(originalDate);
  let currentPageLink =
  `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${resolvedParams.slug}`;
  const views = await incrementViewCount(resolvedParams.slug);
  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] max-w-screen-2xl mx-auto py-12 md:py-[76px] pt-20 md:pt-32 flex flex-col gap-6 md:gap-9">
      <Stack gap={1} className="md:px-28 lg:px-52 text-start">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
          <h1 className="headlines md:displaym lg:displayl text-[#171D19]">
            {data.title}
          </h1>
         
          <ShareButton currentPageLink={currentPageLink} />
        </div>
        <div className="flex flex-row gap-3 flex-wrap pt-2 pb-3">
          {data.tags?.map((tag) => (
            <Link href={`/tags/${tag.slug}`} key={tag._id}>
              <Chip
                label={tag.name}
                clickable
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  "& .MuiChip-label": {
                    color: "white",
                  },

                  fontSize: "1rem",
                  padding: "6px",
                }}
              />
            </Link>
          ))}
        </div>
        <p className="bodym text-[#404942]">{formattedDate}</p>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <VisibilityIcon className="text-neutral-40 text-xl"/>
        <p className="text-black bodym md:bodyl">{views}</p>
          </Stack>
       
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
