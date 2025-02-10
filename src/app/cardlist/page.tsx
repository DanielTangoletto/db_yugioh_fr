"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "../../data/cards.json";

export default function CardList() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="bg-zinc-900 w-full min-h-svh">
      <Link href="/" className="text-white fixed left-4 top-1.5 hover:opacity-75 hover:underline">
        ← Retour en arrière
      </Link>
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-7xl px-5 sm:px-20 md:px-40 py-10 mx-auto">
        {Card.map((card, index) => (
          <div key={index} className="cursor-pointer relative" onMouseEnter={() => setHoveredCard(card.cardName)} onMouseLeave={() => setHoveredCard(null)}>
            <Image src={card.imageUrl} alt={card.cardName} width={412} height={600} priority quality={1} className="w-24" />
            {hoveredCard === card.cardName && (
              <div className="absolute bottom-0 left-1.5 w-[90%] bg-black/75 text-white text-[10px] text-center py-1">{card.cardName}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
