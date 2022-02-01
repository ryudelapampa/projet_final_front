import axios from "axios";

const url ='http://localhost:8590/api/jourferie'

export default class JourFerieApi {
    static gettAll() {
        return axios.get(url+"/all")
    }

    static find(id) {
        return axios.get(url+`/${id}`)
    }

    static deleteCli(id) {
        return axios.delete(url+`/${id}`)
    }

    static add(jourferie) {
        return axios.post(jourferie)
    }

    static update(id,jourferie) {
        return axios.put(url+`/${id}`,jourferie)
    }
}