import { sql } from '@/lib/neon';
import { v4 as uuidv4 } from 'uuid';

export interface Scheme {
  id: string;
  name: string;
  description: string;
  provider: string;
  provider_type: 'central_govt' | 'state_govt' | 'local_authority';
  amount: string;
  category: string;
  state: string;
  district?: string;
  eligibility: string;
  application_process: string;
  documents_required: string;
  contact_info: string;
  website_url?: string;
  deadline?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Loan {
  id: string;
  name: string;
  bank_name: string;
  bank_type: 'public_sector' | 'private_sector' | 'rrb' | 'cooperative';
  amount: string;
  interest_rate: string;
  category: string;
  description: string;
  eligibility: string;
  documents_required: string;
  processing_time: string;
  contact_info: string;
  website_url?: string;
  created_at: Date;
  updated_at: Date;
}

export async function getSchemes(filters?: {
  state?: string;
  category?: string;
  provider_type?: string;
  search?: string;
}): Promise<Scheme[]> {
  let query = sql`SELECT * FROM schemes WHERE 1=1`;

  if (filters?.state && filters.state !== 'All India') {
    query = sql`${query} AND (state = ${filters.state} OR state = 'All India')`;
  } else if (filters?.state === 'All India') {
    query = sql`${query} AND state = 'All India'`;
  }

  if (filters?.category) {
    query = sql`${query} AND category = ${filters.category}`;
  }
  if (filters?.provider_type) {
    query = sql`${query} AND provider_type = ${filters.provider_type}`;
  }
  if (filters?.search) {
    const searchTerm = `%${filters.search.toLowerCase()}%`;
    query = sql`${query} AND (
      LOWER(name) LIKE ${searchTerm} OR
      LOWER(description) LIKE ${searchTerm} OR
      LOWER(category) LIKE ${searchTerm} OR
      LOWER(state) LIKE ${searchTerm} OR
      LOWER(provider) LIKE ${searchTerm}
    )`;
  }

  query = sql`${query} ORDER BY created_at DESC`;

  try {
    const result = await query;
    return result as Scheme[];
  } catch (error) {
    console.error('Database error fetching schemes:', error);
    return [];
  }
}

export async function getLoans(filters?: {
  state?: string;
  category?: string;
  bank_type?: string;
  bank?: string;
  search?: string;
}): Promise<Loan[]> {
  let query = sql`SELECT * FROM loans WHERE 1=1`;

  if (filters?.state && filters.state !== 'All India') {
    query = sql`${query} AND (state = ${filters.state} OR state = 'All India')`;
  } else if (filters?.state === 'All India') {
    query = sql`${query} AND state = 'All India'`;
  }

  if (filters?.category) {
    query = sql`${query} AND category = ${filters.category}`;
  }
  if (filters?.bank_type) {
    query = sql`${query} AND bank_type = ${filters.bank_type}`;
  }
  if (filters?.bank) {
    query = sql`${query} AND bank_name = ${filters.bank}`;
  }
  if (filters?.search) {
    const searchTerm = `%${filters.search.toLowerCase()}%`;
    query = sql`${query} AND (
      LOWER(name) LIKE ${searchTerm} OR
      LOWER(description) LIKE ${searchTerm} OR
      LOWER(category) LIKE ${searchTerm} OR
      LOWER(bank_name) LIKE ${searchTerm}
    )`;
  }

  query = sql`${query} ORDER BY created_at DESC`;

  try {
    const result = await query;
    return result as Loan[];
  } catch (error) {
    console.error('Database error fetching loans:', error);
    return [];
  }
}

export async function insertScheme(scheme: Omit<Scheme, 'id' | 'created_at' | 'updated_at'>) {
  const id = uuidv4();
  try {
    await sql`
      INSERT INTO schemes (
        id, name, description, provider, provider_type, amount, category, state, district,
        eligibility, application_process, documents_required, contact_info, website_url, deadline
      ) VALUES (
        ${id}, ${scheme.name}, ${scheme.description}, ${scheme.provider}, ${scheme.provider_type},
        ${scheme.amount}, ${scheme.category}, ${scheme.state}, ${scheme.district || null},
        ${scheme.eligibility}, ${scheme.application_process}, ${scheme.documents_required},
        ${scheme.contact_info}, ${scheme.website_url || null}, ${scheme.deadline || null}
      )
    `;
    return { success: true, id };
  } catch (error) {
    console.error('Error inserting scheme:', error);
    return { success: false, error: 'Failed to insert scheme' };
  }
}

export async function insertLoan(loan: Omit<Loan, 'id' | 'created_at' | 'updated_at'>) {
  const id = uuidv4();
  try {
    await sql`
      INSERT INTO loans (
        id, name, bank_name, bank_type, amount, interest_rate, category, description,
        eligibility, documents_required, processing_time, contact_info, website_url
      ) VALUES (
        ${id}, ${loan.name}, ${loan.bank_name}, ${loan.bank_type}, ${loan.amount},
        ${loan.interest_rate}, ${loan.category}, ${loan.description}, ${loan.eligibility},
        ${loan.documents_required}, ${loan.processing_time}, ${loan.contact_info},
        ${loan.website_url || null}
      )
    `;
    return { success: true, id };
  } catch (error) {
    console.error('Error inserting loan:', error);
    return { success: false, error: 'Failed to insert loan' };
  }
}

export async function getDashboardStats() {
  try {
    const totalUsers = await sql`SELECT COUNT(*) FROM users`;
    const totalSchemes = await sql`SELECT COUNT(*) FROM schemes`;
    const totalLoans = await sql`SELECT COUNT(*) FROM loans`;

    return {
      totalUsers: totalUsers[0].count,
      totalSchemes: totalSchemes[0].count,
      totalLoans: totalLoans[0].count,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { totalUsers: 0, totalSchemes: 0, totalLoans: 0 };
  }
}
