import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCard from "@/components/LocationCard";

const locations = [
  {
    title: "Sede Lima Centro",
    category: "Av. Óscar R. Benavides 443",
    description:
      "Sistema de gestión documentaria para la sede Lima Centro de la Clínica Aviva",
    image: "/lima_centro.webp",
    status: "Available 24/7",
  },
  {
    title: "Sede Los Olivos",
    category: "Av. Carlos Izaguirre 813",
    description:
      "Sistema de gestión documentaria para la sede Los Olivos de la Clínica Aviva",
    image: "/los_olivos.webp",
    status: "Outpatient Care",
  },
  {
    title: "Medicentro San Martin",
    category: "Av. Tomas Valle 559",
    description:
      "Sistema de gestión documentaria para la sede San Martin de la Clínica Aviva",
    image: "/medicentro.webp",
    status: "Pediatrics",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow relative z-10 py-20 lg:py-32 flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center mb-20 text-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-accent-blue"></div>
              <span className="text-accent-blue text-sm font-bold tracking-[0.3em] uppercase">
                Bienvenido Avisionario
              </span>
              <div className="h-[1px] w-12 bg-accent-blue"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-deep-blue tracking-tight leading-tight">
              Sistema de gestión<br />
              <span className="text-accent-blue">documentaria</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {locations.map((loc, idx) => (
              <div key={idx} className={idx === 1 ? "lg:mt-8" : ""}>
                <LocationCard {...loc} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 right-0 hidden 2xl:block opacity-5 pointer-events-none">
          <span className="text-vertical text-9xl font-display font-black text-deep-blue tracking-widest">
            AVIVA
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
}
