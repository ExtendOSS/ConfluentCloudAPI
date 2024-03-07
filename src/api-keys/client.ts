import { AxiosHeaders, AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient, handleErrorArray } from '../utils'
import { APIKey, APIKeyCreateReq, ListApiKeysOptions } from './models'

/**
 * Confluent API Key API client for managing Confluent Cloud API keys.
 */
export class ConfluentApiKeyClient {
  readonly axios: AxiosInstance

  /**
   * Create a new instance of the ConfluentApiKeyAPI client.
   * @param auth Confluent Cloud auth header string
   * @param headers Optional additional headers to include in all requests
   * @returns A new instance of the ConfluentApiKeyAPI client.
   */
  constructor(auth: string, headers?: AxiosHeaders) {
    this.axios = createAxiosClient('https://api.confluent.cloud/iam/v2/api-keys', auth, headers)
  }

  /**
   * Create a new Confluent Cloud API key.
   * @param data APIKeyCreateReq
   * @returns ApiKey
   */
  async createApiKey(data: APIKeyCreateReq): Promise<AxiosResponse<APIKey>> {
    try {
      return await this.axios.post<APIKey>('', data)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Get details of a specific API key.
   * @param apiKeyId The ID of the API key.
   * @returns A promise that resolves to the API key details.
   */
  async getApiKey(apiKeyId: string): Promise<AxiosResponse<APIKey>> {
    try {
      return await this.axios.get<APIKey>(`/${apiKeyId}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Delete an API key.
   * @param apiKeyId The ID of the API key to delete.
   * @returns A promise that resolves when the API key is deleted.
   */
  async deleteApiKey(apiKeyId: string): Promise<AxiosResponse> {
    try {
      return await this.axios.delete(`/${apiKeyId}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * List all API keys for the organization.
   * @param options Optional parameters to filter the list of API keys.
   * @returns A promise that resolves to the list of API keys.
   */
  async listApiKeys(options?: ListApiKeysOptions): Promise<AxiosResponse<APIKey[]>> {
    try {
      const { owner, resource, page_size, page_token } = options || {}
      const params = {
        spec: {
          owner,
          resource,
        },
        page_size,
        page_token,
      }
      return await this.axios.get('', { params })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * List all API keys for the organization.
   * @param display_name The display name of the API key.
   * @param description The description of the API key.
   * @returns A promise that resolves to the list of API keys.
   */
  async updateApiKey(display_name: string, description: string): Promise<AxiosResponse> {
    try {
      return await this.axios.patch('', {
        spec: {
          display_name,
          description,
        },
      })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }
}
