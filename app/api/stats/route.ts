import { getDashboardStats } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('API error fetching stats:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
