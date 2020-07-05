import axios from "axios";

const backendBaseUrl = "http://localhost:8080/api";

class ApiService {

    static async getAllTeammates() {
        return await axios.get(backendBaseUrl + "/teammates");
    }

    static async deleteTeammate(id) {
        const url = backendBaseUrl + "/teammates/delete/" + id;

        return await axios.delete(url);
    }
}

export default ApiService
