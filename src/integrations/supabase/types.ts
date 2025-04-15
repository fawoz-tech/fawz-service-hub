export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_bookings: {
        Row: {
          activity_date: string
          activity_id: number
          booking_date: string
          created_at: string
          family_member_id: string | null
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_date: string
          activity_id: number
          booking_date?: string
          created_at?: string
          family_member_id?: string | null
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_date?: string
          activity_id?: number
          booking_date?: string
          created_at?: string
          family_member_id?: string | null
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_bookings_family_member_id_fkey"
            columns: ["family_member_id"]
            isOneToOne: false
            referencedRelation: "family_members"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          customer_id: string
          customer_name: string
          id: string
          notes: string | null
          price: number
          provider_id: string
          request_id: string
          service_id: string
          service_name: string
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          customer_id: string
          customer_name: string
          id?: string
          notes?: string | null
          price?: number
          provider_id: string
          request_id: string
          service_id: string
          service_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          customer_id?: string
          customer_name?: string
          id?: string
          notes?: string | null
          price?: number
          provider_id?: string
          request_id?: string
          service_id?: string
          service_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      family_members: {
        Row: {
          age: number | null
          created_at: string
          health_notes: string | null
          height: number | null
          id: string
          name: string
          relationship: string | null
          sex: string | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          created_at?: string
          health_notes?: string | null
          height?: number | null
          id?: string
          name: string
          relationship?: string | null
          sex?: string | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          created_at?: string
          health_notes?: string | null
          height?: number | null
          id?: string
          name?: string
          relationship?: string | null
          sex?: string | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          full_name: string | null
          health_notes: string | null
          height: number | null
          id: string
          marital_status: string | null
          previous_activities: Json | null
          sex: string | null
          updated_at: string
          username: string | null
          weight: number | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          health_notes?: string | null
          height?: number | null
          id: string
          marital_status?: string | null
          previous_activities?: Json | null
          sex?: string | null
          updated_at?: string
          username?: string | null
          weight?: number | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          health_notes?: string | null
          height?: number | null
          id?: string
          marital_status?: string | null
          previous_activities?: Json | null
          sex?: string | null
          updated_at?: string
          username?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      provider_certifications: {
        Row: {
          created_at: string | null
          date_received: string
          expiry_date: string | null
          file_url: string | null
          id: string
          issuing_authority: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date_received: string
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          issuing_authority: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date_received?: string
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          issuing_authority?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      provider_locations: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          created_at: string | null
          id: string
          is_primary: boolean | null
          name: string
          state: string
          user_id: string
          zip_code: string
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name: string
          state: string
          user_id: string
          zip_code: string
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          name?: string
          state?: string
          user_id?: string
          zip_code?: string
        }
        Relationships: []
      }
      provider_profiles: {
        Row: {
          business_name: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          setup_completed: boolean | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          business_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          setup_completed?: boolean | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          business_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          setup_completed?: boolean | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      provider_services: {
        Row: {
          created_at: string | null
          id: string
          is_available: boolean
          note: string | null
          price_per_hour: number
          service_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_available?: boolean
          note?: string | null
          price_per_hour?: number
          service_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_available?: boolean
          note?: string | null
          price_per_hour?: number
          service_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          photo_url: string | null
          role: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          photo_url?: string | null
          role: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          photo_url?: string | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          address: string
          city: string
          created_at: string
          customer_email: string
          customer_id: string
          customer_name: string
          customer_phone: string
          id: string
          notes: string | null
          price: number
          provider_id: string | null
          request_date: string
          requested_date: string
          service_id: string
          service_name: string
          state: string
          status: string
          updated_at: string
          zip_code: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          customer_email: string
          customer_id: string
          customer_name: string
          customer_phone: string
          id?: string
          notes?: string | null
          price?: number
          provider_id?: string | null
          request_date?: string
          requested_date: string
          service_id: string
          service_name: string
          state: string
          status?: string
          updated_at?: string
          zip_code: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          customer_email?: string
          customer_id?: string
          customer_name?: string
          customer_phone?: string
          id?: string
          notes?: string | null
          price?: number
          provider_id?: string | null
          request_date?: string
          requested_date?: string
          service_id?: string
          service_name?: string
          state?: string
          status?: string
          updated_at?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          name: string
          type: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          name: string
          type: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
