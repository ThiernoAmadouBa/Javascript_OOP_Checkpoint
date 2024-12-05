// Créez une classe d'objet pour le produit afin de stocker les propriétés pour l'id, le nom et le prix du produit.
class Produit{
    constructor(id,nom,prix){
        this.id=id;
        this.nom=nom;
        this.prix=prix;

    }
}

// Classe pour représenter un élément du panier
class PanierItem {
    constructor(produit, quantite) {
        if (!(produit instanceof Produit)) {
            throw new Error("Le paramètre 'produit' doit être une instance de la classe Produit.");
        }
        this.produit = produit; // Instance de la classe Produit
        this.quantite = quantite; // Quantité de cet article dans le panier
    }

    // Méthode pour calculer le prix total de l'élément
    calculerPrixTotal() {
        return this.produit.prix * this.quantite;
    }
}

// Classe pour représenter le panier d'achat
class Panier {
    constructor() {
        this.items = []; // Tableau pour stocker les instances de PanierItem
    }

    // Ajouter un ou plusieurs éléments au panier
    ajouterItem(produit, quantite) {
        const itemExistant = this.items.find(item => item.produit.id === produit.id);
        if (itemExistant) {
            // Si le produit est déjà dans le panier, on met à jour la quantité
            itemExistant.quantite += quantite;
        } else {
            // Sinon, on ajoute un nouvel élément au panier
            this.items.push(new PanierItem(produit, quantite));
        }
    }

    ajouterElements(elements) {
        elements.forEach(({ produit, quantite }) => {
            this.ajouterItem(produit, quantite);
        });
    }

    // Supprimer un ou plusieurs éléments du panier
    supprimerItem(produitId) {
        this.items = this.items.filter(item => item.produit.id !== produitId);
    }

    // Supprimer plusieurs éléments par leurs IDs
    supprimerElements(ids) {
        ids.forEach(id => this.supprimerItem(id));
    }

    // Calculer le prix total du panier
    calculerTotalPanier() {
        return this.items.reduce((total, item) => total + item.calculerPrixTotal(), 0);
    }

    // Obtenir le total des éléments (quantité totale) à l'intérieur du panier
    obtenirTotalElements() {
        return this.items.reduce((total, item) => total + item.quantite, 0);
    }

    // Afficher les éléments du panier
    afficherContenu() {
        if (this.items.length === 0) {
            console.log("Le panier est vide.");
            return;
        }

        console.log("Contenu du panier :");
        this.items.forEach(item => {
            console.log(`${item.quantite} x ${item.produit.nom} - Total: ${item.calculerPrixTotal()} €`);
        });
        console.log(`Prix total du panier : ${this.calculerTotalPanier()} €`);
        console.log(`Nombre total d'articles dans le panier : ${this.obtenirTotalElements()}`);
    }
}

// Exemple d'utilisation
const produit1 = new Produit(1, "Ordinateur Portable", 1200.00);
const produit2 = new Produit(2, "Souris sans fil", 25.50);
const produit3 = new Produit(3, "Clavier mécanique", 80.00);

const panier = new Panier();

// Ajouter des éléments au panier
panier.ajouterItem(produit1, 2); // 2 ordinateurs portables
panier.ajouterElements([
    { produit: produit2, quantite: 3 }, // 3 souris sans fil
    { produit: produit3, quantite: 1 }  // 1 clavier mécanique
]);

// Afficher le contenu du panier
panier.afficherContenu();

// Supprimer un élément
panier.supprimerItem(2); // Supprimer les souris sans fil
console.log("\nAprès suppression d'un élément :");
panier.afficherContenu();

// Ajouter d'autres éléments
panier.ajouterItem(produit2, 5); // Ajouter 5 souris supplémentaires
console.log("\nAprès ajout de nouveaux éléments :");
panier.afficherContenu();

// Supprimer plusieurs éléments
panier.supprimerElements([1, 3]); // Supprimer l'ordinateur portable et le clavier
console.log("\nAprès suppression de plusieurs éléments :");
panier.afficherContenu();

    
