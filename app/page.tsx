import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import * as Icons from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { PlusIcon } from "@heroicons/react/24/solid";

const NewPostButton = () => {
  return (
    <Button
      as={Link}
      href="/new-post"
      color="primary"
      variant="shadow"
      className="fixed bottom-16 md:bottom-6 right-5 md:right-9 z-20"
      startContent={<PlusIcon className="size-5 shrink-0" />}
    >
      New Post
    </Button>
  );
};

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-stretch gap-4 max-h-screen">
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-light">Newsfeed</h1>
        </div>

        <div className="md:overflow-y-auto mt-5">
          <div className="md:max-w-lg flex flex-col items-stretch gap-4 pb-15">
            <NewsfeedItem
              username="Tailan"
              avatar="https://x.egamesguru.de/storage/v1/object/public/images/3j1l4b3m4h5m3j4g3ou1t3m4h1r206o4e432963"
              title="GTA 6 To Be Released in 2025"
              thumbnail="https://gaming-cdn.com/images/products/2462/616x353/grand-theft-auto-vi-pc-spiel-rockstar-cover.jpg?v=1746543065"
              body="
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
        natus ducimus itaque iure maiores magnam suscipit. Officia quas
        voluptate pariatur corporis illum excepturi quam voluptas
        accusantium accusamus magnam? Beatae, pariatur?
        "
              time="3 Std."
            />
            <NewsfeedItem
              username="eGamesGuru"
              avatar="https://x.egamesguru.de/storage/v1/object/public/images/685u1s1s1n54w10523u62h2c3f4b3r6u3le5i"
              title="Exploring Los Santos in GTA Online!"
              thumbnail="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/01/gta-v-8-small-details-that-enhance-the-open-world.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5"
              body="
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
        natus ducimus itaque iure maiores magnam suscipit. Officia quas
        voluptate pariatur corporis illum excepturi quam voluptas
        accusantium accusamus magnam? Beatae, pariatur?
        "
              time="2 Std."
            />
          </div>
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
}: {
  username: string;
  avatar: string | undefined;
  title: string;
  thumbnail: string;
  body: string;
  time: string;
}) {
  return (
    <Card className="">
      <CardHeader className="">
        <div className="flex gap-3 items-center justify-between w-full">
          <div className="flex gap-3 items-center">
            <Avatar radius="full" size="md" src={avatar} />
            <p>{username}</p>
            <p className="text-default-400">{time}</p>
          </div>
          <Button variant="light" className="ml-auto">
            Folgen
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          <p className="font-semibold">{title}</p>
          <img alt="" className="rounded-lg w-full" src={thumbnail} />
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
