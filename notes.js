const etudiants = [
  { id: 1, nom: 'Amine', note: 16 },
  { id: 2, nom: 'Youssef', note: 8 },
  { id: 3, nom: 'Salma', note: 14 },
  { id: 4, nom: 'Omar', note: 12 }
];

function noteValide(note) {
  return Number.isFinite(note) &&
    note >= 0 && note <= 20;
}

function moyenne(notes) {
  if (notes.length === 0) return null;
  const total = notes.reduce(
    (somme, note) => somme + note, 0
  );
  return total / notes.length;
}

const notes = etudiants.map((e) => e.note);
const admis = etudiants.filter((e) => e.note >= 10);
const lignes = etudiants.map((e) => {
  const decision = e.note >= 10 ? 'Admis' : 'Ajourné';
return `${e.nom} - ${e.note}/20 - ${decision}`;
});

console.log('Moyenne :', moyenne(notes));
console.log('Admis :', admis.length);
for (const ligne of lignes) console.log(ligne);
