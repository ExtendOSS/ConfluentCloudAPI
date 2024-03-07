import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient, handleError } from '../utils'
import {
  ConfluentSchemaRegistryAPIResponse,
  ConfluentSchemaRegistryListAPIResponse,
  CreateSchemaRegistryClusterSpec,
} from './models'

/**
 * The Schema Registry client is used for listing and creating the actual schema clusters
 *
 */
export class ConfluentSchemaRegistryClient {
  private readonly axios: AxiosInstance
  readonly schemaRegistryName = 'account schema-registry'

  /**
   * The Schema Registry client is used for listing and creating the actual schema clusters
   * @param confluentAuth string of an OAuth Token
   */
  constructor(confluentAuth: string) {
    this.axios = createAxiosClient('https://api.confluent.cloud/srcm/v2/clusters', confluentAuth)
  }

  /**
   * Create a new Schema Registry cluster
   * @param data CreateSchemaRegistryClusterSpec
   * @returns AxiosResponse<any> The response from the API schema registry
   */
  async create(
    data: CreateSchemaRegistryClusterSpec,
  ): Promise<AxiosResponse<ConfluentSchemaRegistryAPIResponse>> {
    try {
      return await this.axios.post('', { spec: data })
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * List all Schema Registry clusters
   * @param environmentId The environment ID
   * @param name The name of the Schema Registry cluster
   * @returns AxiosResponse<ConfluentSchemaRegistryListAPIResponse> list of Schema Registry clusters
   */
  async list(
    environmentId: string,
    name?: string,
  ): Promise<AxiosResponse<ConfluentSchemaRegistryListAPIResponse>> {
    try {
      return await this.axios.get('', {
        params: {
          environment: environmentId,
          name,
        },
      })
    } catch (e) {
      throw handleError(e)
    }
  }
}
