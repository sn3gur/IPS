import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export async function getStockBySymbol(symbol) {
  const response = await api.get(`/stocks/${symbol}`);
  return response.data;
}