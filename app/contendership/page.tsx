"use client";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Tab, Tabs } from "@heroui/tabs";
import { divider } from "@heroui/theme";
import { User } from "@heroui/user";
import { FaYoutube, FaTwitch } from "react-icons/fa";

const contenders: ContenderUser[] = [
  {
    username: "Tailan",
    score: 2300,
    avatar:
      "https://x.egamesguru.de/storage/v1/object/public/images/3j1l4b3m4h5m3j4g3ou1t3m4h1r206o4e432963",
  },
  { username: "EmmaK", score: 2200, avatar: undefined },
  { username: "GameMaster", score: 2100, avatar: undefined },
  { username: "PlayPro", score: 2100, avatar: undefined },
  { username: "GamerChick", score: 2000, avatar: undefined },

  {
    username: "Tailan",
    score: 2300,
    avatar:
      "https://x.egamesguru.de/storage/v1/object/public/images/3j1l4b3m4h5m3j4g3ou1t3m4h1r206o4e432963",
  },
  { username: "EmmaK", score: 2200, avatar: undefined },
  { username: "GameMaster", score: 2100, avatar: undefined },
  { username: "PlayPro", score: 2100, avatar: undefined },
  { username: "GamerChick", score: 2000, avatar: undefined },
];

const ContenderUser = ({
  username,
  score,
  avatar,
}: {
  username: string;
  score: number;
  avatar: string | undefined;
}) => {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar src={avatar} size="lg" name={username} />
            <div className="">
              <p>{username}</p>
              <p className="text-sm font-light text-foreground-600">
                Score: {score}
              </p>
            </div>
          </div>

          <Button variant="light" className="ml-auto">
            Folgen
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default function ContendershipPage() {
  return (
    <section className="space-y-10 max-h-screen flex flex-col">
      <div>
        <h1 className="text-3xl font-light">Contendership</h1>
        <h2 className="text-lg">Top Creator der aktuellen Season.</h2>
      </div>

      <div className="flex gap-8">
        <div className="font-bold">Aktuelle Season</div>
        <div className="overflow-ellipsis">Noch 16 Tage</div>
      </div>

      <div className="grow md:overflow-y-auto">
        <RankingsMobile
          youtubeRanking={contenders}
          twitchRanking={contenders}
        />
        <RankingsDesktop
          youtubeRanking={contenders}
          twitchRanking={contenders}
        />
      </div>
    </section>
  );
}

const RankingsMobile = ({
  youtubeRanking,
  twitchRanking,
}: {
  youtubeRanking: ContenderUser[];
  twitchRanking: ContenderUser[];
}) => {
  return (
    <div className="lg:hidden md:px-2">
      <Tabs
        aria-label="Options"
        className="w-full"
        classNames={{
          tabList: "mx-auto relative",
        }}
      >
        <Tab
          key="youtube"
          title={
            <div className="flex items-center gap-2">
              <FaYoutube className="size-6 grow" width={24} height={24} />
              <span>YouTube</span>
            </div>
          }
        >
          <RankingList users={youtubeRanking} />
        </Tab>
        <Tab
          key="twitch"
          title={
            <div className="flex items-center gap-2">
              <FaTwitch className="size-6 grow" width={24} height={24} />
              <span>Twitch</span>
            </div>
          }
        >
          <RankingList users={twitchRanking} />
        </Tab>
      </Tabs>
    </div>
  );
};

const RankingsDesktop = ({
  youtubeRanking,
  twitchRanking,
}: {
  youtubeRanking: ContenderUser[];
  twitchRanking: ContenderUser[];
}) => {
  return (
    <div className="hidden lg:grid grid-cols-2 gap-4 px-4 pb-10">
      <div className="grow space-y-5">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <FaYoutube />
          <span>YouTube</span>
        </h2>
        <RankingList users={youtubeRanking} />
      </div>
      <div className="grow space-y-5">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <FaTwitch />
          <span>Twitch</span>
        </h2>
        <RankingList users={twitchRanking} />
      </div>
    </div>
  );
};

type ContenderUser = {
  username: string;
  score: number;
  avatar: string | undefined;
};

type RankingListProps = {
  users: ContenderUser[];
};

const RankingList = ({ users }: RankingListProps) => {
  return (
    <div className="space-y-4 w-full">
      {users.map(({ username, score, avatar }, i) => (
        <ContenderUser
          key={i}
          username={username}
          score={score}
          avatar={avatar}
        />
      ))}
    </div>
  );
};
