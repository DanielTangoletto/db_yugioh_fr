"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "../../data/cards.json";
import Navbar from "@/components/Navbar/Navbar";

export default function CardList() {
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [archetypes, setArchetypes] = useState<string[]>([]);
  const [showAllCards, setShowAllCards] = useState<boolean>(false);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState<boolean>(false);

  useEffect(() => {
    // Extraire les archetypes uniques et les trier par ordre alphabétique
    const uniqueArchetypes = Array.from(
      new Set(
        Card.flatMap((card) =>
          [card.archetype, card.secondArchetype, card.thirdArchetype].filter(Boolean)
        )
      )
    ).sort();
    setArchetypes(uniqueArchetypes);
  }, []);

  // Filtrer les cartes en fonction de l'archetype sélectionné
  const filteredCards = selectedArchetype
    ? Card.filter(
        (card) =>
          card.archetype === selectedArchetype ||
          card.secondArchetype === selectedArchetype ||
          card.thirdArchetype === selectedArchetype
      )
    : showAllCards
    ? Card
    : [];

  // Fonction pour copier le cardName dans le presse-papiers
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCard(text);
      setShowCopiedMessage(true);
      // Masquer le message après 2,5 secondes
      setTimeout(() => {
        setShowCopiedMessage(false);
        setCopiedCard(null);
      }, 2500);
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-600 w-full min-h-svh">
      <header>
        <Navbar />
      </header>
      <Link href="/" className="fixed text-white left-3 top-3 text-2xl hover:opacity-75">
        <i className="fa-solid fa-circle-left"></i>
      </Link>

      {/* Message de confirmation */}
      {showCopiedMessage && copiedCard && (
        <div className="fixed shadow-2xl shadow-white/25 bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white px-4 py-2 rounded-xl z-50">
          Vous avez copié <span className="font-bold text-lg text-green-300">{copiedCard}</span>
        </div>
      )}

      <div className="text-white text-center py-4 mx-auto ">
        <h1 className="mb-8 lg:text-4xl text-3xl w-[250px] sm:w-[600px] mx-auto uppercase font-semibold">
          Liste des catégories disponibles
        </h1>
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
            onClick={() => copyToClipboard(card.cardName)}
          >
            <Image
              src={card.imageUrl}
              alt={card.cardName}
              width={412}
              height={600}
              loading="lazy"
              quality={1}
              className="w-28"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
