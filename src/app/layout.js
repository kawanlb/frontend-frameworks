import Sidebar from '../components/Sidebar'; 
import { Inter } from "next/font/google";
import '../styles/globals.css';
import '../styles/components/Sidebar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Organiza",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
