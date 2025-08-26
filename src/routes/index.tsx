import { createFileRoute } from "@tanstack/react-router";
import { Button, Input } from "antd";
import { ChangeEvent, useState } from "react";
import * as z from "zod";

export const Route = createFileRoute("/")({
  component: LoginComponent,
});

function LoginComponent() {
  const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });
  const [login, setLogin] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((prv) => (prv = { ...prv, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    console.log(login);
  };
  return (
    <div className="min-w-full h-screen flex justify-center items-center">
      <div className="flex flex-col w-1/3 gap-4 border border-emerald-400 p-10 rounded-md shadow-lg">
        <h1 className="font-semibold text-3xl">Login</h1>

        <Input
          onChange={handleInput}
          name="email"
          size="large"
          placeholder="email"
          type="email"
        />
        <Input
          onChange={handleInput}
          name="password"
          size="large"
          placeholder="password"
          type="password"
        />

        <Button
          className="bg-emerald-600"
          variant="outlined"
          size="large"
          onClick={handleLogin}
        >
          Login{" "}
        </Button>
      </div>
    </div>
  );
}
