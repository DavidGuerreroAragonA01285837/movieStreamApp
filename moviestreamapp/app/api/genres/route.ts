import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const genres = await db
      .collection("genre")
      .find({})
      .sort({ genre_id: 1 })
      .toArray();
    return NextResponse.json(genres);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    // Get the next genre_id
    const lastGenre = await db
      .collection("genre")
      .findOne({}, { sort: { genre_id: -1 } });
    
    const newGenreId = lastGenre ? (lastGenre.genre_id as number) + 1 : 1;

    const result = await db.collection("genre").insertOne({
      genre_id: newGenreId,
      name: body.name,
    });

    return NextResponse.json(
      { _id: result.insertedId, genre_id: newGenreId, name: body.name },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create genre" },
      { status: 500 }
    );
  }
}
