import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { LeadCreateSchema } from '@/src/schemas';
import { getCurrentUser } from '@/src/lib/auth';

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Error fetching leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsedData = LeadCreateSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    const { name, email, phone, status } = parsedData.data;
    const lead = await db.lead.create({
      data: {
        name,
        email: email || undefined,
        phone: phone || undefined,
        status: {
          connect: {
            id: status, // Assuming `status` is the ID of the LeadStatus
          },
        },
        assignedUser: {
          connect: {
            id: currentUser?.id || undefined, // Use assignedUser relation properly
          },
        },
      },
    });
    
    
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Error creating lead' }, { status: 500 });
  }
}
