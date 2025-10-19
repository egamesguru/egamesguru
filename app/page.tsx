import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import * as Icons from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { createClient } from "@/utils/supabase/server";

const NewPostButton = () => {
  return (
    <Button
      as={Link}
      href="/new-post"
      color="primary"
      variant="shadow"
      className="fixed bottom-16 md:bottom-6 right-5 md:right-9 z-10"
      startContent={<PlusIcon className="size-5 shrink-0" />}
    >
      New Post
    </Button>
  );
};

// const NewsfeedPreviewItems = () => {
//   return (
//     <>
//       <NewsfeedItem
//         username="Tailan"
//         avatar="https://x.egamesguru.de/storage/v1/object/public/images/3j1l4b3m4h5m3j4g3ou1t3m4h1r206o4e432963"
//         title="GTA 6 To Be Released in 2025"
//         thumbnail="https://gaming-cdn.com/images/products/2462/616x353/grand-theft-auto-vi-pc-spiel-rockstar-cover.jpg?v=1746543065"
//         body="
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
//         natus ducimus itaque iure maiores magnam suscipit. Officia quas
//         voluptate pariatur corporis illum excepturi quam voluptas
//         accusantium accusamus magnam? Beatae, pariatur?
//         "
//         time="3 Std."
//       />
//       <NewsfeedItem
//         username="eGamesGuru"
//         avatar="https://x.egamesguru.de/storage/v1/object/public/images/685u1s1s1n54w10523u62h2c3f4b3r6u3le5i"
//         title="Exploring Los Santos in GTA Online!"
//         thumbnail="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/01/gta-v-8-small-details-that-enhance-the-open-world.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5"
//         body="
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
//         natus ducimus itaque iure maiores magnam suscipit. Officia quas
//         voluptate pariatur corporis illum excepturi quam voluptas
//         accusantium accusamus magnam? Beatae, pariatur?
//         "
//         time="2 Std."
//       />
//     </>
//   );
// };

const Newsfeed = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
        id,
        created_at,
        thumbnail,
        title,
        content,
        creator ( id, avatar, fullname )
    `,
    )
    .order("created_at", { ascending: false });

  const posts = data ?? [];

  console.log("newsfeed posts:", posts);

  if (error) {
    console.error("failed to fetch posts:", error);
  }

  return (
    <>
      <div className="md:max-w-lg flex flex-col items-stretch gap-4">
        {posts.map((post) => {
          const publicAvatarUrl =
            post.creator.avatar != null
              ? supabase.storage
                  .from("avatars")
                  .getPublicUrl(post.creator.avatar).data.publicUrl
              : undefined;

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
              username={post.creator.fullname ?? "User"}
              title={post.title ?? ""}
              body={post.content ?? ""}
              time="3 Std."
              profileUrl={`/profile/${post.creator.id}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-stretch gap-4 grow overflow-hidden">
        <div className="px-4 md:px-0">
          <h1 className="text-3xl font-light">Newsfeed</h1>
        </div>

        <div className="overflow-y-auto px-4 py-4 md:px-0">
          <Newsfeed />
        </div>
      </section>

      <NewPostButton />
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
          <Button variant="light" className="ml-auto">
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
