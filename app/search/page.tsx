"use client";
import React, { Suspense } from "react";
import { packagesData } from "@/constants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TripDetail } from "@/lib/types";
import Cards from "@/components/Cards";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<TripDetail[]>([]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      const searchQuery = decodeURIComponent(query).toLowerCase();
      const filteredResults = packagesData.filter(
        (item: TripDetail) =>
          item.title.toLowerCase().includes(searchQuery) ||
          (item.desc && item.desc.toLowerCase().includes(searchQuery))
      );
      setResults(filteredResults);
    }
  }, [searchParams]);

  return (
    <main className="px-4 md:px-6 bg-[#F6FBF4] py-12 min-h-96 md:min-h-[400px] lg:min-h-96 lg:py-20 max-w-screen-2xl mx-auto">
      <section className="flex flex-col gap-8  ">
      <h2 className="text-secondary-oncontainer headlines md:displays lg:displaym">
      {results.length > 0 ? `Search results for "${searchParams.get("query")}"` : `No results found for "${searchParams.get("query")}"`}
    </h2>
        <div className="flex w-full flex-wrap flex-row gap-8 ">
          {results.length > 0 ? (
            results.map((card: TripDetail) => (
              <Cards card={card} key={card.id} />
            ))
          ) : (
            <></>
          )}
        </div>
      </section>
    </main>
  );
};

const SuspenseWrappedSearchPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchPage />
  </Suspense>
);


export default SuspenseWrappedSearchPage;
