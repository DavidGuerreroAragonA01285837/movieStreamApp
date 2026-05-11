import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";

    let query: Record<string, unknown> = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { summary: { $regex: search, $options: "i" } },
          { sku: { $regex: search, $options: "i" } },
        ],
      };
    }

    const movies = await db
      .collection("movie")
      .find(query)
      .sort({ movie_id: 1 })
      .toArray();

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();

    // Get the next movie_id
    const lastMovie = await db
      .collection("movie")
      .findOne({}, { sort: { movie_id: -1 } });

    const newMovieId = lastMovie ? (lastMovie.movie_id as number) + 1 : 1;

    const result = await db.collection("movie").insertOne({
      sku: body.sku,
      title: body.title,
      genre: body.genre || [],
      list_price: body.list_price,
      movie_id: newMovieId,
      views: body.views || 0,
      summary: body.summary,
    });

    return NextResponse.json(
      {
        _id: result.insertedId,
        movie_id: newMovieId,
        ...body,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
