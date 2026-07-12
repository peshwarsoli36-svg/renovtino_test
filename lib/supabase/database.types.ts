import type { BookingStatus } from "@/types";

export type DbAppointment = {
  id: string;
  customer_name: string;
  phone_number: string;
  service: string;
  booking_date: string;
  booking_time: string;
  status: BookingStatus;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: DbAppointment;
        Insert: {
          id?: string;
          customer_name: string;
          phone_number: string;
          service: string;
          booking_date: string;
          booking_time: string;
          status?: BookingStatus;
          created_at?: string;
        };
        Update: {
          customer_name?: string;
          phone_number?: string;
          service?: string;
          booking_date?: string;
          booking_time?: string;
          status?: BookingStatus;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
