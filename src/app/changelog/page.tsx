"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const changelogSections = [
  {
    version: "V.1.04 - Fin Juin 2025",
    content: (
      <div className="text-left">
        <ul className="list-disc ml-6 mb-2">
          <li>Quelques updates graphiques, plus de cartes à rajouter à venir.</li>
          <li>
            Dans la liste des cartes : Catégories désormais affichées via des images, clic molette
            ouvre un nouvel onglet avec l&apos;image de la carte.
          </li>
        </ul>
        <p className="font-semibold mb-2">MaJ de la base de données :</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Crystron (Inclusion, Tristaros, soulfador EN) ✔️</li>
        </ul>
      </div>
    ),
  },
  {
    version: "V.1.03 - Fin Mai 2025 (666 cartes recensées)",
    content: (
      <div className="text-left">
        <ul className="list-disc ml-6 mb-2">
          <li>Ajout d&apos;une mini-box de texte.</li>
        </ul>
        <p className="font-semibold mb-2">MaJ de la base de données (DB) :</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Generaider ✔️</li>
          <li>Atlantean / Mermail ✔️ (❌ Vapeur-Abysses)</li>
        </ul>
      </div>
    ),
  },
  {
    version: "V.1.02.5 - Avril 2025 (609 cartes recensées)",
    content: (
      <div className="text-left">
        <ul className="list-disc ml-6 mb-2">
          <li>Ajout d&apos;une page Infos</li>
          <li>Raccourcis vers les différentes pages (Appli, Cartes, Infos)</li>
          <li>Affichage de cartes aléatoires si la recherche est vide</li>
          <li>Téléchargement possible de la page</li>
          <li>Ajustement visuel de quelques cartes</li>
        </ul>
        <p className="font-semibold mb-2">MaJ de la base de données (DB) :</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Memento ✔️</li>
          <li>Statues-Barrière ✔️</li>
          <li>Goblin Biker ✔️</li>
          <li>Quelques staples ✔️</li>
          <li>Argostars ✔️</li>
        </ul>
      </div>
    ),
  },
  {
    version: "V.1.02 - Avril 2025 (468 cartes recensées)",
    content: (
      <div className="text-left">
        <ul className="list-disc ml-6 mb-2">
          <li>
            <span className="font-semibold">Informations :</span> Un message est désormais affiché
            au clic sur la carte sélectionnée en bas de page, au lieu d&apos;une simple alerte.
          </li>
        </ul>
        <p className="font-semibold mb-2">MaJ de la base de données (DB) :</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Sky Striker ✔️</li>
          <li>Dinomorphia ✔️</li>
          <li>Mathmech ✔️</li>
          <li>Azamina ✔️</li>
          <li>Primite ✔️</li>
          <li>Fire King ✔️</li>
          <li>Spright ✔️</li>
          <li>Branded ✔️</li>
          <li>Albaz ✔️</li>
          <li>Dark Magician | Dark Magician Girl (manque Sorcier Eradicateur) ✔️</li>
          <li>Despia ✔️</li>
        </ul>
      </div>
    ),
  },
  {
    version: "V.1.01.5 - Fin Mars 2025 (336 cartes recensées)",
    content: (
      <div className="text-left">
        <p className="font-semibold mb-2">MaJ de la base de données (DB) :</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Cartes Dominus ✔️</li>
          <li>Exodia | Millennium (manque Brise-Sceau) ✔️</li>
          <li>Centur-Ion ✔️</li>
          <li>Yubel ✔️</li>
          <li>Runick ✔️</li>
          <li>Labrynth ✔️</li>
          <li>Voiceless Voice ✔️</li>
        </ul>
      </div>
    ),
  },
  {
    version: "V.1.01 - Début Mars 2025",
    content: (
      <div className="text-left">
        <p className="font-semibold mb-2">MaJ de la base de données (DB) :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Dragon Maudit de l&apos;oeil du serpent FR ✔️</li>
          <li>Rextremende & Kyrie Démonforgeron en FR ✔️</li>
          <li>Mulcharmy Meowls en FR ✔️</li>
          <li>Maliss ✔️</li>
          <li>Tenpai Dragon ✔️</li>
          <li>White Forest ✔️</li>
          <li>Blue-Eyes ✔️</li>
          <li>Swordsoul ✔️</li>
        </ul>
        <p className="font-semibold mb-2">Update</p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Création d&apos;un nouveau dossier pour certaines images + ajout/update de cartes.
          </li>
          <li>Sur l&apos;écran principal est affiché le nombre de cartes dans la BDD.</li>
          <li>Ajout des liens sociaux (BlueSky/GitHub/Youtube/LinkedIn).</li>
          <li>
            Dans la DB, nouvel affichage des cartes en fonction de leur archetype, option pour tout
            afficher/masquer.
          </li>
          <li>Ajout d&apos;une ligne id, secondArchetype, thirdArchetype dans le cards.json.</li>
          <li>Possibilité de cliquer sur une carte de la BDD pour en copier le nom.</li>
          <li>Autres petites corrections.</li>
        </ul>
      </div>
    ),
  },
  {
    version: "V.1 - Février 2025",
    content: (
      <div className="text-left">
        <p className="font-semibold mb-2">Base de données actuelle (DB) :</p>
        <ul className="list-disc ml-6 mb-2">
          <li>Démonforgeron (⚠️Kyrie & Rextremende ENG)</li>
          <li>Kashtira ✔️</li>
          <li>Majorité des handtraps populaires ✔️</li>
          <li>Mulcharmies (Meowls ENG) ✔️</li>
          <li>Snake-Eye (⚠️ Dragon maudit EN & Execute JAP) ✔️</li>
          <li>Tearlaments ✔️</li>
          <li>Bystial ✔️</li>
          <li>Ryzeal (TCG only)✔️</li>
          <li>Tenyi (⚠️ Surya ENG & Tenyinfini ENG)</li>
          <li>Staples (en cours... ⏳)</li>
          <li>Floodgates (en cours... ⏳)</li>
        </ul>
        <p className="font-semibold mb-2">Prévu dans le futur :</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Ajout de nouvelles cartes.</li>
          <li>Copier le nom de la carte au clic.</li>
          <li>Filtrage par Archetype.</li>
        </ul>
      </div>
    ),
  },
];

