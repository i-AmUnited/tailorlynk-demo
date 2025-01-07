import Axios from "axios";
import { base_url, api_header } from "../constants";

export const apiClient = Axios.create(
    {
        baseURL: base_url,
        headers: api_header,
    }
)
