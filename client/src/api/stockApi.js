import axios from "axios";
import apiClient from './apiClient';

export const getStockBySymbol = async (symbol) => {
  const response = await apiClient.get(`/api/stocks/${symbol}`);
  return response.data;
};

export const searchStocksByQuery = async (query) => {
  const response = await apiClient.get(`/api/stocks/search/list?q=${query}`);
  return response.data;
};

export const executeBuyOrder = async (ticker, quantity) => {
  const response = await apiClient.post('/api/trades/buy', {
    ticker: ticker,
    quantity: Number(quantity)
  });
  return response.data;
};

export const executeSellOrder = async (ticker, quantity) => {
  const response = await apiClient.post('/api/trades/sell', {
    ticker: ticker,
    quantity: Number(quantity)
  });
  return response.data;
};