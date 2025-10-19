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
      <section className="flex flex-col items-stretch gap-8 grow overflow-hidden">
        <div className="flex gap-4 items-center px-4 md:px-0">
          <h1 className="text-3xl font-light">Post erstellen</h1>
        </div>

        <div className="
        px-4 md:px-0 grow overflow-hidden flex flex-col items-stretch
        w-full max-w-lg mx-auto md:mx-0
        ">
          <EditPostForm />
        </div>
      </section>
    </>
  );
}
