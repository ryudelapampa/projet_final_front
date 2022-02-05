import axios from "axios";
import urlApi from './urlApi.js'

const url = urlApi.data().urlGet+"/collaborateur"

export default class CollaborateurApi {

    static gettAll() {
        return axios.get(url+"/all")
    }

    static find(id) {
        return axios.get(url+`/${id}`)
    }

    static deleteCli(id) {
        return axios.delete(url+`/${id}`)
    }

    static add(collaborateur) {
        return axios.post(url+collaborateur)
    }

    static update(id,collaborateur) {
        return axios.put(url+`/${id}`,collaborateur)
    }

}