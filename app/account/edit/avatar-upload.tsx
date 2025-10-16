"use client";

import { createClient } from "@/utils/supabase/client";
import { Avatar } from "@heroui/avatar";
import { avatar } from "@heroui/theme";
import { useRouter } from "next/navigation";

export function AvatarUpload({
  uid,
  filepath,
  avatarUrl,
  name,
}: {
  uid: string;
  filepath: string;
  avatarUrl: string | undefined;
  name: string | undefined;
}) {
  const supabase = createClient();

  const publicAvatarUrl =
    avatarUrl != null
      ? supabase.storage.from("avatars").getPublicUrl(avatarUrl).data.publicUrl
      : undefined;

  return (
    <div>
      <input
        id="avatar"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={async (e) => {
          console.log("onchange", e.target.files);

          const file = e.target.files?.[0];
          if (!file) return;

          const { data, error } = await supabase.storage
            .from("avatars")
            .upload(filepath, file, { upsert: true });

          console.log("storage response", error, data);

          await supabase
            .from("profiles")
            .update({ avatar: data?.path })
            .eq("id", uid);

          location.reload();
        }}
      />

      <label htmlFor="avatar">
        <Avatar
          src={publicAvatarUrl}
          size="lg"
          radius="lg"
          name={name}
          className="w-24 h-24"
        />
      </label>
    </div>
  );
}
