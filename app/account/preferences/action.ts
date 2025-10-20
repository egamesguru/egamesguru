"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePreferences(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/error");

  console.log("preferences formData:", formData);

  const genres = formData.getAll("genres") as string[];

  console.log("preferences genres:", genres);

  // upsert genres
  const { data: upserted, error: upsertError } = await supabase
    .from("genres")
    .upsert(
      genres.map((title) => ({ title })),
      { onConflict: "title" },
    )
    .select();

  console.log("upserted genres", upserted);
  if (upsertError) {
    console.error("upsertError", upsertError);
    redirect("/error");
  }

  const { error: deleteError } = await supabase
    .from("profiles_genres")
    .delete()
    .eq("profile", user.id);
  if (deleteError) {
    console.error("deleteError", deleteError);
    redirect("/error");
  }

  const { error: linkError } = await supabase
    .from("profiles_genres")
    .insert(upserted.map(({ id }) => ({ genre: id, profile: user.id })));

  if (linkError) {
    console.error("linkError", linkError);
    redirect("/error");
  }

  redirect("/account");
}
