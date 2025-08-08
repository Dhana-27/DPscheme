import { getLoans } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || undefined;
    const bankType = searchParams.get('bankType') || undefined;
    const category = searchParams.get('category') || undefined;

    const loans = await getLoans({
      search: query,
      bank_type: bankType,
      category: category,
    });

    return NextResponse.json(loans, { status: 200 });
  } catch (error) {
    console.error('API error fetching loans:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
