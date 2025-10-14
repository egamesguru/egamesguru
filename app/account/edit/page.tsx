import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { updateAvatar, updateFullname } from "./actions";
import { AvatarUpload } from "./avatar-upload";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import Link from "next/link";

export default async function EditAccount() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("user", user);
  if (authError || !user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .single();

  console.log("profile", profile);

  if (profileError || !profile) redirect("/error");

  return (
    <div className="grow space-y-10">
      <h1 className="text-3xl font-light">Profil bearbeiten</h1>

      <AvatarUpload
        uid={user.id}
        filepath={user.id}
        avatarUrl={profile.avatar ?? undefined}
        name={profile.fullname ?? undefined}
      />

      <Form action={updateFullname} className="space-y-5">
        <Input
          label="Username"
          name="fullname"
          defaultValue={profile.fullname ?? ""}
        />

        <div className="flex gap-4">
          <Button as={Link} href="/account" variant="light">
            Abbrechen
          </Button>
          <Button type="submit" color="primary">
            Speichern
          </Button>
        </div>
      </Form>
    </div>
  );
}
