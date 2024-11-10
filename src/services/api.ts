/* eslint-disable no-console */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173/api/v1';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleSuccess(response: AxiosResponse) {
    return response;
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      console.error('API Error:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }

  // User related API calls
  signUp = (userData: any): Promise<AxiosResponse> => this.api.post('/users/auth/signup', userData);
  getUser = (): Promise<AxiosResponse> => this.api.get('/users');
  updateUser = (userData: any): Promise<AxiosResponse> => this.api.put('/user', userData);

  // Account related API calls
  getAccounts = (): Promise<AxiosResponse> => this.api.get('/accounts');
  getAccount = (accountId: string): Promise<AxiosResponse> =>
    this.api.get(`/accounts/${accountId}`);
  createAccount = (accountData: any): Promise<AxiosResponse> =>
    this.api.post('/accounts', accountData);
  updateAccount = (accountId: string, accountData: any): Promise<AxiosResponse> =>
    this.api.put(`/accounts/${accountId}`, accountData);
  deleteAccount = (accountId: string): Promise<AxiosResponse> =>
    this.api.delete(`/accounts/${accountId}`);

  // Transaction related API calls
  getTransactions = (accountId: string): Promise<AxiosResponse> =>
    this.api.get(`/accounts/${accountId}/transactions`);
  createTransaction = (accountId: string, transactionData: any): Promise<AxiosResponse> =>
    this.api.post(`/accounts/${accountId}/transactions`, transactionData);

  // Transfer funds
  transferFunds = (
    fromAccountId: string,
    toAccountId: string,
    amount: number
  ): Promise<AxiosResponse> => this.api.post('/transfer', { fromAccountId, toAccountId, amount });

  // Get balance
  getBalance = (accountId: string): Promise<AxiosResponse> =>
    this.api.get(`/accounts/${accountId}/balance`);

  // Settings related API calls
  getUserSettings = (): Promise<AxiosResponse> => this.api.get('/user/settings');
  updateUserSettings = (settingsData: any): Promise<AxiosResponse> =>
    this.api.put('/user/settings', settingsData);

  // Methods for dashboard data
  getDashboardOverview = (): Promise<AxiosResponse> => this.api.get('/users/dashboard/overview');
  // getAccountBalanceHistory = (): Promise<AxiosResponse> =>
  //   this.api.get('/dashboard/account-balance-history');
  // getTransactionHistory = (): Promise<AxiosResponse> =>
  //   this.api.get('/dashboard/transaction-history');
  // getDepositsWithdrawalsComparison = (): Promise<AxiosResponse> =>
  //   this.api.get('/dashboard/deposits-withdrawals-comparison');
}

export default new ApiService();
