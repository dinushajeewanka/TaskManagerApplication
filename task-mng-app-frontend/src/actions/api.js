import axios from "axios";

const baseUrl = "https://localhost:7090/api/";
// const loginUrl = baseUrl + 'login/';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaW51c2hhIiwianRpIjoiOWMwYTkxZWItYjRiOC00ZjdjLWIzZmYtZDE0ZDY2Njg3YTBhIiwibmFtZWlkIjoiNCIsIm5iZiI6MTY5NTg4OTAzNCwiZXhwIjoxNjk2NDkzODM0LCJpYXQiOjE2OTU4ODkwMzR9.xsHllwd9gz3mfASkKUk5VTEKB5v4hFwlfjAr6_Z9O_U'

export default {

    task(url = baseUrl + 'Task/') {
        return {
            fetchAll: () => axios.get(url, {headers: {Authorization: `Bearer ${token}`}}),
            fetchById: id => axios.get(url + id, {headers: {Authorization: `Bearer ${token}`}}),
            create: newRecord => axios.post(url, newRecord, {headers: {Authorization: `Bearer ${token}`}}),
            update: (id, updateRecord) => axios.put(url + id, updateRecord, {headers: {Authorization: `Bearer ${token}`}}),
            delete: id => axios.delete(url + id, {headers: {Authorization: `Bearer ${token}`}})
            // userLogin: (credentials) => axios.post(loginUrl, credentials)
        }
    }
}



