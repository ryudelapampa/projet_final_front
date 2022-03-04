import CollaborateurApi from '../services/CollaborateurApi';

export const GestionCollaborateur = {

    state : {
        collaborateur : null
    },

    mutations : {
        SET_COLLAB(state, collaborateur) {
            state.collaborateur = collaborateur
        }
    },

    actions : {
        getCollab({commit}) {
            CollaborateurApi.find(14).then(response => {commit('SET_COLLAB', response.data)})
        }
    }


}