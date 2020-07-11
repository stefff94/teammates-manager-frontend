import axios from "axios";

const backendBaseUrl = "http://localhost:8080/api";

class ApiService {

    static insertTeammate(newTeammate) {
        return axios.post(backendBaseUrl + '/teammates/new', newTeammate);
    }

    static updateTeammate(id, teammate) {
        return axios.put(backendBaseUrl + '/teammates/' + id.toString(), teammate);
    }

    static getSkills() {
        return axios.get(backendBaseUrl + '/skills');
    }

}

export default ApiService
