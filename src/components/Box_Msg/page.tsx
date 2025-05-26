import { useState, useEffect } from 'react';
import Message from "../../data/messages.json";

export default function Box_Msg() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => 
          prevIndex === Message.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500); // Temps de l'animation de fondu
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex absolute w-80 h-10 lg:bottom-26 bottom-18 bg-white items-center justify-center rounded-2xl">
      <p className={`text-black text-center text-[14px] transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {Message[currentMessageIndex].text}
      </p>
    </section>
  );
}