import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
import { FaJoint } from "react-icons/fa";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "765 Forums",
    description: "An anonymous imageboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} Container`}>
                <header>
                    <div
                        className="Header"
                        id="top"
                        style={{ userSelect: "none" }}
                    >
                        <Link
                            href="/"
                            className={"Header-Btn"}
                            style={{ textDecoration: "none" }}
                        >
                            <span style={{ transform: "scaleX(-1)" }}>
                                <FaJoint size={25} />
                            </span>{" "}
                            765 Forums <FaJoint size={25} />{" "}
                        </Link>
                    </div>
                </header>
                {children}
            </body>
        </html>
    );
}
