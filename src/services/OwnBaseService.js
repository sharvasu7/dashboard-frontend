import axios from "axios";
import appConfig from "configs/app.config";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "constants/api.constant";
import { PERSIST_STORE_NAME } from "constants/app.constant";
import deepParseJson from "utils/deepParseJson";
import store from "../store";
import { onSignOutSuccess } from "../store/auth/sessionSlice";

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: "https://dashboard-test-backend.herokuapp.com",
});

export default BaseService;
