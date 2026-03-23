import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services, DocumentType } from "@/data/los-olivos";
import DocumentViewer from "@/components/DocumentViewer";

interface Props {
  params: Promise<{ service: string }>;
}

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const data = services[service];

  if (!data) notFound();

  return (
    <>
      <Header />
      <main className="flex-grow relative z-10 py-20 lg:py-28 bg-light-bg min-h-screen">
        <DocumentViewer service={service} data={data} />
      </main>
      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ service: slug }));
}
