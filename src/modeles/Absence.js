export default class Absence {

    id = ""
    dateJour =""
    motif =""
    statut =""
    type =""
    collaborateur = null

    constructor(id,dateJour,motif,type,statut,collaborateur) {
        this.id = id
        this.dateJour = dateJour;
        this.motif = motif;
        this.statut = statut;
        this.type = type;
        this.collaborateur = collaborateur;
    }

}