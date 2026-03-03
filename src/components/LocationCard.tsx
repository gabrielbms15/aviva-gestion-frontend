import Image from "next/image";
import Link from "next/link";

interface LocationCardProps {
    title: string;
    category: string;
    description: string;
    image: string;
    status: string;
    href?: string;
}

export default function LocationCard({
    title,
    category,
    description,
    image,
    status,
    href,
}: LocationCardProps) {
    const CardContent = (
        <div className="group relative flex flex-col h-full hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
            <div className="image-frame relative z-10 mb-8 mx-4 mt-4">
                <div className="relative overflow-hidden h-96 w-full shadow-xl rounded-sm">
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-transparent opacity-60 z-10"></div>
                    <Image
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={image}
                        width={400}
                        height={300}
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h2 className="text-3xl font-display font-bold text-white leading-tight drop-shadow-lg">
                            {title}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="glass-card p-8 mx-2 -mt-16 pt-16 rounded-b-xl flex-grow flex flex-col shadow-card-hover hover:shadow-glow transition-shadow duration-300">
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 text-light-bg text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>{" "}
                        {category}
                    </span>
                </div>
                <p className="text-white text-base font-normal leading-relaxed mb-8 flex-grow opacity-90">
                    {description}
                </p>
                <div className="flex items-center justify-between border-t border-white/20 pt-6 mt-auto">
                    <span className="text-xs text-white/70 uppercase tracking-widest font-medium">
                        {status}
                    </span>
                    <div
                        className="inline-flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white text-white hover:text-deep-blue rounded-full border border-white/20 transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-lg">
                            arrow_outward
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    if (href) {
        return <Link href={href}>{CardContent}</Link>;
    }

    return CardContent;
}
