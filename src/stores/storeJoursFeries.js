import JourFerieApi from '../services/JourFerieApi';

export const GestionJourFerie = {

    state : {
        joursFeries : []
    },

    getters : {
        getJoursFeries: (state) => {
            return state.joursFeries;
        },

        allJoursFeries: (state) => {
            JourFerieApi.gettAll().then((response) => { state.joursFeries = response.data});
        }
    }

}