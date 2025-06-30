"use client";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import cards1 from "../../data/cards_1.json";
import cards2 from "../../data/cards_2.json";
import cards3 from "../../data/cards_3.json";
import cards4 from "../../data/cards_4.json";
import cards5 from "../../data/cards_5.json";
import cards6 from "../../data/cards_6.json";
import cards7 from "../../data/cards_7.json";
import cards8 from "../../data/cards_8.json";
import Navbar from "@/components/Navbar";

const Card = [
  ...cards1,
  ...cards2,
  ...cards3,
  ...cards4,
  ...cards5,
  ...cards6,
  ...cards7,
  ...cards8,
];

// Configuration des archetypes avec leurs images
const ARCHETYPE_CONFIG = {
  Albaz: "/sprites/Albaz.webp",
  Argostars: "/sprites/Argostars.webp",
  Atlantean: "/sprites/Atlantean.webp",
  Azamina: "/sprites/Azamina.webp",
  "Blue-Eyes": "/sprites/Blue_Eyes.webp",
  Branded: "/sprites/Branded.webp",
  "Buster Blader": "/sprites/Buster_Blader.webp",
  Bystial: "/sprites/Bystial.webp",
  "Centur-Ion": "/sprites/Centur_Ion.webp",
  Crystron: "/sprites/Crystron.webp",
  "Dark Magician": "/sprites/Dark_Magician.webp",
  Despia: "/sprites/Despia.webp",
  Dinomorphia: "/sprites/Dinomorphia.webp",
  Dogmatika: "/sprites/Dogmatika.webp",
  Exodia: "/sprites/Exodia.webp",
  Fiendsmith: "/sprites/Fiendsmith.webp",
  "Fire King": "/sprites/Fire_King.webp",
  Floodgate: "/sprites/Floodgate.webp",
  Generaider: "/sprites/Generaider.webp",
  "Goblin Biker": "/sprites/Goblin_Biker.webp",
  Handtrap: "/sprites/Handtrap.webp",
  Kashtira: "/sprites/Kashtira.webp",
  Kuriboh: "/sprites/Kuriboh.webp",
  Labrynth: "/sprites/Labrynth.webp",
  Malefic: "/sprites/Malefic.webp",
  Maliss: "/sprites/Maliss.webp",
  Mathmech: "/sprites/Mathmech.webp",
  Mementotlain: "/sprites/Mementotlain.webp",
  Mermail: "/sprites/Mermail.webp",
  Millennium: "/sprites/Millennium.webp",
  Mimighoul: "/sprites/Mimighoul.webp",
  Predaplant: "/sprites/Predaplant.webp",
  Primite: "/sprites/Primite.webp",
  "Red-Eyes": "/sprites/Red_Eyes.webp",
  Runick: "/sprites/Runick.webp",
  Ryzeal: "/sprites/Ryzeal.webp",
  Sarcophagus: "/sprites/Sarcophagus.webp",
  Shaddoll: "/sprites/Shaddoll.webp",
  "Sinful Spoils": "/sprites/Sinful_Spoils.webp",
  "Sky Striker": "/sprites/Sky_Striker.webp",
  "Snake-Eye": "/sprites/Snake_Eye.webp",
  Spright: "/sprites/Spright.webp",
  Springans: "/sprites/Springans.webp",
  Staple: "/sprites/Staple.webp",
  Swordsoul: "/sprites/Swordsoul.webp",
  Tearlaments: "/sprites/Tearlaments.webp",
  "Tenpai Dragon": "/sprites/Tenpai_Dragon.webp",
  Tenyi: "/sprites/Tenyi.webp",
  Toon: "/sprites/Toon.webp",
  "Tri-Brigade": "/sprites/Tri_Brigade.webp",
  "Voiceless Voice": "/sprites/Voiceless_Voice.webp",
  "White Forest": "/sprites/White_Forest.webp",
  Yubel: "/sprites/Yubel.webp",
} as const;

