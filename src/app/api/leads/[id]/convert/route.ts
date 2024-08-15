import { NextRequest, NextResponse } from 'next/server';
import db from '@/src/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find the lead
    const lead = await db.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Convert lead to customer
    const customer = await db.customer.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        address: '', // Assuming you want to add a default or empty address
        createdBy: lead.assignedTo, // Assuming assignedTo is the user ID
      },
    });

    // Delete the lead
    await db.lead.delete({
      where: { id },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('Error converting lead:', error);
    return NextResponse.json({ error: 'Error converting lead' }, { status: 500 });
  }
}
