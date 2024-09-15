"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header() {
  // Removido o uso do Clerk, agora você pode substituir por lógica própria de autenticação.
  const user = null; // Defina a lógica para o usuário autenticado
  const isSignedIn = false; // Controle o estado de autenticação aqui

  return (
    <div className="p-3 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center hidden md:flex">
        <Image src={"/logo.jpeg"} alt="logo" width={30} height={20} />
        <span className="text-purple-950 font-bold text-lg ml-2">Organiza</span>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/dashboard"}>
          <Button variant="outline" className="rounded-full text-sm py-1 px-3">
            Dashboard
          </Button>
        </Link>
        {!isSignedIn && (
          <Link href={"/sign-in"}>
            <Button className="rounded-full text-sm py-1 px-3">
              Crie sua conta
            </Button>
          </Link>
        )}
        {isSignedIn && (
          <Button className="rounded-full text-sm py-1 px-3">
            Bem-vindo, {user?.name || "Usuário"} {/* Lógica de exibição do nome */}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
