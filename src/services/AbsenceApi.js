import axios from "axios";

const url = 'http://localhost:8590/api/absence'

export default class AbsenceApi {
    
    static gettAll() {
        return axios.get(url+"/all")
    }

    static gettAllRttEmployeur() {
        return axios.get(url+"/rttemployeur")
    }

    static find(id) {
        return axios.get(url+`/${id}`)
    }

    static deleteCli(id) {
        return axios.delete(url+`/${id}`)
    }

    static add(absence) {
        return axios.post(absence)
    }

    static update(id,absence) {
        return axios.put(url+`/${id}`,absence)
    }
}