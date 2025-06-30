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
import Navbar from "@/components/Navbar";

const Card = [...cards1, ...cards2, ...cards3, ...cards4, ...cards5, ...cards6, ...cards7];

// Configuration des archetypes avec leurs images
const ARCHETYPE_CONFIG = {
  Albaz:
    "https://ms.yugipedia.com//thumb/3/3e/FallenofAlbaz-MADU-EN-VG-artwork.png/275px-FallenofAlbaz-MADU-EN-VG-artwork.png",
  Argostars: "https://ygomjson.untapped.gg/art/crop/256/alin/21050476.webp",
  Atlantean: "https://ygomjson.untapped.gg/art/crop/256/cblz/22446869.webp",
  Azamina: "https://ygomjson.untapped.gg/art/crop/256/suda/65033975.webp",
  "Blue-Eyes": "https://ygomjson.untapped.gg/art/crop/256/lob/89631139.webp",
  Branded: "https://ygomjson.untapped.gg/art/crop/256/dama/25451383.webp",
  "Buster Blader": "https://ygomjson.untapped.gg/art/crop/256/bosh/3428069.webp",
  Bystial: "https://ygomjson.untapped.gg/art/crop/256/dabl/32731036.webp",
  "Centur-Ion": "https://ygomjson.untapped.gg/art/crop/256/lede/97698279.webp",
  Crystron: "https://ygomjson.untapped.gg/art/crop/256/rate/3422200.webp",
  "Dark Magician": "https://ygomjson.untapped.gg/art/crop/256/sdy/46986414.webp",
  Despia: "https://ygomjson.untapped.gg/art/crop/256/dama/99456344.webp",
  Dinomorphia: "https://ygomjson.untapped.gg/art/crop/256/bach/92133240.webp",
  Dogmatika: "https://ygomjson.untapped.gg/art/crop/256/rotd/60303688.webp",
  Exodia: "https://ygomjson.untapped.gg/art/crop/256/ldk2/58604027.webp",
  Fiendsmith: "https://ygomjson.untapped.gg/art/crop/256/info/60764609.webp",
  "Fire King": "https://ygomjson.untapped.gg/art/crop/256/sr14/2526224.webp",
  Floodgate: "https://ygomjson.untapped.gg/art/crop/256/cibr/32181268.webp",
  Generaider: "https://ygomjson.untapped.gg/art/crop/256/etco/68199168.webp",
  "Goblin Biker": "https://ygomjson.untapped.gg/art/crop/256/phni/27868563.webp",
  Handtrap: "https://ygomjson.untapped.gg/art/crop/256/macr/14558127.webp",
  Kashtira: "https://ygomjson.untapped.gg/art/crop/256/dabl/68304193.webp",
  Kuriboh: "https://ygomjson.untapped.gg/art/crop/256/bltr/48486809.webp",
  Labrynth: "https://ygomjson.untapped.gg/art/crop/256/tama/2347656.webp",
  Malefic: "https://ygomjson.untapped.gg/art/crop/256/ymp1/598988.webp",
  Maliss:
    "https://ms.yugipedia.com//thumb/c/c1/MalissinUnderground-OW.png/257px-MalissinUnderground-OW.png",
  Mathmech: "https://ygomjson.untapped.gg/art/crop/256/pote/36521307.webp",
  Mementotlain: "https://ygomjson.untapped.gg/art/crop/256/vasm/81677154.webp",
  Mermail: "https://ygomjson.untapped.gg/art/crop/256/cblz/37781520.webp",
  Millennium: "https://ygomjson.untapped.gg/art/crop/256/info/38775407.webp",
  Predaplant: "https://ygomjson.untapped.gg/art/crop/256/difo/17825378.webp",
  Primite: "https://ygomjson.untapped.gg/art/crop/256/suda/63198739.webp",
  "Red-Eyes": "https://ygomjson.untapped.gg/art/crop/256/rota/80870883.webp",
  Runick: "https://ygomjson.untapped.gg/art/crop/256/tama/92107604.webp",
  Ryzeal: "https://yugi.wiki/assets/card-arts/8633261.jpg",
  Sarcophagus: "https://ygomjson.untapped.gg/art/crop/256/info/342673.webp",
  Shaddoll: "https://ygomjson.untapped.gg/art/crop/256/gftp/92079625.webp",
  "Sinful Spoils": "https://ygomjson.untapped.gg/art/crop/256/rota/66328392.webp",
  "Sky Striker": "https://ygomjson.untapped.gg/art/crop/256/dasa/26077387.webp",
  "Snake-Eye": "https://ygomjson.untapped.gg/art/crop/256/agov/48452496.webp",
  Spright: "https://yugi.wiki/assets/card-arts/54498517.jpg",
  Springans: "https://yugi.wiki/assets/card-arts/48285768.jpg",
  Staple: "https://yugi.wiki/assets/card-arts/12580477.jpg",
  Swordsoul: "https://ygomjson.untapped.gg/art/crop/256/bode/93490856.webp",
  Tearlaments: "https://yugi.wiki/assets/card-arts/92731385.jpg",
  "Tenpai Dragon": "https://yugi.wiki/assets/card-arts/18969888.jpg",
  Tenyi: "https://yugi.wiki/assets/card-arts/73121813.jpg",
  Toon: "https://ygomjson.untapped.gg/art/crop/256/mrl/53183600.webp",
  "Tri-Brigade": "https://ygomjson.untapped.gg/art/crop/256/phra/87209160.webp",
  "Voiceless Voice": "https://ygomjson.untapped.gg/art/crop/256/phni/10774240.webp",
  "White Forest": "https://ygomjson.untapped.gg/art/crop/256/info/98385955.webp",
  Yubel: "https://ygomjson.untapped.gg/art/crop/256/ptdn/78371393.webp",
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
          {archetypes.map((archetype, index) => (
            <button
              key={index}
              className={`mx-2 my-2 font-semibold border-0 cursor-pointer uppercase ${getArchetypeClasses(
                archetype
              )}`}
              style={getArchetypeStyle(archetype)}
              onClick={() => setSelectedArchetype(archetype)}
            >
              {!(archetype in ARCHETYPE_CONFIG) && archetype}
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
            onMouseDown={(e) => openImageInNewTab(card.imageUrl, e)}
          >
            <Image
              src={card.imageUrl}
              alt={card.cardName}
              width={412}
              height={600}
              loading="lazy"
              quality={1}
              className="w-28 h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
