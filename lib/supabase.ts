import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          user_type: string | null
          organization: string | null
          subscription_plan: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          user_type?: string | null
          organization?: string | null
          subscription_plan?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          user_type?: string | null
          organization?: string | null
          subscription_plan?: string
          created_at?: string
          updated_at?: string
        }
      }
      schemes: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          provider: string
          provider_type: string
          state: string
          district: string | null
          amount_min: number | null
          amount_max: number | null
          amount_display: string | null
          eligibility: string | null
          application_url: string | null
          deadline: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          provider: string
          provider_type: string
          state: string
          district?: string | null
          amount_min?: number | null
          amount_max?: number | null
          amount_display?: string | null
          eligibility?: string | null
          application_url?: string | null
          deadline?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          provider?: string
          provider_type?: string
          state?: string
          district?: string | null
          amount_min?: number | null
          amount_max?: number | null
          amount_display?: string | null
          eligibility?: string | null
          application_url?: string | null
          deadline?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      loans: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          bank: string
          bank_type: string
          state: string
          interest_rate: string | null
          max_amount: string | null
          processing_time: string | null
          eligibility: string | null
          application_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          bank: string
          bank_type: string
          state: string
          interest_rate?: string | null
          max_amount?: string | null
          processing_time?: string | null
          eligibility?: string | null
          application_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          bank?: string
          bank_type?: string
          state?: string
          interest_rate?: string | null
          max_amount?: string | null
          processing_time?: string | null
          eligibility?: string | null
          application_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
