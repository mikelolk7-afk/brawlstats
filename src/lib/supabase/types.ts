export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          player_tag: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          player_tag?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          avatar_url?: string | null;
          player_tag?: string | null;
          updated_at?: string;
        };
      };
      badge_progress: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          completed: boolean;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          completed?: boolean;
          completed_at?: string | null;
        };
      };
      saved_builds: {
        Row: {
          id: string;
          user_id: string;
          brawler_id: number;
          brawler_name: string;
          game_mode: string | null;
          star_power: string;
          gadget: string;
          gear_1: string;
          gear_2: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          brawler_id: number;
          brawler_name: string;
          game_mode?: string | null;
          star_power: string;
          gadget: string;
          gear_1: string;
          gear_2: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          star_power?: string;
          gadget?: string;
          gear_1?: string;
          gear_2?: string;
          notes?: string | null;
          game_mode?: string | null;
        };
      };
      player_bookmarks: {
        Row: {
          id: string;
          user_id: string;
          player_tag: string;
          player_name: string;
          trophies: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          player_tag: string;
          player_name: string;
          trophies?: number | null;
          created_at?: string;
        };
        Update: {
          player_name?: string;
          trophies?: number | null;
        };
      };
      user_preferences: {
        Row: {
          user_id: string;
          favorite_brawler: string | null;
          preferred_mode: string | null;
          show_tips: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          favorite_brawler?: string | null;
          preferred_mode?: string | null;
          show_tips?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          favorite_brawler?: string | null;
          preferred_mode?: string | null;
          show_tips?: boolean;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
