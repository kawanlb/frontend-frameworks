"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import CustomLink from "./Link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { email });
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
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Button label="Send Password Reset Link" />
          <CustomLink href="/sign-in" label="Back to Sign In" />
        </div>
      </form>
    </div>
  );
}
