import { fetchPackageData } from '@/lib/fetchPackageData'
import PackagePageWrapper from './PackageClient'
import { type Metadata } from 'next';

type PageProps = {
  params: {
    link: string
  }
}


function getPackageType(link: string): string {
  if (link.startsWith('upcoming')) return 'upcomingTripDetail'
  if (link.endsWith('trek')) return 'trekTripDetail'
  return 'curatedTripDetail'
}

export async function generateMetadata({ params }: { params: Promise<{ link: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedLink = decodeURIComponent(resolvedParams.link);
  const packageType = getPackageType(decodedLink);
  const { packageData } = await fetchPackageData(packageType, decodedLink);

  const fallbackTitle = 'Offbeat Sikkim';
  const fallbackDescription = 'Northeast India and Bhutan with Offbeat Sikkim - your gateway to hidden gems in Sikkim, Meghalaya, Arunachal, and beyond.';
  const fallbackImage = 'https://yourdomain.com/default-og.jpg';

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
  };
}
export default async function Page({ params }: { params: Promise<{ link: string }> }) {
  const resolvedParams = await params;
  const decodedLink = decodeURIComponent(resolvedParams.link);
  const packageType = getPackageType(decodedLink);

  return <PackagePageWrapper decodedLink={decodedLink} packageType={packageType} />;
}
