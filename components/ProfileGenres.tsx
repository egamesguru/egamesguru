"use client";

import { Chip } from "@heroui/react";

export default function ProfileGenres({ genres }: { genres: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap md:max-w-lg">
      {genres?.map((genre) => (
          <Chip key={genre}>{genre}</Chip>
      ))}
    </div>
  );
}
