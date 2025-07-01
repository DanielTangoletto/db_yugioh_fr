"use client";
import Link from "next/link";
import Image from "next/image";
import CardBack from "../../public/card_back.webp";
import DMG from "../../public/dmg.webp";
import Navbar from "@/components/Navbar";
import Media from "@/components/Media";
import { useCardSearch } from "@/hooks/useCardSearch";
import cards1 from "../data/cards_1.json";
import cards2 from "../data/cards_2.json";
import cards3 from "../data/cards_3.json";
import cards4 from "../data/cards_4.json";
import cards5 from "../data/cards_5.json";
import cards6 from "../data/cards_6.json";
import cards7 from "../data/cards_7.json";
import cards8 from "../data/cards_8.json";
import cards9 from "../data/cards_9.json";

const Card = [...cards1, ...cards2, ...cards3, ...cards4, ...cards5, ...cards6, ...cards7, ...cards8, ...cards9];

// Constantes extraites
const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/62/Yu-Gi-Oh%21_%281998%29_logo.png";
const CARD_COUNT = Card.length;

// Composant pour l'image de la carte
const CardImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <Image
    src={src}
    alt={alt}
    className={`sm:w-[388px] w-72 shadow-lg ${className || ""}`}
    width={412}
    height={600}
    quality={80}
    decoding="async"
    loading="lazy"
  />
);

// Composant pour le formulaire de recherche
const SearchForm = ({
  inputText,
  handleInputChange,
  handleShowImage,
}: {
  inputText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowImage: (e: React.FormEvent<HTMLFormElement>) => void;
}) => (
  <form onSubmit={handleShowImage}>
    <div className="flex flex-col items-center">
      <div className="relative sm:w-96 w-72 my-4">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Ex: Fenrir"
          className="text-center text-zinc-800 w-full py-3 px-10 rounded-xl text-xs sm:text-sm shadow-xl bg-zinc-300 focus:outline-hidden"
          autoComplete="off"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-800">
          <i className="fas fa-search"></i>
        </div>
      </div>
      <button
        type="submit"
        className="w-4/5 py-2.5 sm:text-sm text-xs rounded-xl bg-zinc-800 shadow-gray-500/50 text-zinc-300 cursor-pointer font-medium text-center active:opacity-95 active:shadow-sm"
      >
        Cliquez ou appuyez sur Entrée
      </button>
    </div>
  </form>
);

export default function Home() {
  const { inputText, imageSrc, showBaseImage, handleInputChange, handleShowImage } =
    useCardSearch();

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-gray-600 min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header>
        <Navbar />
      </header>

      <Image
        src={LOGO_URL}
        alt="logo yugioh"
        width={200}
        height={100}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 max-[1025px]:invisible w-auto h-auto"
      />

      <div className="flex lg:flex-row flex-col items-center justify-center min-h-screen gap-10 lg:gap-20 px-4">
        {/* Section de recherche */}
        <div className="navbar-cards rounded-3xl flex flex-col items-center bg-gradient-to-br from-[#fff2d7] via-[#ffe0b5] to-[#f8c794] sm:w-md w-xs">
          <Image
            src={DMG}
            width={250}
            height={148}
            quality={60}
            alt="yugioh image"
            className="sm:w-96 w-60 m-8 rounded-3xl shadow-2xl"
            placeholder="blur"
          />

          <h1 className="sm:mb-8 mb-4 w-auto text-zinc-800 font-black sm:text-4xl text-3xl px-1 text-center">
            Quelle{" "}
            <span className="bg-linear-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              carte
            </span>{" "}
            voulez-vous afficher ?
          </h1>

          <SearchForm
            inputText={inputText}
            handleInputChange={handleInputChange}
            handleShowImage={handleShowImage}
          />

          <p className="italic text-sm my-4 text-black">crée par @DanyMasta</p>
        </div>

        {/* Affichage des cartes */}
        <div className="cards-display flex items-center justify-center">
          {showBaseImage ? (
            <Image
              src={CardBack}
              alt="carte face verso yugioh"
              width={288}
              height={419}
              quality={60}
              className="sm:w-[388px] w-72 shadow-lg"
              placeholder="blur"
            />
          ) : (
            imageSrc && <CardImage src={imageSrc} alt={inputText} />
          )}
        </div>
      </div>

      <footer className="absolute bottom-6 left-1/2 transform -translate-x-1/2 max-[1025px]:invisible">
        <Link
          href="/cardlist"
          className="absolute text-white text-sm md:text-[16px] bottom-10 hover:opacity-75 hover:underline w-auto whitespace-nowrap left-1/2 transform -translate-x-1/2"
        >
          Accès database (voir les{" "}
          <span className="font-bold text-lg text-green-300">{CARD_COUNT}</span> cartes disponibles)
        </Link>
        <Media />
      </footer>
    </div>
  );
}
