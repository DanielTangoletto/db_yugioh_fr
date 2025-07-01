import { useState, useMemo, useCallback } from "react";
import cards1 from "../data/cards_1.json";
import cards2 from "../data/cards_2.json";
import cards3 from "../data/cards_3.json";
import cards4 from "../data/cards_4.json";
import cards5 from "../data/cards_5.json";
import cards6 from "../data/cards_6.json";
import cards7 from "../data/cards_7.json";
import cards8 from "../data/cards_8.json";

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

// Fonction pour ignorer les accents
function normalizeString(str: string) {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export const useCardSearch = () => {
  const [inputText, setInputText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [showBaseImage, setShowBaseImage] = useState(true);

  // Créer un index de recherche optimisé avec useMemo
  const searchIndex = useMemo(() => {
    const index = new Map<string, (typeof Card)[0]>();

    Card.forEach((card) => {
      const normalizedCardName = normalizeString(card.cardName);

      index.set(normalizedCardName, card);
    });

    return index;
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const handleShowImage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Afficher une carte aléatoire
      if (!inputText.trim()) {
        const randomIndex = Math.floor(Math.random() * Card.length);
        const randomCard = Card[randomIndex];
        setImageSrc(randomCard.imageUrl);
        setShowBaseImage(false);
        return;
      }

      // Recherche optimisée avec l'index
      const normalizedInput = normalizeString(inputText);
      const matchedCard = searchIndex.get(normalizedInput);

      if (matchedCard) {
        setImageSrc(matchedCard.imageUrl);
        setShowBaseImage(false);
      } else {
        setImageSrc("");
        setShowBaseImage(true);
      }
    },
    [inputText, searchIndex]
  );

  const resetSearch = useCallback(() => {
    setInputText("");
    setImageSrc("");
    setShowBaseImage(true);
  }, []);

  return {
    inputText,
    imageSrc,
    showBaseImage,
    handleInputChange,
    handleShowImage,
    resetSearch,
  };
};
