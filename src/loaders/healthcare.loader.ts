import type { LoaderFunction } from "react-router";
import { axiosInstance } from "../config/axios.config";

export const loadHealthcares : LoaderFunction = async (args) => {
  const res = await axiosInstance.get('/health-records')
  return res.data.healthcares
}
