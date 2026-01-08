import { SidebarProvider } from "@/components/ui/sidebar";
import "../globals.css";
import { AppSidebar } from "@/components/custom/sidebar/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </SidebarProvider>
  );
}
