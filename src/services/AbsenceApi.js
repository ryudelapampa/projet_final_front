import axios from "axios";
import urlApi from './urlApi.js'

const url = urlApi.data().urlGet+"/absence"

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

    static delete(id) {
        return axios.delete(url+`/${id}`)
    }

    static add(absence) {
        return axios.post(url,absence)
    }

    static update(id,absence) {
        return axios.put(url+`/${id}`,absence)
    }
}