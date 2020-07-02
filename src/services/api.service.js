import axios from "axios";

const backendBaseUrl = "http://localhost:8080/api";

class ApiService {

    static async getAllTeammates() {
        return await axios.get(backendBaseUrl + "/teammates");
    }
}

export default ApiService
