import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { User } from "@heroui/user";

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
    <div className="">
      <h1 className="text-3xl font-bold">
        Ranked Content Creators Based on their Performance
      </h1>

      <div className="mt-8 flex gap-8">
        <div className="font-bold">Current Season</div>
        <div className="overflow-ellipsis">5 days remaining</div>
      </div>

      <div className="mt-8 space-y-4">
        <ContenderUser
          username="Tailan"
          score={2300}
          avatar="https://x.egamesguru.de/storage/v1/object/public/images/3j1l4b3m4h5m3j4g3ou1t3m4h1r206o4e432963"
        />
        <ContenderUser username="EmmaK" score={2200} avatar={undefined} />
        <ContenderUser username="GameMaster" score={2100} avatar={undefined} />
        <ContenderUser username="PlayPro" score={2100} avatar={undefined} />
        <ContenderUser username="GamerChick" score={2000} avatar={undefined} />
      </div>
    </div>
  );
}
