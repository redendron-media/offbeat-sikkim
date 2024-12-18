
import { blogCard } from "@/lib/types";
import React from "react";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@mui/material";
import { cn } from "@/lib/utils";

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const fetchPostsByTag = async (slug: string) => {
    const query = `*[_type == 'blog' && $slug in tags[]->slug.current] {
        title, caption, titleImage, "currentSlug": slug.current, _createdAt, tags[]-> { _id, name, "slug": slug.current }
    }`;
  const posts = await client.fetch(query, { slug });

  const tagQuery = `*[_type == 'tag' && slug.current == $slug][0] { name }`;
  const tag = await client.fetch(tagQuery, { slug });

  console.log("Tag Query Result:", tag); 
  return { posts, tagName: tag?.name || "" };
};

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

async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const slugValue = Array.isArray(slug) ? slug[0] : slug;
  const { posts, tagName } = await fetchPostsByTag(slugValue);

  console.log("TagName:", tagName);
 

  const groupPosts = chunkPosts(posts, 3);

  if (!posts || posts.length === 0) {
    return (
      <main className="px-4 md:px-6 bg-[#F6FBF4] max-w-screen-2xl mx-auto pt-20 md:pt-32">
        <section className="flex flex-col gap-4">
          <h1 className="text-secondary-oncontainer headlines md:displays lg:displaym">
            No posts found for the tag: {tagName}
          </h1>
        </section>
      </main>
    );
  }

  return (
     <main className="px-4 md:px-6 bg-[#F6FBF4] pt-20 md:pt-32 max-w-screen-2xl mx-auto">
      {posts.length !== 0 && (
        <>
          {/* Intro Section */}
          <section className="flex flex-col gap-4">
            <h1 className="text-secondary-oncontainer headlines md:displays lg:displaym">
              Posts Tagged: {tagName}
            </h1>
          </section>

          {/* Blog Posts for Larger Screens */}
          <section className="hidden md:flex flex-wrap">
            {groupPosts.map((group, idx) => (
              <div key={idx} className="w-full py-8 space-y-4 md:space-y-0 md:flex gap-4">
                {/* Main Post */}
                <div
                  className={cn(
                    `w-full rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow`,
                    `${group.length === 1 ? "pb-4" : "md:w-1/2 pb-4"}`
                  )}
                >
                  <Link href={`/blog/${group[0].currentSlug}`}>
                    <div className="h-full w-full">
                      <div className="w-full h-[600px] relative">
                        <Image
                          src={urlFor(group[0].titleImage).url()}
                          fill
                          alt={group[0].title}
                          className="rounded-lg object-cover lg:rounded-[10px]"
                        />
                      </div>
                      <div className="px-4 pt-4 space-y-1 text-[#051E13]">
                        {/* Tags */}
                        <div className="flex flex-row gap-3 flex-wrap pb-3">
                          {group[0].tags?.map((tag) => (
                            <Link href={`/tags/${tag.slug}`} passHref key={tag._id}>
                              <Chip
                                component="a"
                                label={tag.name}
                                clickable
                                sx={{
                                  backgroundColor: "primary.main",
                                  "&:hover": {
                                    backgroundColor: "primary.dark",
                                  },
                                  "& .MuiChip-label": { color: "white" },
                                  fontSize: "0.75rem",
                                  padding: "6px",
                                }}
                              />
                            </Link>
                          ))}
                        </div>

                        <p className="labels text-[#404942]">
                          {formatDate(new Date(group[0]._createdAt).toISOString().split("T")[0])}
                        </p>
                        <h2 className="titles line-clamp-2 md:titlel font-bold">
                          {group[0].title}
                        </h2>
                        <p className="labell line-clamp-2 overflow-ellipsis select-none">
                          {group[0].caption}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Remaining Posts */}
                <div
                  className={cn(
                    "w-full md:h-auto md:w-1/2 flex gap-4 flex-col",
                    `${group.length > 1 ? "w-full md:w-1/2" : "hidden"}`
                  )}
                >
                  {group.slice(1).map((post, index) => (
                    <Link key={index} href={`/blog/${post.currentSlug}`}>
                      <div className="flex-1 pb-4 rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow">
                        <div className={cn("w-full relative", `${group.length === 2 ? "h-[600px]" : "h-[240px]"}`)}>
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
                              <Link href={`/tags/${tag.slug}`} passHref key={tag._id}>
                                <Chip
                                  label={tag.name}
                                  component="a"
                                  clickable
                                  sx={{
                                    backgroundColor: "primary.main",
                                    "&:hover": {
                                      backgroundColor: "primary.dark",
                                    },
                                    "& .MuiChip-label": { color: "white" },
                                    fontSize: "0.75rem",
                                    padding: "6px",
                                  }}
                                />
                              </Link>
                            ))}
                          </div>
                          <p className="labels text-[#404942]">
                            {formatDate(new Date(post._createdAt).toISOString().split("T")[0])}
                          </p>
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
          </section>

          <section className="flex flex-col gap-6 py-8 md:hidden">
            {posts.map((post:blogCard, index:number) => (
              <Link key={index} href={`/blog/${post.currentSlug}`}>
                <div className="flex-1 pb-4 rounded-lg lg:rounded-[10px] bg-[#F8FCFA] shadow-cardShadow">
                  <div className="w-full h-[240px] relative">
                    <Image
                      src={urlFor(post.titleImage).url()}
                      fill
                      alt={post.title}
                      className="rounded-lg object-cover lg:rounded-[10px]"
                    />
                  </div>
                  <div className="px-4 pt-4 space-y-1 text-[#051E13]">
                    <div className="flex flex-row gap-2 items-center flex-wrap pb-3">
                      {post.tags?.map((tag) => (
                        <Link href={`/tags/${tag.slug}`} passHref key={tag._id}>
                          <Chip
                            component="a"
                            label={tag.name}
                            clickable
                            sx={{
                              backgroundColor: "primary.main",
                              "&:hover": {
                                backgroundColor: "primary.dark",
                              },
                              "& .MuiChip-label": { color: "white" },
                              fontSize: "0.7rem",
                              padding: "6px",
                            }}
                          />
                        </Link>
                      ))}
                    </div>
                    <p className="labels text-[#404942]">
                      {formatDate(new Date(post._createdAt).toISOString().split("T")[0])}
                    </p>
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
          </section>
        </>
      )}
    </main>
  );
}

export default TagPage;
