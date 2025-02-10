"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../data/cards.json";
import Image from "next/image";
import CardBack from "../../public/card_back.webp";

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
      (item) => item.cardName.toLowerCase() === inputText.toLowerCase() || item.shortName.toLowerCase() === inputText.toLowerCase()
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
    <div className="relative lg:gap-20 gap-10 bg-zinc-900 flex lg:flex-row flex-col items-center justify-center m-auto w-screen lg:min-h-screen sm:h-full py-16 lg:py-0 font-[family-name:var(--font-geist-sans)]">
      <div className="rounded-3xl flex flex-col items-center bg-gradient-to-br from-[#fff2d7] via-[#ffe0b5] to-[#f8c794] sm:w-md w-xs">
        <Image src={"https://steamuserimages-a.akamaihd.net/ugc/98351028247767080/B17615031F8D4F9D136377CC04A5BE921F4A446F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"} width={400} height={237} quality={10} alt="yugioh image" className="sm:w-96 w-72 m-8 rounded-3xl shadow-2xl" unoptimized />
        <h1 className="sm:mb-8 mb-4 w-auto text-zinc-800 font-black sm:text-4xl text-3xl px-1 text-center ">
          Quelle <span className=" bg-linear-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">carte</span> voulez-vous afficher ?
        </h1>
        <form onSubmit={handleShowImage} className="">
          <div className="flex flex-col items-center">
            <div className="relative sm:w-96 w-72 my-4">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Ex: Fenrir"
                className="text-center text-zinc-800 w-full py-2 px-4 rounded-xl text-lg shadow-xl bg-zinc-300 focus:outline-hidden"
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
      <div className="relative sm:w-96 w-72">
        {showBaseImage && (
          <div>
            <Image src={CardBack} alt="dos de carte yugi" width={412} height={600} quality={100} priority className="w-96 shadow-lg" />
          </div>
        )}

        {imageSrc && (
          <div className="">
            <Image src={imageSrc} alt={inputText} className="shadow-lg sm:w-96 w-72" width={412} height={600} priority />
          </div>
        )}
      </div>
      <Link href="/cardlist" className="absolute text-white lg:bottom-15 bottom-4 hover:opacity-75 hover:underline">
        Accès database (voir les cartes disponibles) →
      </Link>
    </div>
  );
}
