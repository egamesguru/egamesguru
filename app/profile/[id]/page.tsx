import { createClient } from "@/utils/supabase/server";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { redirect } from "next/navigation";
import { FaYoutube, FaTwitch } from "react-icons/fa";
import * as Icons from "@heroicons/react/24/outline";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("profile id", id);

  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single();

  if (error || !profile) {
    console.error("failed to fetch profile:", error);
    redirect("/error");
  }

  const publicAvatarUrl =
    profile.avatar != null
      ? supabase.storage.from("avatars").getPublicUrl(profile.avatar).data
          .publicUrl
      : undefined;

  const { data: postsData, error: postsError } = await supabase
    .from("posts")
    .select()
    .eq("creator", id)
    .order("created_at", { ascending: false })
    .limit(10);

  const posts = postsData ?? [];

  if (postsError) {
    console.error("failed to fetch profile posts:", postsError);
  }

  return (
    <>
      <div className="space-y-10 md:h-screen md:overflow-y-auto">
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-light">Pinnwand</h1>
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

        <div className="flex gap-4">
          <Button
            as={Link}
            href="https://youtube.com/"
            className="bg-[#FF0033]"
            startContent={<FaYoutube className="size-7 shrink-0" />}
            isExternal={true}
          >
            YouTube
          </Button>
          <Button
            as={Link}
            href="https://twitch.tv/"
            className="bg-[#9146FF]"
            startContent={<FaTwitch className="size-7 shrink-0" />}
            isExternal={true}
          >
            YouTube
          </Button>
        </div>

        <div className="h-full">
          <h2 className="text-xl">Letzte Beiträge</h2>

          <div className="md:max-w-lg flex flex-col items-stretch gap-4 pb-15 mt-5">
            {posts.map((post) => {
              const publicThumbnailUrl =
                post.thumbnail != null
                  ? supabase.storage.from("images").getPublicUrl(post.thumbnail)
                      .data.publicUrl
                  : undefined;

              return (
                <NewsfeedItem
                  key={post.id}
                  avatar={publicAvatarUrl}
                  thumbnail={publicThumbnailUrl ?? ""}
                  username={profile.fullname ?? "User"}
                  title={post.title ?? ""}
                  body={post.content ?? ""}
                  time="3 Std."
                  profileUrl={`/profile/${id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function NewsfeedItem({
  username,
  avatar,
  title,
  thumbnail,
  body,
  time,
  profileUrl,
}: {
  username: string;
  avatar: string | undefined;
  title: string;
  thumbnail: string;
  body: string;
  time: string;
  profileUrl: string;
}) {
  return (
    <Card className="">
      <CardHeader className="">
        <div className="flex gap-3 items-center justify-between w-full">
          <Link
            href={profileUrl}
            color="foreground"
            className="flex gap-3 items-center"
          >
            <Avatar radius="full" size="md" src={avatar} />
            <p>{username}</p>
            <p className="text-default-400">{time}</p>
          </Link>
          <Button variant="light" className="ml-auto invisible">
            Folgen
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          <p className="font-semibold">{title}</p>
          <img
            alt=""
            className="rounded-lg w-full aspect-video object-cover"
            src={thumbnail}
          />
          <p className="line-clamp-2">{body}</p>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex gap-4 justify-end w-full">
          <Button isIconOnly variant="light">
            <Icons.HandThumbUpIcon color="gray" className="w-8" />
          </Button>
          <Button isIconOnly variant="light">
            <Icons.HandThumbDownIcon color="gray" className="w-8" />
          </Button>
          <Button isIconOnly variant="light">
            <Icons.ShareIcon color="gray" className="w-8" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
