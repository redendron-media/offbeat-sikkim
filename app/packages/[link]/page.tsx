import { fetchPackageData } from '@/lib/fetchPackageData'
import PackagePageWrapper from './PackageClient'

function getPackageType(link: string): string {
  if (link.startsWith('upcoming')) return 'upcomingTripDetail'
  if (link.endsWith('trek')) return 'trekTripDetail'
  return 'curatedTripDetail'
}

export async function generateMetadata({ params }: { params: { link: string } }) {
  const decodedLink = decodeURIComponent(params.link)
  const packageType = getPackageType(decodedLink)
  const { packageData } = await fetchPackageData(packageType, decodedLink)
  console.log('🧠 generateMetadata fetched:', { decodedLink, packageType, packageData })

  const fallbackTitle = 'Offbeat Sikkim'
  const fallbackDescription = 'Northeast India and Bhutan with Offbeat Sikkim - your gateway to hidden gems in Sikkim, Meghalaya, Arunachal, and beyond. Book North East India and Bhutan tours, treks, and cultural experiences'
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
          url: fallbackImage,
          width: 1200,
          height: 630,
          alt: packageData?.title || fallbackTitle,
        },
      ],
    },
  }
}

export default function Page({ params }: { params: { link: string } }) {
  const decodedLink = decodeURIComponent(params.link)
  const packageType = getPackageType(decodedLink)

  return <PackagePageWrapper decodedLink={decodedLink} packageType={packageType} />
}