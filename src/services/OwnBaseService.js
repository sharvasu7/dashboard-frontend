import axios from "axios";



const BaseService = axios.create({
  timeout: 60000,
  baseURL: "https://dashboard-test-backend.herokuapp.com",
});

export default BaseService;
