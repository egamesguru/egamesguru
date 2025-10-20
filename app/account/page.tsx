import { createClient } from "@/utils/supabase/server";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { revalidatePath } from "next/cache";
import ProfileGenres from "@/components/ProfileGenres";

async function logout(formData: FormData) {
  "use server";

  console.log("logout");

  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");

  redirect("/");
}

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
    .select(
      `
        id,
        fullname,
        avatar,
        profiles_genres (
            genre (
                title
            )
        )
    `,
    )
    .eq("id", user?.id)
    .single();

  console.log("profile", profile);

  const genres = profile?.profiles_genres?.map(({ genre: { title } }) => title);

  if (profileError || !profile) redirect("/error");

  const publicAvatarUrl =
    profile.avatar != null
      ? supabase.storage.from("avatars").getPublicUrl(profile.avatar).data
          .publicUrl
      : undefined;

  return (
    <div className="space-y-10">
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
          <p className="text-xl font-semibold">{profile.fullname ?? "User"}</p>
          <div className="flex gap-4 text-xl">
            <p>Follower: 0</p>
            <p>Ranking: 1</p>
          </div>
        </div>
      </div>

      <div className="gap-5 flex">
        <Button as={Link} href="/account/edit">
          Bearbeiten
        </Button>

        <form action={logout}>
          <Button
            type="submit"
            className="bg-rose-700"
            endContent={
              <ArrowRightStartOnRectangleIcon className="size-5 shrink-0" />
            }
          >
            Ausloggen
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Interessen</h2>
          <Button as={Link} href="/account/preferences" size="sm">
            Anpassen
          </Button>
        </div>
        {genres != null && <ProfileGenres genres={genres} />}
      </div>
    </div>
  );
}
