'use client';

import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import CookieManager from '@/api/CookieManager'; 
import UserDataFetcher from '@/api/UserDataFetcher'; 

const UserComponent = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); 

  const handleLogout = () => {
    CookieManager.deleteCookie("authToken"); 
    router.push('/');
    router.refresh();
  };

  const handleChangePassword = () => {
    router.push('/change-password'); 
  };

  const handleNotifications = () => {
    router.push('/notificacoes que nao tem fazer oq ne meus amores'); 
  };

  return (
    <div className="flex items-center">
      <UserDataFetcher onDataFetch={setUser} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer">
            <Avatar className="mr-2">
              <AvatarImage src="avatar.png" alt="User Avatar" />
              <AvatarFallback>{user?.name ? user.name.charAt(0) : "U"}</AvatarFallback>
            </Avatar>
            {user && <span className="text-gray-700">{user.name}</span>}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8} className="w-48">
          <DropdownMenuItem onClick={handleNotifications} className="flex items-center">
            Notificações
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleChangePassword} className="flex items-center">
            Trocar Senha
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="flex items-center">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserComponent;
