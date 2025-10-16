"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateFullname(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/error");

  const fullname = formData.get("fullname") as string;
  console.log("fullname", fullname);

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ fullname })
    .eq("id", user.id);

  if (profileError) redirect("/error");

  revalidatePath("/", "layout");
  redirect("/account");
}
