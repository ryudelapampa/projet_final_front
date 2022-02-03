import AbsenceApi from "../services/AbsenceApi";

export const GestionAbsences = {
  state: {
    monState: "State Store 01",
    listeAbsences: null,
  },
  getters: {
    getAbsences: (state) => {
      return state.listeAbsences;
    },
    allAbsences: (state) => {
      AbsenceApi.gettAll().then((response) => {
        state.listeAbsences = response.data;
        console.log(state.listeAbsences);
      });
    },
    addListeAbsence: (state) => (absence) => {
      AbsenceApi.add(absence).then(() => {
        state.getters.allAbsences();
      });
    },
  },
};
