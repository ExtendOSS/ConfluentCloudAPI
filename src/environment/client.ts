import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient, handleErrorArray } from '../utils'
import { ConfluentEnvironment, ConfluentEnvironmentListResponse } from './models'

/**
 * Confluent Environment API client for managing Confluent Cloud environments.
 */
export class ConfluentEnvironmentClient {
  readonly axios: AxiosInstance

  /**
   * Create a new instance of the ConfluentEnvironmentAPI client.
   * @param apiKey Confluent Cloud API key.
   */
  constructor(apiKey: string) {
    this.axios = createAxiosClient('https://api.confluent.cloud/org/v2/environments', apiKey)
  }

  /**
   * Create a new Confluent Cloud environment.
   * @param name The name of the environment.
   * @returns A promise that resolves to the created environment.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createEnvironment(name: string): Promise<AxiosResponse<any>> {
    try {
      const payload = {
        display_name: name,
      }
      return await this.axios.post('', payload)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Get details of a specific environment.
   * @param environmentId The ID of the environment.
   * @returns A promise that resolves to the environment details.
   */
  async getEnvironment(environmentId: string): Promise<AxiosResponse> {
    try {
      return await this.axios.get(`/${environmentId}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Delete an environment.
   * @param environmentId The ID of the environment to delete.
   * @returns A promise that resolves when the environment is deleted.
   */
  async deleteEnvironment(environmentId: string): Promise<AxiosResponse> {
    try {
      return await this.axios.delete(`/${environmentId}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * List all environments for the organization.
   * @returns A promise that resolves to the list of environments.
   */
  async listEnvironments(): Promise<AxiosResponse<ConfluentEnvironmentListResponse>> {
    try {
      const environments: ConfluentEnvironment[] = []

      let nextPage: string | null = '' // Initialize nextPage to an empty string or null

      const response = await this.axios.get<ConfluentEnvironmentListResponse>(nextPage)
      environments.push(...response.data.data)
      if (response.data.metadata.next) {
        while (nextPage !== null) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response: any = await this.axios.get(nextPage, {})

          const { data, metadata } = response.data
          environments.push(...data)

          nextPage = metadata.next || null // Set nextPage to the value from metadata.next or null if it doesn't exist
        }
      }
      return {
        data: {
          api_version: response.data.api_version,
          data: environments,
          kind: response.data.kind,
          metadata: { next: undefined },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: response.config,
      }
    } catch (e) {
      throw handleErrorArray(e)
    }
  }
}
