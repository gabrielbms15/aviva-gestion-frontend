export default function AcreditacionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* Override background for acreditacion pages — slightly darker, cooler gradient */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[1]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#bfe0f0] via-[#c4dcea] to-[#afd4e8]" />
                <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-white/40 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50rem] h-[50rem] bg-accent-blue/15 rounded-full blur-3xl" />
                <div className="absolute top-[20%] right-[10%] w-64 h-64 border border-accent-blue/15 rounded-full" />
                <div className="absolute bottom-[30%] left-[10%] w-32 h-32 border border-deep-blue/8 rotate-45" />
            </div>
            <div className="relative z-[2]">{children}</div>
        </>
    );
}
