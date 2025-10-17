import { Input } from "@heroui/input";
import { login } from "./action";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (data) redirect("/account");

  return (
    <section className="space-y-10 md:max-w-md">
      <div className="">
        <h1 className="text-3xl font-light">Einloggen</h1>
      </div>

      <div>
        <h2 className="text-lg">
          Logge dich mit deiner Email Adresse und deinem Passwort an.
        </h2>

        <p className="text-xs mt-1">
          Noch kein Account? Jetzt{" "}
          <Link href="/signup" size="sm" className="text-xs">
            Registrieren
          </Link>
          .
        </p>
      </div>

      <div>
        <Form className="md:max-w-xs flex flex-col items-center" action={login}>
          <Divider />

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
            className="mt-5"
          />

          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder="secretpassword"
            required
            variant="underlined"
            labelPlacement="outside-top"
            fullWidth
          />

          <Divider />

          <div className="mt-5">
            <Button type="submit" color="primary">
              Einloggen
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
