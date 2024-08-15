import { NextRequest, NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { CustomerCreateSchema } from '@/src/schemas'; // For PUT request validation
import { useCurrentRole } from '@/src/hooks/user-current-user';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
 
  try {
    const { id } = params;
    const customer = await db.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ error: 'Error fetching customer' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const parsedData = CustomerCreateSchema.partial().safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    const updatedCustomer = await db.customer.update({
      where: { id },
      data: parsedData.data,
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json({ error: 'Error updating customer' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await db.customer.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json({ error: 'Error deleting customer' }, { status: 500 });
  }
}
