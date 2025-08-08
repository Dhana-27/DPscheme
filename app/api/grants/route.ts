import { getSchemes } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || undefined;
    const state = searchParams.get('state') || undefined;
    const category = searchParams.get('category') || undefined;
    const provider = searchParams.get('provider') || undefined;

    const grants = await getSchemes({
      search: query,
      state: state,
      category: category,
      provider_type: provider,
    });

    return NextResponse.json(grants, { status: 200 });
  } catch (error) {
    console.error('API error fetching grants:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
