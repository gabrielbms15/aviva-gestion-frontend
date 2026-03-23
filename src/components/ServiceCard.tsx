import React from "react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  icon: LucideIcon;
  image?: string;
  onClick?: () => void;
  colorTheme?: "upss" | "ups";
}

export default function ServiceCard({ title, icon: Icon, image, onClick, colorTheme = "upss" }: ServiceCardProps) {
  const gradientTheme =
    colorTheme === "upss"
      ? "from-brand-teal/80 via-brand-blue/60 to-deep-blue/80"
      : "from-blue-400/80 via-indigo-500/60 to-purple-600/80";

  const glowTheme =
    colorTheme === "upss" ? "hover:shadow-[0_0_30px_rgba(69,150,171,0.6)]" : "hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]";

  return (
    <div
      onClick={onClick}
      className={`group flex flex-col items-center justify-start cursor-pointer transition-all duration-300 transform hover:-translate-y-2`}
    >
      <div
        className={`relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 mb-4 rounded-full bg-gradient-to-br ${gradientTheme} shadow-lg ${glowTheme} border border-white/20 overflow-hidden backdrop-blur-md transition-shadow duration-300`}
      >
        {image ? (
          <>
            <div className="absolute inset-0 bg-deep-blue/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-110 z-0"
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-white transform transition-transform duration-500 group-hover:scale-110">
              <Icon size={40} className="md:w-12 md:h-12" strokeWidth={1.5} />
            </div>
          </>
        )}
        
        {/* Subtle inner ring that animates on hover */}
        <div className="absolute inset-1 rounded-full border border-white/30 opacity-50 scale-95 group-hover:scale-100 group-hover:opacity-80 transition-all duration-500 blur-[1px] z-20 pointer-events-none"></div>
      </div>
      <h3 className="text-center text-sm md:text-base font-semibold text-deep-blue leading-tight w-full max-w-[140px] px-2 group-hover:text-brand-blue transition-colors">
        {title}
      </h3>
    </div>
  );
}
