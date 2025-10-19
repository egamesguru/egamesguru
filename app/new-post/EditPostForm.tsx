"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { createPost } from "./action";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { Link } from "@heroui/react";

export default function EditPostForm() {
  return (
    <Form
      action={createPost}
      className="grow flex flex-col items-stretch overflow-hidden"
    >
      <Divider />

      <div className="flex flex-col items-stretch gap-5 overflow-y-auto">
        <ThumbnailInput />

        <Input
          label="Titel"
          name="title"
          id="title"
          required
          minLength={5}
          maxLength={100}
        />

        <Textarea
          label="Inhalt"
          name="content"
          id="content"
          minLength={10}
          required
        />
      </div>

      <Divider />

      <div className="flex justify-end gap-4 py-2">
        <Button as={Link} href="/" variant="flat">
          Abbrechen
        </Button>
        <Button type="submit" color="primary">
          Posten
        </Button>
      </div>
    </Form>
  );
}

const ThumbnailInput = () => {
  const [previewImgFile, setPreviewImgFile] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState<string | undefined>();

  const handleImageChange = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    console.log("handleImageChange file", file);

    if (!file) {
      setPreviewImgFile(null);
      return;
    }

    setPreviewImgFile(file);
  };

  return (
    <>
      <div className="w-full">
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <label
          htmlFor="thumbnail"
          className="block cursor-pointer w-full bg-gray-900 aspect-video rounded-xl"
        >
          {previewImgFile != null ? (
            <img
              src={URL.createObjectURL(previewImgFile)}
              className="w-full h-full block object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <PhotoIcon className="size-20" />
            </div>
          )}
        </label>
      </div>
    </>
  );
};
