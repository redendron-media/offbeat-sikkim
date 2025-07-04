import { client, urlFor } from "@/lib/sanity";
import { blogCard } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Chip, Stack } from "@mui/material";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BentoGrid } from "@/components/magicui/bento-grid";
import MoveUp from "@/components/move-up-animation/page";
export const revalidate = 300;

async function getData() {
  const query = `*[_type == 'blog' ] | order(_createdAt desc) {
  title,caption,titleImage,
    "currentSlug":slug.current,_createdAt,
     tags[]-> {
      _id,"slug": slug.current ,name
    }
}`;
  const data = await client.fetch(query);
  const dataWithViews = await Promise.all(
    data.map(async (post: blogCard) => {
      const postRef = doc(db, "posts", post.currentSlug);
      const postSnap = await getDoc(postRef);
      const views = postSnap.exists() ? postSnap.data().views : 0;
      return { ...post, views }; // Add views to the post data
    })
  );

  return dataWithViews;
}

const chunkPosts = (posts: blogCard[], size: number): blogCard[][] => {
  const chunks: blogCard[][] = [];
  for (let i = 0; i < posts.length; i += size) {
    chunks.push(posts.slice(i, i + size));
  }
  return chunks;
};

function formatDate(dateString: string) {
  const dateParts = dateString.split("-");
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
}

