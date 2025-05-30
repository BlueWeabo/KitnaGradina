import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kitna Gradina App",
    description: "Created By BlueWeabo for mom easiness",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bg">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased text-black bg-white`}
            >
                <div>
                    <Header />
                </div>
                {children}
            </body>
        </html>
    );
}
