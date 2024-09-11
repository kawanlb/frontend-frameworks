"use client";
import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import CustomLink from "./Link";
import FormContainer from "./FormContainer"; // Importa o FormContainer

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { email });
  };

  return (
    <FormContainer> {/* Usa o FormContainer diretamente */}
      <div className="max-w-md mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Esqueceu sua senha?
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Insira seu endereço de e-mail para receber um link de redefinição de senha.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <Button label="Enviar Link de Redefinição" />
            <CustomLink href="/sign-in" label="Voltar para o Login" />
          </div>
        </form>
      </div>
    </FormContainer>
  );
}