async function blog() {
  const data: blogCard[] = await getData();
  const groupPosts = chunkPosts(data, 3);

  if (data.length === 0) {
    return (
      <section className="w-full items-center flex flex-1 py-52 lg:py-64 justify-center">
        <h1 className="displayl text-primary">Coming Soon!</h1>
      </section>
    );
  }

  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] pt-20 md:pt-32 max-w-screen-2xl mx-auto">
      {data.length != 0 && (
        <>
          <section className="flex flex-col gap-4">
            <h1 className="text-secondary-oncontainer  headlines md:displays lg:displaym">
              Offbeat Sikkim Blog
            </h1>
            <p className="text-black  bodym md:bodyl">
              Check out Offbeat Sikkim&apos;s Blog for tips, stories and expert
              advice on himalayan adventures
            </p>
          </section>

          {/* <section className="hidden md:flex flex-wrap">
            {groupPosts.map((group, idx) => (
              <div
                key={idx}
                className="w-full py-8 space-y-4 md:space-y-0 md:flex gap-4"
              >
                <div
                  className={cn(
                    `w-full rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow`,
                    `${group.length === 1 ? "pb-4" : "md:w-1/2 pb-4"}`
                  )}
                >
                  <Link href={`/blog/${group[0].currentSlug}`}>
                    {group[0] && (
                      <div className="h-full w-full">
                        <div className="w-full h-[600px]  relative">
                          <Image
                            src={urlFor(group[0].titleImage).url()}
                            fill
                            alt={group[0].title}
                            className="rounded-lg object-cover lg:rounded-[10px]"
                          />
                        </div>
                        <div className="px-4 pt-4 space-y-1 text-[#051E13]">
                          <div className="flex flex-row gap-3 flex-wrap pb-3">
                            {group[0].tags?.map((tag) => (
                              <Link
                                href={`/tags/${tag.slug}`}
                                passHref
                                key={tag._id}
                              >
                                <Chip
                                  component="a"
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

                                    fontSize: "0.75rem",
                                    padding: "6px",
                                  }}
                                />
                              </Link>
                            ))}
                          </div>

                          <Stack direction={"row"} justifyContent={"space-between"}>
                          <p className="labels text-[#404942]">
                            {formatDate(
                              new Date(group[0]._createdAt)
                                .toISOString()
                                .split("T")[0]
                            )}
                          </p>
                          <Stack direction={"row"} gap={0.5} alignItems={"center"}>
                            <VisibilityIcon className="text-sm text-neutral-40"/>
                            <p className="labell text-[#404942]">{group[0].views}</p>
                          </Stack>
                          </Stack>
                        
                          <h2 className="titles line-clamp-2 md:titlel font-bold">
                            {group[0].title}
                          </h2>
                          <p className="labell  overflow-ellipsis select-none">
                            {group[0].caption}
                          </p>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>

                <div
                  className={cn(
                    "w-full md:h-auto md:w-1/2 flex gap-4 flex-col",
                    `${group.length > 1 ? "w-full md:w-1/2" : "hidden"}`
                  )}
                >
                  {group.slice(1).map((post, index) => (
                    <Link key={index} href={`/blog/${post.currentSlug}`}>
                      <div className="flex-1 pb-4 rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow">
                        <div
                          className={cn(
                            "w-full  relative",
                            `${group.length === 2 ? "h-[600px]" : "h-[240px]"}`
                          )}
                        >
                          <Image
                            src={urlFor(post.titleImage).url()}
                            fill
                            alt={post.title}
                            className="rounded-lg object-cover lg:rounded-[10px]"
                          />
                        </div>
                        <div className="px-4 pt-4 space-y-1 text-[#051E13]">
                          <div className="flex flex-row gap-3 items-center flex-wrap pb-3">
                            {post.tags?.map((tag) => (
                            
                                <Chip
                                  label={tag.name}
                                  key={tag._id}
                                  component="a"
                                  clickable
                                  sx={{
                                    backgroundColor: "primary.main",
                                    "&:hover": {
                                      backgroundColor: "primary.dark",
                                    },
                                    "& .MuiChip-label": {
                                      color: "white",
                                    },

                                    fontSize: "0.75rem",
                                    padding: "6px",
                                  }}
                                />
                      
                            ))}
                          </div>
                          <Stack direction={"row"} justifyContent={"space-between"}>
                          <p className="labels text-[#404942]">
                            {formatDate(
                              new Date(post._createdAt)
                                .toISOString()
                                .split("T")[0]
                            )}
                          </p>
                          <Stack direction={"row"} gap={0.5} alignItems={"center"}>
                            <VisibilityIcon className="text-sm text-neutral-40"/>
                            <p className="labell text-[#404942]">{post.views}</p>
                          </Stack>
                          </Stack>
                          <h2 className="titles line-clamp-2 md:titlel font-bold">
                            {post.title}
                          </h2>
                          <p className="labell line-clamp-2 overflow-ellipsis select-none">
                            {post.caption}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section> */}

          {/* Small screens */}

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-8 ">
            {data.map((post, index) => (
              <MoveUp key={index}>
                <Link key={index} href={`/blog/${post.currentSlug}`}>
                  <div className="col-span-1 h-full  pb-4 rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-lg">
                    <div className="w-full h-[300px] relative">
                      <Image
                        src={urlFor(post.titleImage).url()}
                        fill
                        alt={post.title}
                        className="rounded-lg  object-cover lg:rounded-[10px]"
                      />
                    </div>
                    <div className="px-4 pt-4 space-y-1 text-[#051E13]">
                      <div className="flex flex-row gap-2 items-center flex-wrap pb-3">
                        {post.tags?.map((tag) => (
                          <Link
                            href={`/tags/${tag.slug}`}
                            passHref
                            key={tag._id}
                          >
                            <Chip
                              component="a"
                              key={tag._id}
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

                                fontSize: "0.7rem",
                                padding: "6px",
                              }}
                            />
                          </Link>
                        ))}
                      </div>
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <p className="labels text-[#404942]">
                          {formatDate(
                            new Date(post._createdAt)
                              .toISOString()
                              .split("T")[0]
                          )}
                        </p>
                        <Stack
                          direction={"row"}
                          gap={0.5}
                          alignItems={"center"}
                        >
                          <VisibilityIcon className="text-sm text-neutral-40" />
                          <p className="labell text-[#404942]">{post.views}</p>
                        </Stack>
                      </Stack>
                      <h2 className="titles line-clamp-2 md:titlel font-bold">
                        {post.title}
                      </h2>
                      <p className="labell line-clamp-2 overflow-ellipsis select-none">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                </Link>
              </MoveUp>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default blog;
