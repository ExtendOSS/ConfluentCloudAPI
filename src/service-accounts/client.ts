// Service accounts client class

import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient, handleErrorArray } from '../utils'
import { ServiceAccount, ServiceAccountCreateRequest } from './models'

/**
 * ConfluentServiceAccount is a client for the service accounts part of confluents V2 api
 * https://docs.confluent.io/platform/current/cloud/service-accounts/api.html
 * https://api.confluent.cloud/iam/v2/service-accounts
 */
export class ConfluentServiceAccountClient {
  readonly axios: AxiosInstance

  /**
   * Create a new service account client
   * @param auth string of the auth token
   * @returns A new instance of the ConfluentServiceAccount client.
   */
  constructor(auth: string) {
    this.axios = createAxiosClient('https://api.confluent.cloud/iam/v2/service-accounts', auth)
  }
  /**
   * List all service accounts
   * @returns AxiosResponse<ServiceAccount[]> A list of service accounts
   */
  async list(): Promise<AxiosResponse<ServiceAccount[]>> {
    try {
      return await this.axios.get<ServiceAccount[]>('')
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Create a new service account
   * @param data The service account create request
   * @returns AxiosResponse<ServiceAccount> The created service account
   */
  async create(data: ServiceAccountCreateRequest): Promise<AxiosResponse<ServiceAccount>> {
    try {
      return await this.axios.post<ServiceAccount>('', { spec: data })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Delete a service account
   * @param id The service account id
   * @returns AxiosResponse The response from the API
   */
  async delete(id: string): Promise<AxiosResponse> {
    try {
      return await this.axios.delete(`/${id}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Get a service account
   * @param id The service account id
   * @returns AxiosResponse<ServiceAccount> The service account
   */
  async get(id: string): Promise<AxiosResponse<ServiceAccount>> {
    try {
      return await this.axios.get<ServiceAccount>(`/${id}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Update a service account
   * @param id The service account id
   * @param description The new description
   * @returns AxiosResponse<ServiceAccount> The updated service account
   */
  async update(id: string, description: string): Promise<AxiosResponse<ServiceAccount>> {
    try {
      return await this.axios.patch<ServiceAccount>(`/${id}`, { description })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }
}
