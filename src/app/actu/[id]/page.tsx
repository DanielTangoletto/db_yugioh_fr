'use client'
import { useParams } from 'next/navigation';
import { notFound } from "next/navigation";
import articles from "@/data/articles.json";
import Link from "next/link";

export default function ArticlePage() {
  const params = useParams();
  const article = articles.find((a) => a.id.toString() === params.id);
  
  if (!article) return notFound();

  return (
    <div className="text-white text-center py-4 mx-auto bg-gradient-to-br from-gray-900 to-gray-600 font-[family-name:var(--font-geist-sans)] lg:min-h-screen h-full">
      <Link href="./" className="fixed text-white left-3 top-3 text-2xl hover:opacity-75">
        <i className="fa-solid fa-circle-left"></i>
      </Link>{" "}
      <main>
        <h1 className="">{article.title}</h1>
        <p>{article.content}</p>
        <p>
          Rédigé le {article.date} par {article.redactor}
        </p>
      </main>
    </div>
  );
}
