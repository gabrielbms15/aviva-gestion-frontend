import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-deep-blue pt-20 pb-12 relative border-t border-white/10 text-white">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.webp"
                                alt="Logo"
                                width={400}
                                height={120}
                                className="h-36 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-light-bg/60 text-sm leading-relaxed font-light">
                            Logramos, con trato amable, que más peruanos vivan sanos para conquistar sus sueños.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-lg mb-6 text-white tracking-wide">
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm text-light-bg/70 font-light">
                            <li>
                                <Link
                                    className="hover:text-accent-blue transition-colors flex items-center gap-2 group"
                                    href="#"
                                >
                                    <span className="w-1 h-1 bg-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-accent-blue transition-colors flex items-center gap-2 group"
                                    href="#"
                                >
                                    <span className="w-1 h-1 bg-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-accent-blue transition-colors flex items-center gap-2 group"
                                    href="#"
                                >
                                    <span className="w-1 h-1 bg-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-lg mb-6 text-white tracking-wide">
                            Resources
                        </h4>
                        <ul className="space-y-3 text-sm text-light-bg/70 font-light">
                            <li>
                                <Link
                                    className="hover:text-accent-blue transition-colors flex items-center gap-2 group"
                                    href="#"
                                >
                                    <span className="w-1 h-1 bg-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Patient Portal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-accent-blue transition-colors flex items-center gap-2 group"
                                    href="#"
                                >
                                    <span className="w-1 h-1 bg-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="hover:text-accent-blue transition-colors flex items-center gap-2 group"
                                    href="#"
                                >
                                    <span className="w-1 h-1 bg-accent-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-lg mb-6 text-white tracking-wide">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            <Link
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent-blue hover:border-accent-blue group transition-all duration-300"
                                href="#"
                            >
                                <span className="font-display font-bold text-xs text-white">
                                    FB
                                </span>
                            </Link>
                            <Link
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent-blue hover:border-accent-blue group transition-all duration-300"
                                href="#"
                            >
                                <span className="font-display font-bold text-xs text-white">
                                    TW
                                </span>
                            </Link>
                            <Link
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent-blue hover:border-accent-blue group transition-all duration-300"
                                href="#"
                            >
                                <span className="font-display font-bold text-xs text-white">
                                    LN
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-light-bg/40 font-medium uppercase tracking-widest">
                    <div>© 2024. All rights reserved.</div>
                    <div className="flex gap-8">
                        <Link className="hover:text-white transition-colors" href="#">
                            Privacy Policy
                        </Link>
                        <Link className="hover:text-white transition-colors" href="#">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
