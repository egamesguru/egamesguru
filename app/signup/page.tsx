import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { signup } from "./action";
import { Link } from "@heroui/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data) redirect("/account");

  return (
    <section className="space-y-10 md:max-w-md">
      <div className="">
        <h1 className="text-3xl font-light">Registrieren</h1>
      </div>

      <div>
        <h2 className="text-lg">
          Tritt der eGamesGuru Community bei, um nichts mehr zu verpassen.
        </h2>

        <p className="text-xs mt-2">
          Bereits registriert? Jetzt{" "}
          <Link href="/login" size="sm" className="text-xs">
            Einloggen
          </Link>
          .
        </p>
      </div>

      <div>
        <Form
          className="md:max-w-xs flex flex-col items-center"
          action={signup}
        >
          <Divider />

          <Input
            type="text"
            id="fullname"
            name="fullname"
            label="Spitzname"
            placeholder="Naruto Uzumaki"
            required
            variant="underlined"
            labelPlacement="outside-top"
            fullWidth
            className="mt-5"
          />

          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="user@example.com"
            required
            variant="underlined"
            labelPlacement="outside-top"
            fullWidth
          />

          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="secretpassword"
            required
            minLength={8}
            variant="underlined"
            labelPlacement="outside-top"
            fullWidth
          />

          <Divider className="" />

          <div className="mt-5">
            <Button type="submit" color="primary">
              Registrieren
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
