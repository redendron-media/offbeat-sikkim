import { fetchPackageData } from '@/lib/fetchPackageData'

function getPackageType(link: string): string {
  if (link.startsWith('upcoming')) return 'upcomingTripDetail'
  if (link.endsWith('trek')) return 'trekTripDetail'
  return 'curatedTripDetail'
}

export async function generateMetadata({ params }: { params: { link: string } }) {
  const decodedLink = decodeURIComponent(params.link)
  const packageType = getPackageType(decodedLink)
  const { packageData } = await fetchPackageData(packageType, decodedLink)

  const fallbackTitle = 'Offbeat Sikkim'
  const fallbackDescription = 'Explore Northeast India and Bhutan with Offbeat Sikkim - your gateway to hidden gems in Sikkim, Meghalaya, Arunachal, and beyond. Book North East India and Bhutan tours, treks, and cultural experiences'
  const fallbackImage = 'https://yourdomain.com/default-og.jpg'

  return {
    title: packageData?.title || fallbackTitle,
    description: packageData?.metaDescription || fallbackDescription,
    openGraph: {
      title: packageData?.title || fallbackTitle,
      description: packageData?.metaDescription || fallbackDescription,
      url: `https://offbeatsikkim.com/packages/${decodedLink}`,
      type: 'website',
      images: [
        {
          url:fallbackImage,
          width: 1200,
          height: 630,
          alt: packageData?.title || fallbackTitle,
        },
      ],
    },
  }
}
