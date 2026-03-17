// Typed query helpers for Supabase operations.
// These wrap the generic client to provide correct types even when
// the Supabase URL/key are placeholders (build-time type resolution).

import type { SupabaseClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = SupabaseClient<any, any, any>;

export function from(client: AnyClient, table: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return client.from(table) as any;
}
