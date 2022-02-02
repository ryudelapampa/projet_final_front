export default class Absence {
    dateJour =""
    libelle =""
    duree =""
    statut ="INITIALE"
    type =""

    constructor(dateJour,libelle,duree,type) {
        this.dateJour = dateJour;
        this.libelle = libelle;
        this.duree = duree;
        this.type = type;
    }

}