import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="fixed flex flex-col text-[15px] text-right font-light right-4 top-1/2 text-white invisible min-[1440px]:visible">
      <Link
        href="/"
        className="px-3 py-1 rounded hover:opacity-60 hover:scale-120 transition-all ease-in-out duration-300"
      >
        Appli 💻
      </Link>
      <Link
        href="/cardlist"
        className="px-3 py-1 rounded hover:opacity-60 hover:scale-120 transition-all ease-in-out duration-300"
      >
        Cartes 🃏
      </Link>
      <Link
        href="/informations"
        className="px-3 py-1 rounded hover:opacity-60 hover:scale-120 transition-all ease-in-out duration-300"
      >
        Infos 📰
      </Link>
      <Link
        href="/changelog"
        className="px-3 py-1 rounded hover:opacity-60 hover:scale-120 transition-all ease-in-out duration-300"
      >
        Changelog 📝
      </Link>
      <a
        href="https://www.masterduelmeta.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 rounded hover:opacity-60 hover:scale-120 transition-all ease-in-out duration-300"
      >
        MDM 🏆
      </a>
    </div>
  );
}
