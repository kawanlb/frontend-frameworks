"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import CustomLink from "./Link";
import FormContainer from "./FormContainer"; // Importa o FormContainer

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { email, password });
  };

  return (
    <FormContainer> {/* Usa o FormContainer diretamente */}
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Bem-vindo de volta
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Não tem uma conta?{' '}
          <a href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
            Inscreva-se
          </a>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <Button label="Entrar" />
            <CustomLink href="/forgot-password" label="Esqueceu sua senha?" />
          </div>
        </form>
      </div>
    </FormContainer>
  );
}
