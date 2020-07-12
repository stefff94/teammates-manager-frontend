import axios from "axios";

const backendBaseUrl = "http://localhost:8080/api";

class ApiService {

    static getAllTeammates() {
        return axios.get(backendBaseUrl + "/teammates");
    }

    static deleteTeammate(id) {
        const url = backendBaseUrl + "/teammates/delete/" + id;

        return axios.delete(url);
    }
}

export default ApiService
