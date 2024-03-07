import axios, { AxiosHeaders, AxiosInstance, HeadersDefaults, RawAxiosRequestHeaders } from 'axios'
import axiosRetry, { exponentialDelay } from 'axios-retry'

/**
 * Create an axios client with retry and exponential backoff.
 * @param baseURL The base URL for the client.
 * @param auth The Confluent Cloud auth string.
 * @param headers The headers to add to the client.
 * @returns AxiosInstance
 */
export const createAxiosClient = (
  baseURL: string,
  auth: string,
  headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>,
): AxiosInstance => {
  const defaultHeaders = headers ? { ...headers } : {}

  const axiosClient = axios.create({
    baseURL,
    headers: {
      ...defaultHeaders,
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    transformResponse: data => {
      try {
        if (typeof data === 'string') {
          return JSON.parse(data)
        }
        return data
      } catch (error) {
        console.log('Error transforming response', error)
        return data
      }
    },
  })

  axiosRetry(axiosClient, {
    onRetry(retryCount, error) {
      console.log(`Attempting Retry. Current count: ${retryCount}, error res ${error.message}`)
    },
    retryDelay: exponentialDelay,
  })

  return axiosClient
}
