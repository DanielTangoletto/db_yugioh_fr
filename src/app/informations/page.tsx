"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Card from "../../data/cards.json";
import Yugi from "../../../public/yugi.webp";

export default function Informations() {
  return (
    <div className="overflow-x-hidden">
      <div className="fixed -z-50 bg-gradient-to-br from-gray-900 to-gray-600 w-full h-full"></div>
      <header className="text-white text-center py-4">
        <div className="flex flex-col items-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/6/62/Yu-Gi-Oh%21_%281998%29_logo.png"
            alt="logo yugioh"
            width={200}
            height={100}
            className="mt-2"
          />
          <h1 className="mb-4 text-xl w-[250px] sm:w-[600px] mt-2 uppercase font-light">
            - Infos sur l&apos;appli -
          </h1>
        </div>

        <Link href="./" className="fixed text-white left-3 top-3 text-2xl hover:opacity-75">
          <i className="fa-solid fa-circle-left"></i>
        </Link>
      </header>
      <header>
        <Navbar />
      </header>
      <main className="max-w-[700px] mx-auto text-white">
        <section className="intro text-center mb-4 flex flex-col items-center mx-8">
          <Image
            src={Yugi}
            width={400}
            height={240}
            alt="yugi muto animation"
            className="mb-8 rounded-2xl shadow-2xl"
          />
          <h1 className="text-xl font-black">
            Introduction à l&apos;appli | Base de données FR de cartes Yu-Gi-Oh / Affichage via une
            barre de recherche
          </h1>
          <div className="trait w-[700px] h-[1px] my-3 bg-white"></div>
          <p className="font-light">
            En tant que Développeur Web Junior et afin de m&apos;entraîner sur le framework de
            React, <span>NextJS</span>, ainsi que sur <span>TailwindCSS</span>, j&apos;ai souhaité
            développer une application qui permettrait d&apos;afficher des cartes Yu-Gi-Oh! dans
            leur version Française. Le but étant de donner la possibilité d&apos;afficher des cartes
            pendant une vidéo ou un live (comme fait Zouloux dans ses lives Twitch).
          </p>
        </section>
        <section className="flex flex-col items-center text-center mx-8 mb-8">
          <h2 className="text-lg font-black">Des cartes ajoutées au fur et à mesure.</h2>
          <div className="trait w-[600px] h-[1px] my-3 bg-white"></div>
          <p className="font-light my-1">
            A ce jour l&apos;application compte{" "}
            <span className="font-bold text-lg text-green-300">{Card.length}</span> cartes stockées
            dans la base de données :)
          </p>
          <p className="font-light my-1">
            Une page recense tous les archétypes recensés dans l&apos;application. Parmi eux, des
            archétypes populaires comme Ryzéal, Maliss ou encore Blue-Eyes etc...
          </p>
          <p className="font-light my-1">
            Le changelog dans son intégralité est disponible sur le Readme de la page{" "}
            <a
              href="https://github.com/DanielTangoletto/db_yugioh_fr"
              target="_blank"
              className="font-bold text-blue-300"
            >
              Github
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
