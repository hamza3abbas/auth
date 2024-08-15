import { NextResponse } from 'next/server';
import db from '@/src/lib/db';  // Adjust the import to match your project's structure

export async function GET() {
  try {
    const statuses = await db.leadStatus.findMany();
    return NextResponse.json(statuses);
  } catch (error) {
    console.error('Error fetching lead statuses:', error);
    return NextResponse.json({ error: 'Error fetching lead statuses' }, { status: 500 });
  }
}
