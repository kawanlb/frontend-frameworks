'use client';

import React, { useState } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import CookieManager from "@/api/CookieManager";
import UserDataFetcher from "@/api/UserDataFetcher";
import NotificationList from "@/app/(routes)/dashboard/_components/NotificationsList"; // Importando o modal de notificações

const UserComponent = ({ isVisible = true }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false); // Controle para o modal de notificações

  const handleLogout = () => {
    CookieManager.deleteCookie("authToken");
    router.push("/");
    router.refresh();
  };

  const handleChangePassword = () => {
    router.push("/change-password");
  };

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="relative">
      <div className={`flex items-center ${isVisible ? "gap-2" : ""}`}>
        <UserDataFetcher onDataFetch={setUser} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <Avatar>
                <AvatarImage src="avatar.png" alt="User Avatar" />
                <AvatarFallback>{user?.name ? user.name.charAt(0) : "U"}</AvatarFallback>
              </Avatar>
              {isVisible && user && (
                <span className="text-gray-700 p-4">{user.name}</span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="w-48">
            <DropdownMenuItem onClick={handleNotifications}>
              Notificações
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleChangePassword}>
              Trocar Senha
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showNotifications && (
        <NotificationList
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)} // Passando a função para fechar o modal
        />
      )}
    </div>
  );
};

export default UserComponent;
