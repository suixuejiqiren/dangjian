import axios from 'axios'

var instance = axios.create({
  baseURL: '/crm/',
  timeout: 5000,
  // withCredentials:true
})

export default instance;
