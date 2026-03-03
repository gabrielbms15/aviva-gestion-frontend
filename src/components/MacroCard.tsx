import React from 'react';
import Link from 'next/link';

export type MacroDotState = {
    rojo: boolean;
    amarillo: boolean;
    verde: boolean;
};

export type MacroStatus = 'none' | 'en-proceso' | 'completado'; // kept for potential legacy use

interface MacroCardProps {
    id: string;
    name: string;
    icon: string;
    number: number;
    href?: string;
    dots?: MacroDotState;
    onDotToggle?: (dot: keyof MacroDotState) => void;
}

function StatusDots({
    dots,
    onDotToggle,
}: {
    dots: MacroDotState;
    onDotToggle: (dot: keyof MacroDotState) => void;
}) {
    return (
        <div
            className="absolute top-2 right-2 flex gap-1 z-20"
            onClick={(e) => e.preventDefault()}
        >
            {/* Roja — No Cumplido */}
            <button
                title="No Cumplido"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDotToggle('rojo'); }}
                className={`w-3 h-3 rounded-full border transition-all duration-200 hover:scale-125 active:scale-95
                    ${dots.rojo
                        ? 'bg-red-500 border-red-600 shadow-[0_0_6px_rgba(239,68,68,0.8)]'
                        : 'bg-red-500/25 border-red-500/40 hover:bg-red-500/50'
                    }`}
            />
            {/* Amarilla — En Proceso */}
            <button
                title="En Proceso"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDotToggle('amarillo'); }}
                className={`w-3 h-3 rounded-full border transition-all duration-200 hover:scale-125 active:scale-95
                    ${dots.amarillo
                        ? 'bg-amber-400 border-amber-500 shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                        : 'bg-amber-400/25 border-amber-400/40 hover:bg-amber-400/50'
                    }`}
            />
            {/* Verde — Completado */}
            <button
                title="Completado"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDotToggle('verde'); }}
                className={`w-3 h-3 rounded-full border transition-all duration-200 hover:scale-125 active:scale-95
                    ${dots.verde
                        ? 'bg-emerald-400 border-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                        : 'bg-emerald-400/25 border-emerald-400/40 hover:bg-emerald-400/50'
                    }`}
            />
        </div>
    );
}

export default function MacroCard({ id, name, icon, number, href, dots, onDotToggle }: MacroCardProps) {
    const inner = (
        <div className="group flex flex-col items-center">
            <div className="relative glass-card w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center mb-4 transition-all duration-300 hover:scale-105 hover:shadow-glow cursor-pointer shadow-glass !backdrop-blur-[40px] border-white/40 border-[1.5px]">
                {dots && onDotToggle && (
                    <StatusDots dots={dots} onDotToggle={onDotToggle} />
                )}
                <div className="flex flex-col items-center justify-center text-center">
                    <span
                        className="material-symbols-outlined text-white transition-transform duration-300 group-hover:scale-110"
                        style={{ fontSize: '56px' }}
                    >
                        {icon}
                    </span>
                    <span className="text-[9px] font-bold text-white/50 tracking-tighter uppercase whitespace-nowrap mt-1">
                        {id} {number}
                    </span>
                </div>
            </div>
            <div className="text-center max-w-[120px] md:max-w-[150px]">
                <h3
                    className="text-xs md:text-sm font-comfortaa font-bold text-black leading-tight group-hover:scale-105 transition-transform duration-300"
                    suppressHydrationWarning
                >
                    {name}
                </h3>
            </div>
        </div>
    );

    if (href) {
        return <Link href={href}>{inner}</Link>;
    }

    return inner;
}
