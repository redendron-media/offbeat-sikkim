import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment, updateDoc } from 'firebase/firestore';

  export async function POST (req: NextRequest) {
    console.log("Received POST request to increment view count");
    const { slug } = await req.json();
    console.log("Slug received:", slug); 
    if (!slug || typeof slug !== 'string') {
        console.log("Invalid slug:", slug);
        return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
      }

      try {
        const postRef = doc(db, 'posts', slug);
        console.log("Incrementing view count for slug:", slug);
        await setDoc(postRef, { views: increment(1) }, { merge: true });
        const docSnap = await getDoc(postRef);
        const views = docSnap.exists() ? docSnap.data().views : 0;
        console.log("View count after increment:", views);
        return NextResponse.json({ views });
      } catch (error) {
        console.error("Error incrementing view count:", error);
        return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
      }
  }