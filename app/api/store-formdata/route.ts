import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
interface FormDataStore {
  [key: string]: any;
}
const dataFilePath = path.join(process.cwd(), "formDataStore.json");

const readDataFromFile = (): FormDataStore => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const writeDataToFile = (data: FormDataStore) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req: NextRequest) {
    try {
        const { transactionId, formData } = await req.json();
        const formDataStore = readDataFromFile();
        formDataStore[transactionId] = formData;
        writeDataToFile(formDataStore);
        console.log(`Storing formData for transactionId: ${transactionId}`);
        console.log("Current store:", JSON.stringify(formDataStore));
        return NextResponse.json({ message: "Form data stored successfully" });
      } catch (error) {
        console.error("Error storing form data:", error);
        return NextResponse.json({ error: "Failed to store form data" }, { status: 500 });
      }
    }

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const transactionId = searchParams.get("transactionId");
        if (!transactionId) {
          return NextResponse.json({ error: "transactionId is required" }, { status: 400 });
        }
        const formDataStore = readDataFromFile();
        const formData = formDataStore[transactionId];
        console.log(`Retrieving formData for transactionId: ${transactionId}`);
        console.log("Retrieved formData:", formData);
        if (!formData) {
          return NextResponse.json({ error: "FormData not found" }, { status: 404 });
        }
        return NextResponse.json(formData);
      } catch (error) {
        console.error("Error retrieving form data:", error);
        return NextResponse.json({ error: "Failed to retrieve form data" }, { status: 500 });
      }
}

export async function DELETE(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const transactionId = searchParams.get("transactionId");
      if (!transactionId) {
        return NextResponse.json({ error: "transactionId is required" }, { status: 400 });
      }
      const formDataStore = readDataFromFile();
      delete formDataStore[transactionId];
      writeDataToFile(formDataStore);
      console.log(`Deleting formData for transactionId: ${transactionId}`);
      console.log("Current store:", JSON.stringify(formDataStore));
      return NextResponse.json({ message: "Form data deleted successfully" });
    } catch (error) {
      console.error("Error deleting form data:", error);
      return NextResponse.json({ error: "Failed to delete form data" }, { status: 500 });
    }
  }