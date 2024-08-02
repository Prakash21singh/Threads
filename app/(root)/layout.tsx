import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import Leftsidebar from "@/components/shared/Leftsidebar";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Bottombar from "@/components/shared/Bottombar";

export const metadata = {
  title: " Threads",
  description: "Next.js 13 meta threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Topbar />
          <main className="flex">
            <Leftsidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <Rightsidebar />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
