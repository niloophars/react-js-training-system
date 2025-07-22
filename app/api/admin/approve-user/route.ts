// app/api/admin/approve-user/route.ts

import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json(); // Expecting a JSON with userId to approve

    // Update the user's status to 'approved' in the database
    const { data, error } = await supabase
      .from('user')
      .update({ status: 'approved' })
      .eq('user_id', userId)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    // Optionally, send an email to notify the user that they have been approved (or do it later)
    // sendApprovalEmail(userId);

    return new Response(JSON.stringify({ message: 'User approved successfully.' }), { status: 200 });
  } catch (error) {
    console.error("Error approving user:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
