import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/account/preferences";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    console.log("/auth/confirm");
    console.log("user data", data);
    console.log("user metadata", data?.user?.user_metadata);
    const fullname = (data?.user?.user_metadata.fullname as string) ?? "";

    if (!error) {
      // create profile for user
      const uid = data.user?.id;
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: uid!, fullname });
      if (!error) {
        redirect(next);
      }
    }
  }

  return redirect("/error");
}