export default function CardList() {
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [copiedCard, setCopiedCard] = useState<string | null>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState<boolean>(false);

  // Optimisation : calcul des archetypes avec useMemo
  const archetypes = useMemo(() => {
    const archetypeSet = new Set<string>();

    Card.forEach((card) => {
      if (card.archetype) archetypeSet.add(card.archetype);
      if (card.secondArchetype) archetypeSet.add(card.secondArchetype);
      if (card.thirdArchetype) archetypeSet.add(card.thirdArchetype);
    });

    return Array.from(archetypeSet).sort();
  }, []);

  // Optimisation : filtrage des cartes avec useMemo
  const filteredCards = useMemo(() => {
    if (!selectedArchetype) return [];

    return Card.filter(
      (card) =>
        card.archetype === selectedArchetype ||
        card.secondArchetype === selectedArchetype ||
        card.thirdArchetype === selectedArchetype
    );
  }, [selectedArchetype]);

  // Optimisation : fonction de copie avec useCallback
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCard(text);
      setShowCopiedMessage(true);
      // Masquer le message après 2,5 secondes
      setTimeout(() => {
        setShowCopiedMessage(false);
        setCopiedCard(null);
      }, 2500);
    });
  }, []);

  // Optimisation : fonction d'ouverture d'image avec useCallback
  const openImageInNewTab = useCallback((imageUrl: string, event: React.MouseEvent) => {
    // Vérifier si c'est le bouton du milieu (clic molette)
    if (event.button === 1) {
      event.preventDefault();
      event.stopPropagation();

      // Créer un lien temporaire et le cliquer programmatiquement
      const link = document.createElement("a");
      link.href = imageUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  // Fonction pour obtenir les classes CSS d'un archetype
  const getArchetypeClasses = (archetype: string) => {
    const hasImage = archetype in ARCHETYPE_CONFIG;
    return hasImage
      ? "w-18 h-18 bg-cover bg-center rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
      : "w-[150px] text-sm py-1 text-[#412B2D] bg-[#A9BCC3] border-1 border-[#385979] hover:bg-[#C1D7DE] focus:bg-[#e6f9ff]";
  };

  // Fonction pour obtenir le style d'un archetype
  const getArchetypeStyle = (archetype: string) => {
    const imageUrl = ARCHETYPE_CONFIG[archetype as keyof typeof ARCHETYPE_CONFIG];
    return imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {};
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-600 w-full min-h-svh">
      <header>
        <Navbar />
      </header>
      <Link
        href="/"
        className="fixed text-white left-3 top-3 text-2xl hover:opacity-75"
        aria-label="Retour à l'accueil"
      >
        <i className="fa-solid fa-circle-left" aria-hidden="true"></i>
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
          {archetypes.map((archetype, index) => (
            <button
              key={index}
              className={`mx-2 my-2 font-semibold border-0 cursor-pointer uppercase ${getArchetypeClasses(
                archetype
              )}`}
              style={getArchetypeStyle(archetype)}
              onClick={() => setSelectedArchetype(archetype)}
              aria-label={`Sélectionner l'archetype ${archetype}`}
            >
              {!(archetype in ARCHETYPE_CONFIG) && archetype}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-7xl px-5 sm:px-20 md:px-40 py-10 mx-auto">
        {filteredCards.map((card, index) => (
          <button
            key={index}
            className="cursor-pointer relative bg-transparent border-0 p-0"
            onClick={() => copyToClipboard(card.cardName)}
            onMouseDown={(e) => openImageInNewTab(card.imageUrl, e)}
            aria-label={`Copier le nom de la carte ${card.cardName} dans le presse-papiers. Clic molette pour ouvrir l'image dans un nouvel onglet.`}
          >
            <Image
              src={card.imageUrl}
              alt=""
              width={412}
              height={600}
              loading="lazy"
              quality={1}
              className="w-28 h-auto"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
