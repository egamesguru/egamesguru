import { createClient } from "@/utils/supabase/server";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { avatar } from "@heroui/theme";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Account() {
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

  const publicAvatarUrl =
    profile.avatar != null
      ? supabase.storage.from("avatars").getPublicUrl(profile.avatar).data
          .publicUrl
      : undefined;

  return (
    <div className="grow space-y-10">
      <div className="flex gap-4 items-center">
        <h1 className="text-3xl font-light">Mein Profil</h1>
      </div>

      <div className="flex gap-4 items-center">
        <Avatar
          src={publicAvatarUrl}
          size="lg"
          radius="lg"
          name={profile.fullname || undefined}
          className="w-20 h-20"
        />

        <div>
          <p className="text-xl font-semibold">
            {profile.fullname ?? "User"}
          </p>
          <div className="flex gap-4 text-xl">
            <p>Follower: 0</p>
            <p>Ranking: 1</p>
          </div>
        </div>
      </div>

      <Button as={Link} href="/account/edit">
        Bearbeiten
      </Button>
    </div>
  );
}
