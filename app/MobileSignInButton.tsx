"use client";

import { createClient } from "@/utils/supabase/client";
import { type Session } from "@supabase/auth-js";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";

const supabase = createClient();

const SignInButton = () => {
  const pathname = usePathname();

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<{
    username: string;
    avatar: string | undefined;
  } | null>(null);

  const getSession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    setSession(session);

    if (session != null) {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session.user.id)
        .single();

      if (data == null) return;

      setProfile({
        username: data?.fullname ?? "User",
        avatar: data?.avatar ?? undefined,
      });
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  console.log("pathname", pathname);

  if (pathname === "/signup" || pathname === "/login") return <></>;

  if (profile != null) {
    const publicAvatarUrl =
      profile.avatar != null
        ? supabase.storage.from("avatars").getPublicUrl(profile.avatar).data
            .publicUrl
        : undefined;

    return (
      <Card as={Link} href="/account" isPressable isBlurred fullWidth>
        <CardBody>
          <div className="flex items-center gap-2">
            <p>{profile.username}</p>
            <Avatar src={publicAvatarUrl} name={profile.username} />
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Button
      as={Link}
      href="/signup"
      size="lg"
      color="primary"
      endContent={<ArrowRightEndOnRectangleIcon className="size-5" />}
    >
      Anmelden
    </Button>
  );
};

export default SignInButton;
