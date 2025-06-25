const fs = require("fs");
const path = require("path");

const cardsPath = path.join(__dirname, "cards.json");
const cards = JSON.parse(fs.readFileSync(cardsPath, "utf8"));

const chunkSize = 100;
const totalChunks = Math.ceil(cards.length / chunkSize);

for (let i = 0; i < totalChunks; i++) {
  const chunk = cards.slice(i * chunkSize, (i + 1) * chunkSize);
  const fileName = `cards_${i + 1}.json`;
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, JSON.stringify(chunk, null, 2));
  console.log(`Fichier ${fileName} créé avec ${chunk.length} cartes.`);
}

console.log("Découpage terminé !");
