import Footer from "@/components/Footer";
import Nav from "@/components/header/Nav";
import { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";

export const metadata: Metadata = {
  title: "TrustGroupCU",
  description: "TrustGroupCU Bank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* <header>
            <Nav />
          </header>
          <main>{children}</main> */}
          <AdminLayout>{children}</AdminLayout>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
