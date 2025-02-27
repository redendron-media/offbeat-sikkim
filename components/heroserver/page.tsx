import { client } from "@/lib/sanity";
import HeroHome from "../pages/hero-home/page";

export async function fetchHeroVideos() {
    const query = `*[_type == "hero"][0]{
        "videoDesktopUrl": videoDesktop.asset->url,
        "videoMobileUrl": videoMobile.asset->url
    }`;

    return client.fetch(query);
}
export default async function HeroServer() {
    const videoUrls = await fetchHeroVideos(); // Fetch video URLs on the server
    return <HeroHome videoUrls={videoUrls} />; //  Pass data to Client Component
}