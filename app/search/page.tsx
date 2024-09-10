import React from "react";
import { blogCard, CardTrip } from "@/lib/types";
import Cards from "@/components/Cards";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Sliderr from "@/components/Slider";

interface SearchResults {
  upcomingTrips: CardTrip[];
  curatedTrips: CardTrip[];
  trekTrips: CardTrip[];
  blogs: blogCard[];
}

const searchQuery = (query: string) => `
      {
    "upcomingTrips": *[_type == "upcomingTripDetail" && (title match "${query}" || desc match "${query}" || destination match "${query}")] {
      title,
      cover,
      durationn,
      durationd,
      currentPrice,
      originalPrice,
      link
    },
    "curatedTrips": *[_type == "curatedTripDetail" && (title match "${query}" || desc match "${query}" || destination match "${query}")] {
      title,
      cover,
      durationn,
      durationd,
      currentPrice,
      originalPrice,
      link
    },
    "trekTrips": *[_type == "trekTripDetail" && (title match "${query}" || desc match "${query}" || destination match "${query}")] {
      title,
      cover,
      durationn,
      durationd,
      currentPrice,
      originalPrice,
      link
    },
    "blogs": *[_type == "blog" && (title match "${query}" || caption match "${query}")] {
      title,
      caption,
      titleImage,
      "currentSlug": slug.current,
      _createdAt
    }
  }
`;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams.query
    ? decodeURIComponent(searchParams.query)
    : "";
  const data = await client.fetch<SearchResults>(searchQuery(query));
  const { upcomingTrips, curatedTrips, trekTrips, blogs } = data;

  function formatDate(dateString: string) {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] py-12 min-h-96 md:min-h-[400px] lg:min-h-96 lg:py-20 max-w-screen-2xl mx-auto">
      <section className="flex flex-col gap-8  ">
        <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
          {upcomingTrips.length > 0 ||
          curatedTrips.length > 0 ||
          trekTrips.length > 0 ||
          blogs.length > 0
            ? `Search results for "${query}"`
            : `No results found for "${query}"`}
        </h2>
      </section>
      <section className="flex flex-col">
        {upcomingTrips.length > 0 && (
          <div className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
            <h3 className="text-secondary-oncontainer headlines md:displays lg:displaym">
              Upcoming Trips
            </h3>
            <div className="flex w-full flex-wrap flex-row gap-8">
              <Sliderr items={upcomingTrips}/>
           
            </div>
          </div>
        )}

        {curatedTrips.length > 0 && (
          <div className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
            <h3 className="text-secondary-oncontainer headlines md:displays lg:displaym">
              Curated Trips
            </h3>
            <div className="flex w-full flex-wrap flex-row gap-8">
              <Sliderr items={curatedTrips}/>
            </div>
          </div>
        )}

        {trekTrips.length > 0 && (
          <div className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
            <h3 className="text-secondary-oncontainer headlines md:displays lg:displaym">Trek Trips</h3>
            <div className="flex w-full flex-wrap flex-row gap-8">
            <Sliderr items={trekTrips}/>
            </div>
          </div>
        )}

        {blogs.length > 0 && (
          <div className="flex flex-col py-12 md:py-[76px] gap-4 md:gap-9">
            <h3 className="text-secondary-oncontainer headlines md:displays lg:displaym">Blogs</h3>
            <div className="flex w-full flex-row flex-wrap gap-8">
              {blogs.map((blog: blogCard, index) => (
                <Link
                  key={index}
                  href={`/blog/${blog.currentSlug}`}
                  className="w-full lg:w-[45%]"
                >
                  <div key={blog.title} className="h-full w-full">
                    <div className="w-full h-[240px] md:h-[600px] relative">
                      <Image
                        src={urlFor(blog.titleImage).url()}
                        fill
                        alt={blog.title}
                        className="rounded-lg object-cover lg:rounded-[10px]"
                      />
                    </div>
                    <div className="px-4 pt-4 space-y-1 text-[#051E13]">
                      <p className="labels text-[#404942]">
                        {formatDate(
                          new Date(blog._createdAt).toISOString().split("T")[0]
                        )}
                      </p>
                      <h2 className="titles line-clamp-2 md:titlel font-bold">
                        {blog.title}
                      </h2>
                      <p className="labell line-clamp-2 overflow-ellipsis select-none">
                        {blog.caption}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
