const produits = [
    { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
    { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
    { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
    { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 }
];
console.log("1. Affichage du catalogue :");
for(let i=0; i<produits.length; i++){
    console.log(`le nom: ${produits[i].nom} - le prix : ${produits[i].prix} DH`);
}
console.log("2. Disponibilité :");
const disponibles = produits.filter(produit => produit.stock > 0);
console.log(disponibles);
console.log(`Nombre de produits : ${disponibles.length}`);

console.log("3. Valeur du stock :");
const valeurStock = produits.reduce((s, produit) =>s + produit.prix * produit.stock,0);
console.log(valeurStock);

console.log("4. Prix minimal :")
if (disponibles.length > 0) {
    const moinsCher = disponibles.reduce((moins, produit) =>produit.prix < moins.prix ? produit : moins);
    console.log(`Produit le moins cher :${moinsCher.nom} - ${moinsCher.prix} DH`);
} else {
    console.log("Aucun produit disponible");
}

console.log("5. Résumé :")
const resume = produits.map(produit =>`${produit.nom} - ${produit.prix} MAD - ${produit.stock} unités`);
console.log(resume);
console.log("\n Défi supplémentaire : ");
const estValide = (produit) => {
  return (
    Number.isFinite(produit.prix) && produit.prix >= 0 &&
    Number.isFinite(produit.stock) && produit.stock >= 0
  );
};

const tousValides = produits.every(estValide);
console.log(`Tous les produits du catalogue sont valides ? ${tousValides ? "Oui" : "Non"}`);
