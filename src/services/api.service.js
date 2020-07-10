import axios from "axios";

const backendBaseUrl = "http://localhost:8080/api";
export const avatarBaseUrl = "https://semantic-ui.com";

class ApiService {

    static insertTeammate(newTeammate) {
        return axios.post(backendBaseUrl + '/teammates/new', newTeammate);
    }

}

export default ApiService
