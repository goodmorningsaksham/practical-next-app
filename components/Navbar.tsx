"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const routes = [
        { path: '/', label: 'HOME' },
        { path: '/about', label: 'ABOUT' },
        { path: '/contact', label: 'CONTACT' }
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md border-b border-gray-700/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex-shrink-0 text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
                    >
                        Logo
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-8">
                        {routes.map(({ path, label }) => (
                            <Link
                                key={path}
                                href={path}
                                className="relative group px-3 py-2 text-sm font-semibold transition-colors duration-300"
                            >
                                <span
                                    className={`${
                                        isActive(path)
                                            ? "text-blue-400"
                                            : "text-gray-300 group-hover:text-white"
                                    } transition-colors duration-300`}
                                >
                                    {label}
                                </span>
                                {/* Animated Underline */}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                                        isActive(path)
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                    }`}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="hidden md:inline-flex px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                            Login
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-300"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2 animate-in fade-in duration-200">
                        {routes.map(({ path, label }) => (
                            <Link
                                key={path}
                                href={path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                                    isActive(path)
                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 text-center"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}