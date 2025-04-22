import { client } from "@/lib/sanity";
export const fetchPackageData = async (packageType: string, link: string) => {
  const query = `{
    "packageData": *[_type == "${packageType}" && link == "${link}"][0] {
      title,
      desc,
      image,
      durationn,
      durationd,
      currentPrice,
      originalPrice,
      detailedItinerary,
      inclusions,
      exclusions,
      thingsToCarry,
      link,
      thingsToCarryTrek,
      faqs,
      metaDescription,
      bookingProcess,
      mandatoryDocuments,
      knowBeforeYouGo,
      privateTrip,
      photoGalleries,
      tourDates,
      "pdfItinerary": pdfItinerary.asset->url
    },
    "relatedPackages": *[_type == "${packageType}" && link != "${link}"] {
      id,
      title,
      cover,
      link,
      durationn,
      durationd,
      currentPrice,
      originalPrice,
      tripType
    }
  }`

  return await client.fetch(query)
}
