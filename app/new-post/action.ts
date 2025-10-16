"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const hash = (
  arrayBuffer: ArrayBuffer,
  algorithm: AlgorithmIdentifier = "SHA-1",
) => crypto.subtle.digest(algorithm, arrayBuffer);

const hashFile = async (
  file: File,
  algorithm: AlgorithmIdentifier = "SHA-1",
) => {
  const arrayBuffer = await file.arrayBuffer();
  return hash(arrayBuffer, algorithm);
};

export const generateFilename = async (file: File) => {
  const arrayBuffer = await hashFile(file);
  return Array.from(new Uint8Array(arrayBuffer))
    .map((x) => x.toString(36))
    .join("");
};

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/error");

  console.log("new post data:", formData);

  const thumbnail = formData.get("thumbnail") as File;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const filename = await generateFilename(thumbnail);
  console.log("upload thumbnail:", filename, thumbnail);

  const { data: newThumbnail, error: storageError } = await supabase.storage
    .from("images")
    .upload(filename, thumbnail, { upsert: true });

  if (storageError || !newThumbnail) {
    console.error("upload thumbnail failed:", storageError);
    redirect("/error");
  }

  console.log("insert post");
  const { data: newPost, error: postError } = await supabase
    .from("posts")
    .insert({
      creator: user.id,
      title,
      content,
      thumbnail: newThumbnail.path,
    });

  if (postError) {
    console.error("insert post failed:", postError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
