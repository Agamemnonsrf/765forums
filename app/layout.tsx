import Link from "next/link";
import React from "react";
import { FaJoint } from "react-icons/fa";
import "/public/App.css";

export const metadata = {
    title: "765Forums",
    description: "An anonymous imageboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`Container`}>
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
