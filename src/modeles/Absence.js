export default class Absence {

    dateJour =""
    motif =""
    statut =""
    type =""
    collaborateur = null

    constructor(dateJour,motif,type,statut,collaborateur) {
        this.dateJour = dateJour;
        this.motif = motif;
        this.statut = statut;
        this.type = type;
        this.collaborateur = collaborateur;
    }

}