import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${inter.variable} font-sans antialiased`}>
                <div className="flex min-h-screen flex-col">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
