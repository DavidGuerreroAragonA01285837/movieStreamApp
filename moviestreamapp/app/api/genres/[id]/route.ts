import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await connectToDatabase();
    
    const genre = await db.collection("genre").findOne({
      _id: new ObjectId(id),
    });

    if (!genre) {
      return NextResponse.json({ error: "Genre not found" }, { status: 404 });
    }

    return NextResponse.json(genre);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch genre" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { db } = await connectToDatabase();

    const result = await db.collection("genre").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: body.name,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Genre not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update genre" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await connectToDatabase();

    const result = await db.collection("genre").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Genre not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete genre" },
      { status: 500 }
    );
  }
}
