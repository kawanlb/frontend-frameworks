import Image from "next/image";
import {
  Home,
  BarChart2,
  Wallet,
  FileText,
  PieChart,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Suponha que esse caminho seja passado como props
function Sidebar({ currentPath }) {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Investimentos",
      icon: BarChart2,
      path: "/dashboard/investimentos",
    },
    {
      id: 3,
      name: "Orçamentos",
      icon: Wallet,
      path: "/dashboard/orcamentos",
    },
    {
      id: 4,
      name: "Transações",
      icon: FileText,
      path: "/dashboard/transacoes",
    },
    {
      id: 5,
      name: "Relatórios",
      icon: PieChart,
      path: "/dashboard/relatorios",
    },
  ];

  return (
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="text-purple-800 font-bold text-xl">Organiza</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${
                currentPath === menu.path && "text-primary bg-blue-100"
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        Minha conta
      </div>
    </div>
  );
}

// lado servidor
export async function getServerSideProps(context) {
  const currentPath = context.resolvedUrl;

  return {
    props: {
      currentPath,
    },
  };
}

export default Sidebar;
