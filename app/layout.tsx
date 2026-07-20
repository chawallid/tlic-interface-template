import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TLIC Design System",
    template: "%s · TLIC Design System",
  },
  description:
    "The design system for the Teaching & Learning Innovation Center, Chiang Mai University — tokens, components, and layout patterns.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f16" },
  ],
};

// Runs before paint to apply the saved theme and avoid a flash of the wrong mode.
const themeScript = `(function(){try{var s=localStorage.getItem('tlic-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s? s==='dark' : m){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansThai.variable}`}
    >
      <body className="min-h-dvh bg-bg text-text antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LanguageProvider>
          <ToastProvider>{children}</ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
