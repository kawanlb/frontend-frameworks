"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import CustomLink from "./Link";

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
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
        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirmPassword"
        />
        <div className="flex items-center justify-between">
          <Button label="Sign Up" />        </div>
      </form>
    </div>
  );
}
