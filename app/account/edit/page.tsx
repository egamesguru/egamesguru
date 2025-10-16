import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { updateAvatar, updateFullname } from "./actions";
import { AvatarUpload } from "./avatar-upload";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Divider } from "@heroui/divider";
import SubmitButton from "./SubmitButton";

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
    <div className="grow space-y-10 md:max-w-md">
      <h1 className="text-3xl font-light">Profil bearbeiten</h1>

      <div className="flex flex-col gap-10 max-w-xs items-stretch mx-auto md:mx-0">
        <div className="flex justify-center">
          <AvatarUpload
            uid={user.id}
            filepath={user.id}
            avatarUrl={profile.avatar ?? undefined}
            name={profile.fullname ?? undefined}
          />
        </div>

        <Divider />

        <Form
          action={updateFullname}
          className="flex flex-col gap-5 items-center"
        >
          <Input
            label="Spitzname"
            name="fullname"
            defaultValue={profile.fullname ?? ""}
            variant="underlined"
            labelPlacement="outside-top"
            minLength={3}
            maxLength={70}
            required
            fullWidth
          />

          <Input
            readOnly
            label="Email"
            name="email"
            value={user.email}
            variant="underlined"
            labelPlacement="outside-top"
            fullWidth
          />

          <Divider />

          <div className="flex gap-4">
            <Button as={Link} href="/account" variant="flat">
              Abbrechen
            </Button>
            <SubmitButton />
          </div>
        </Form>
      </div>
    </div>
  );
}