export default function Changelog() {
  // Par défaut, toutes les sections sont fermées
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleSection = (idx: number) => {
    setOpenIndexes((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-600 min-h-screen">
      <header>
        <Navbar />
      </header>
      <Link href="/" className="fixed text-white left-3 top-3 text-2xl hover:opacity-75">
        <i className="fa-solid fa-circle-left"></i>
      </Link>
      <main className="text-white text-center py-4 mx-auto">
        <h1 className="mb-8 lg:text-4xl text-3xl w-[250px] sm:w-[600px] mx-auto uppercase font-semibold">
          Changelog
        </h1>
        <div className="max-w-4xl mx-auto px-4">
          {changelogSections.map((section, idx) => (
            <div
              key={section.version}
              className="mb-4 pb-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              <button
                className="flex items-center justify-center w-full text-center focus:outline-none group p-4"
                onClick={() => toggleSection(idx)}
                aria-expanded={openIndexes.includes(idx)}
              >
                <span className="text-xl font-bold flex-1 group-hover:underline text-center">
                  {section.version}
                </span>
                <span className="ml-2 text-lg">{openIndexes.includes(idx) ? "▲" : "▼"}</span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden px-4 ${
                  openIndexes.includes(idx)
                    ? "max-h-[1000px] opacity-100 mt-2 pb-4"
                    : "max-h-0 opacity-0 p-0 m-0"
                }`}
                style={{ pointerEvents: openIndexes.includes(idx) ? "auto" : "none" }}
              >
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
