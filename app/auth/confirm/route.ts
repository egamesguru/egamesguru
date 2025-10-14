import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = "/account";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    console.log("user data", data);

    if (!error) {
      // create profile for user
      const uid = data.user?.id;
      const { error } = await supabase.from("profiles").upsert({ id: uid! });
      if (!error) {
        redirectTo.searchParams.delete("next");
        return NextResponse.redirect(redirectTo);
      }
    }
  }

  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
