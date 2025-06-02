import Footer from "@/components/Footer";
import { Metadata } from "next";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import { Toaster } from "@/components/ui/sonner";

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
          <AdminLayout>{children}</AdminLayout>
          {/* <Toaster richColors toastOptions={{}} theme="light" /> */}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
