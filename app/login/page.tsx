import { Input } from "@heroui/input";
import { login, signup } from "./actions";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";

export default function LoginPage() {
  return (
    <Form>
      <Input type="email" id="email" name="email" label="Email" required />

      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        required
      />

      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </Form>
  );
}
