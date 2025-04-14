"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../data/cards.json";
import Image from "next/image";
import CardBack from "../../public/card_back.webp";
import DMG from "../../public/dmg.gif";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [showBaseImage, setShowBaseImage] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleShowImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const matchedImage = Card.find(
      (item) =>
        item.cardName.toLowerCase() === inputText.toLowerCase() ||
        item.shortName.toLowerCase() === inputText.toLowerCase()
    );

    if (matchedImage) {
      setImageSrc(matchedImage.imageUrl);
      setShowBaseImage(false);
    } else {
      setImageSrc("");
      setShowBaseImage(true);
    }
  };

  return (
    <div className=" relative lg:gap-20 gap-10 bg-gradient-to-br from-gray-900 to-gray-600 flex lg:flex-row flex-col items-center justify-center m-auto w-screen lg:min-h-screen h-full py-16 lg:py-0 font-[family-name:var(--font-geist-sans)]">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/6/62/Yu-Gi-Oh%21_%281998%29_logo.png"
        alt="logo yugioh"
        width={200}
        height={100}
        className="absolute top-8 max-[1025]:invisible"
      />
      <div className="rounded-3xl flex flex-col items-center bg-gradient-to-br from-[#fff2d7] via-[#ffe0b5] to-[#f8c794] sm:w-md w-xs">
        <Image
          src={DMG}
          width={400}
          height={237}
          quality={1}
          alt="yugioh image"
          className="sm:w-96 w-72 m-8 rounded-3xl shadow-2xl"
          unoptimized
        />

        <h1 className="sm:mb-8 mb-4 w-auto text-zinc-800 font-black sm:text-4xl text-3xl px-1 text-center ">
          Quelle{" "}
          <span className=" bg-linear-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            carte
          </span>{" "}
          voulez-vous afficher ?
        </h1>
        <form onSubmit={handleShowImage} className="">
          <div className="flex flex-col items-center">
            <div className="relative sm:w-96 w-72 my-4">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Ex: Fenrir"
                className="text-center text-zinc-800 w-full py-3 px-10 rounded-xl text-xs sm:text-sm shadow-xl bg-zinc-300 focus:outline-hidden"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-800">
                <i className="fas fa-search"></i>
              </div>
            </div>

            <button
              type="submit"
              className=" w-4/5 py-2.5 sm:text-sm text-xs rounded-xl bg-zinc-800 shadow-gray-500/50 text-zinc-300 cursor-pointer font-medium text-center active:opacity-95 active:shadow-sm"
            >
              Cliquez ou appuyez sur Entrée
            </button>
          </div>
        </form>
        <p className=" italic text-sm my-4 text-black">crée par @DanyMasta</p>
      </div>
      <div className="relative">
        {showBaseImage && (
          <div>
            <Image
              src={CardBack}
              alt="carte face verso yugioh"
              width={288}
              height={419}
              quality={50}
              priority
              className="sm:w-[388px] shadow-lg"
            />
          </div>
        )}

        {imageSrc && (
          <div>
            <Image
              src={imageSrc}
              alt={inputText}
              className="sm:w-[388px] shadow-lg"
              width={288}
              height={419}
              quality={80}
              priority
              decoding="async"
            />
          </div>
        )}
      </div>
      <Link
        href="/cardlist"
        className="absolute text-white text-sm md:text-[16px] lg:bottom-15 bottom-4 hover:opacity-75 hover:underline"
      >
        Accès database (voir les{" "}
        <span className="font-bold text-lg text-green-300">{Card.length}</span> cartes disponibles)
      </Link>
      <footer className="absolute bottom-6 max-[1025px]:invisible">
        <div className="flex gap-3">
          <a
            href="https://bsky.app/profile/danymasta.bsky.social"
            target="_blank"
            className="fa-brands fa-square-bluesky text-3xl text-white hover:text-[#1185FE] cursor-pointer"
          ></a>
          <a
            href="https://github.com/DanielTangoletto"
            target="_blank"
            className="fa-brands fa-square-github text-3xl text-white hover:text-[#6E5494] cursor-pointer"
          ></a>
          <a
            href="https://www.youtube.com/@DanyMastaPokemon"
            target="_blank"
            className="fa-brands fa-square-youtube text-3xl text-white hover:text-[#c4302b] cursor-pointer"
          ></a>
          <a
            href="https://www.linkedin.com/in/daniel-tangoletto-823210215/"
            target="_blank"
            className="fa-brands fa-linkedin text-white text-3xl hover:text-[#0e76a8] cursor-pointer"
          ></a>
        </div>
      </footer>
    </div>
  );
}
