import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient, handleErrorArray } from '../utils'
import {
  ConfluentClusterListQueryParams,
  ConfluentClusterListResponse,
  ConfluentClusterResponse,
  ConfluentClusterSpec,
  ConfluentClusterUpdateRequest,
} from './models'

/**
 * ConfluentClusterAPI is a client that interacts with the Confluent Cloud API v3 cluster endpoints
 * to list and describe clusters.
 * @param confluentURL The Confluent Cloud URL.
 * @param auth The Confluent Cloud auth string.
 * @param clusterId The Confluent Cloud cluster ID.
 */
export class ConfluentClusterClient {
  axios: AxiosInstance

  /**
   * ConfluentClusterAPI constructor creates an axios client for the Confluent Cloud API v3 cluster endpoints.
   * @param confluentURL The Confluent Cloud URL.
   * @param auth The Confluent Cloud auth string.
   * @param clusterId The Confluent Cloud cluster ID.
   */
  constructor(confluentURL: string, auth: string) {
    this.axios = createAxiosClient(`${confluentURL}/cmk/v2/clusters`, auth)
  }

  /**
   * Creates a confluent cluster.
   * @param spec ConfluentClusterSpec The cluster spec for creating a cluster
   * @returns AxiosResponse The created cluster
   */
  async create(spec: ConfluentClusterSpec): Promise<AxiosResponse<ConfluentClusterResponse>> {
    try {
      return await this.axios.post('/', { spec })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * List Clusters
   * Returns a list of clusters.
   * @param params
   * @returns AxiosResponse The list of clusters
   */
  async list(
    params: ConfluentClusterListQueryParams,
  ): Promise<AxiosResponse<ConfluentClusterListResponse>> {
    try {
      return await this.axios.get('', { params })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * updates the cluster
   * @param spec The cluster spec for updating a cluster
   * @returns AxiosResponse with The updated cluster
   */
  async update(
    spec: ConfluentClusterUpdateRequest,
  ): Promise<AxiosResponse<ConfluentClusterResponse>> {
    try {
      return await this.axios.patch('/', { spec })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Get Cluster
   * Returns a cluster.
   * @param clusterId
   * @returns AxiosResponse The cluster
   */
  async get(clusterId: string): Promise<AxiosResponse<ConfluentClusterResponse>> {
    try {
      return await this.axios.get(`/${clusterId}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * deletes the cluster
   * @param clusterId The cluster ID
   * @returns AxiosResponse
   */
  async delete(clusterId: string): Promise<AxiosResponse> {
    try {
      return await this.axios.delete(`/${clusterId}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }
}
