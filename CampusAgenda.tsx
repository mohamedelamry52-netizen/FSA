import React from "react";
import {View,Text,FlatList,StyleSheet} from "react-native";
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};
const evenements: Evenement[] =[
  {id: "E01", titre: "Atelier React", categorie: "Atelier", capacite: 25, inscrits: 25},
  {id: "E02", titre: "Conférence IA", categorie: "Conférence", capacite: 70, inscrits: 52},
  {id: "E03", titre: "Sécurité mobile", categorie: "Atelier", capacite: 20, inscrits: 17},
  {id: "E04", titre: "Design UI", categorie: "Atelier", capacite: 18, inscrits: 9},
  {id: "E05", titre: "Forum projets", categorie: "Rencontre", capacite: 50, inscrits: 49},
  {id: "E06", titre: "Découverte Git", categorie: "Atelier", capacite: 24, inscrits: 24}
];
function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}
function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);
  if(places === 0){
    return "Complet";
  }else if(places <= 3){
    return "Presque complet";
  }else{
    return "Ouvert";
  }
}
const totalEvenements = evenements.length;
const evenementsComplets = evenements.filter(e => placesRestantes(e) === 0).length;
const evenementsDisponibles = evenements.filter(e => placesRestantes(e) > 0).length;
const totalPlaces = evenements.reduce((total, e) => total + placesRestantes(e),0);
const ateliersDisponibles = evenements.filter(e => e.categorie === "Atelier" && placesRestantes(e) > 0);
type BadgeProps = {
  statut: string;
};
function BadgeEtat({statut}: BadgeProps){
  let couleur = "#4CAF50";
  if(statut === "Complet"){
    couleur = "#F44336";
  }else if(statut === "Presque complet"){
    couleur = "#FF9800";
  }
  return(
    <View style={[styles.badge, { backgroundColor: couleur }]}>
      <Text style={styles.texteBadge}>{statut}</Text>
    </View>
  );
}
type CarteProps = {
  evenement: Evenement;
};
function CarteEvenement({evenement}: CarteProps){
  return(
    <View style={styles.carte}>
      <Text style={styles.titre}>{evenement.titre}</Text>
      <Text style={styles.categorie}>{evenement.categorie}</Text>
      <Text style={styles.places}>{placesRestantes(evenement)} places libres</Text>
      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}
type StatProps = {
  titre: string;
  valeur: number;
};
function BlocStatistique({titre, valeur}: StatProps){
  return(
    <View style={styles.statistique}>
      <Text style={styles.titreStat}>{titre}</Text>
      <Text style={styles.valeur}>{valeur}</Text>
    </View>
  );
}
export default function App() {
  const mode = "tous";
  const evenementsAffiches = mode === "tous" ? evenements : ateliersDisponibles;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CampusAgenda</Text>
      <Text style={styles.sousTitre}>Événements du campus</Text>
      <View style={styles.ligne}>
        <BlocStatistique titre="Événements" valeur={totalEvenements}/>
        <BlocStatistique titre="Événements complets" valeur={evenementsComplets}/>
      </View>
      <View style={styles.ligne}>
        <BlocStatistique titre="Événements disponibles" valeur={evenementsDisponibles}/>
        <BlocStatistique titre="Places restantes" valeur={totalPlaces}/>
      </View>
      <Text style={styles.mode}> Mode: {mode}</Text>
      <FlatList data={evenementsAffiches} renderItem={({item}) => (<CarteEvenement evenement={item}/>)}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.messageVide}> Aucun événement disponible</Text>}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: "#F4F6FA",padding: 15,paddingTop: 45},
  header: {fontSize: 28,fontWeight: "bold",color: "#263A70"},
  sousTitre: {fontSize: 16,color: "#777",marginBottom: 20},
  ligne: {flexDirection: "row",justifyContent: "space-between",marginBottom: 10},
  statistique: {flex: 1,backgroundColor: "white",padding: 12,margin: 4,borderRadius: 12},
  titreStat: {fontSize: 12,color: "#666"},
  valeur: {fontSize: 24,fontWeight: "bold",color: "#263A70"},
  mode: {fontSize: 18,fontWeight: "bold",marginVertical: 15},
  carte: {backgroundColor: "white",padding: 15,marginBottom: 12,borderRadius: 12},
  titre: {fontSize: 18,fontWeight: "bold"},
  categorie: {color: "#777",marginTop: 5},
  places: {marginTop: 8,marginBottom: 8},
  badge: {alignSelf: "flex-start",padding: 8,borderRadius: 8},
  texteBadge: {color: "white",fontWeight: "bold"},
  messageVide: {textAlign: "center",marginTop: 30,fontSize: 16,color: "#777"}
});
