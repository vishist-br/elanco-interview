import axios, { AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://engineering-task.elancoapps.com/api', // Replace with your API base URL
});

export async function sendRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while making the API request.');
  }
}