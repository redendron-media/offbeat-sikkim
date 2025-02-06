import { type ClassValue, clsx } from "clsx"
import { createHash } from "crypto"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashSHA256 = (data:string):string =>{
  return createHash('sha256').update(data).digest('hex');
};