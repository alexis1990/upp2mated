import axios from "axios";

axios.defaults.baseURL = 'https://upp2mated-backend.herokuapp.com/';
// axios config
axios.interceptors.request.use((request) => {
	console.log('kokokokkkook')
	const token = sessionStorage.getItem('token');
	request.headers['Authorization'] = `Bearer ${token}`;
	return request;
}, (error) => {
	return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
	return response.data;
}, (error) => {
	return Promise.reject(error);
});

// axios.defaults.baseURL = requestBaseURL;
// axios.interceptors.response.use(res => res.data);

export default axios;
