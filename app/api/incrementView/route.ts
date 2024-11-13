import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { FieldValue } from 'firebase/firestore';
import { doc, getDoc, setDoc, increment, updateDoc } from 'firebase/firestore';


type Data = {
    views?: number;
    error?: string;
  };

  export async function POST (req: NextRequest) {
    const { slug } = await req.json();

    if (!slug || typeof slug !== 'string') {
        return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
      }

      try {
        const postRef = doc(db, 'posts', slug);
        await setDoc(postRef, { views: increment(1) }, { merge: true });
        const docSnap = await getDoc(postRef);
        const views = docSnap.exists() ? docSnap.data().views : 0;
        return NextResponse.json({ views });
      } catch (error) {
        console.error("Error incrementing view count:", error);
        return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
      }
  }