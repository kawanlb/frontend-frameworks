"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import CustomLink from "./Link";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { email, password });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Button label="Sign In" />
          <CustomLink href="/forgot-password" label="Forgot your password?" />
        </div>
      </form>
    </div>
  );
}
