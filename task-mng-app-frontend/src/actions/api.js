import axios from "axios";

const baseUrl = "https://localhost:7090/api/";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.headers.Authorization == null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;  // Return the modified config
}, error => {
    return Promise.reject(error);
});


export default {

    task(url = baseUrl + 'Task/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}



