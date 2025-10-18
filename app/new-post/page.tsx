import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import EditPostForm from "./EditPostForm";

export default async function NewPostPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  console.log("user", user);
  if (authError || !user) redirect("/signup");

  return (
    <>
      <section className="flex flex-col items-stretch gap-4 max-h-screen">
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-light">Post erstellen</h1>
        </div>

        <div className="md:overflow-y-auto">
          <div className="max-w-lg mx-auto md:mx-0">
            <EditPostForm />
          </div>
        </div>
      </section>
    </>
  );
}
