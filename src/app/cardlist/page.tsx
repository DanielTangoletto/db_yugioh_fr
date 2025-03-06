"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "../../data/cards.json";

export default function CardList() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [archetypes, setArchetypes] = useState<string[]>([]);
  const [showAllCards, setShowAllCards] = useState<boolean>(false);

  useEffect(() => {
    // Extraire les archetypes uniques et les trier par ordre alphabétique
    const uniqueArchetypes = Array.from(new Set(Card.flatMap((card) => [card.archetype, card.secondArchetype, card.thirdArchetype].filter(Boolean)))).sort();
    setArchetypes(uniqueArchetypes);
  }, []);

  // Filtrer les cartes en fonction de l'archetype sélectionné
  const filteredCards = selectedArchetype
    ? Card.filter((card) => card.archetype === selectedArchetype || card.secondArchetype === selectedArchetype || card.thirdArchetype === selectedArchetype)
    : showAllCards
    ? Card
    : [];

  // Fonction pour copier le cardName dans le presse-papiers
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Le nom de la carte "${text}" a été copié dans le presse-papiers.`);
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-600 w-full min-h-svh">
      <Link href="/" className="fixed text-white left-3 top-3 text-2xl hover:opacity-75">
        <i className="fa-solid fa-circle-left"></i>
      </Link>

      <div className="text-white text-center py-4 mx-auto ">
        <h1 className="mb-8 lg:text-4xl text-3xl w-[250px] sm:w-[600px] mx-auto uppercase font-semibold">Liste des catégories disponibles</h1>
        <div className="max-w-3xl mx-auto">
          <button
            className="py-1 w-[150px] text-sm my-2 mx-2 bg-blue-700 hover:bg-blue-600 cursor-pointer"
            onClick={() => {
              setSelectedArchetype(null);
              setShowAllCards((prev) => !prev);
            }}
          >
            {showAllCards ? "Tout masquer" : "Tout afficher"}
          </button>
          {archetypes.map((archetype, index) => (
            <button
              key={index}
              className="mx-2 my-2 w-[150px] text-sm py-1 text-[#412B2D] font-semibold  bg-[#A9BCC3] border-1 border-[#385979] hover:bg-[#C1D7DE] focus:bg-[#e6f9ff] cursor-pointer uppercase"
              onClick={() => {
                setSelectedArchetype(archetype);
                setShowAllCards(false);
              }}
            >
              {archetype}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-7xl px-5 sm:px-20 md:px-40 py-10 mx-auto">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className="cursor-pointer relative"
            onMouseEnter={() => setHoveredCard(card.cardName)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => copyToClipboard(card.cardName)}
          >
            <Image src={card.imageUrl} alt={card.cardName} width={412} height={600} priority quality={1} className="w-28" />
            {hoveredCard === card.cardName && (
              <div className="absolute bottom-0 left-1.5 w-[90%] bg-black/75 text-white text-[10px] text-center py-1">{card.cardName}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
