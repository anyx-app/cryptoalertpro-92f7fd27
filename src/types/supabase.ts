export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          updated_at: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          user_id: string
          symbol: string
          exchange: string
          alert_type: 'price' | 'technical'
          condition: string
          target_price: number | null
          indicator_settings: Json | null
          is_active: boolean
          last_triggered_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          symbol: string
          exchange: string
          alert_type: 'price' | 'technical'
          condition: string
          target_price?: number | null
          indicator_settings?: Json | null
          is_active?: boolean
          last_triggered_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          symbol?: string
          exchange?: string
          alert_type?: 'price' | 'technical'
          condition?: string
          target_price?: number | null
          indicator_settings?: Json | null
          is_active?: boolean
          last_triggered_at?: string | null
          created_at?: string
        }
      }
      notification_history: {
        Row: {
          id: string
          user_id: string
          alert_id: string | null
          message: string
          channel: string
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          alert_id?: string | null
          message: string
          channel: string
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          alert_id?: string | null
          message?: string
          channel?: string
          read_at?: string | null
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          email_notifications: boolean
          push_notifications: boolean
          telegram_id: string | null
          theme: string
          updated_at: string | null
        }
        Insert: {
          user_id: string
          email_notifications?: boolean
          push_notifications?: boolean
          telegram_id?: string | null
          theme?: string
          updated_at?: string | null
        }
        Update: {
          user_id?: string
          email_notifications?: boolean
          push_notifications?: boolean
          telegram_id?: string | null
          theme?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
