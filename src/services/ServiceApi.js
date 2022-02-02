import axios from "axios";
import urlApi from './urlApi.js'

const url = urlApi.data().urlGet+"/service"

export default class ServiceApi {

    static gettAll() {
        return axios.get(url+"/all")
    }

    static find(id) {
        return axios.get(url+`/${id}`)
    }

    static deleteCli(id) {
        return axios.delete(url+`/${id}`)
    }

    static add(service) {
        return axios.post(url+service)
    }

    static update(id,service) {
        return axios.put(url+`/${id}`,service)
    }
}