import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient } from '../utils'
import { handleError } from '../utils/error'
import {
  ConfluentCreateTopicRequest,
  ConfluentCreateTopicResponse,
  ConfluentDeleteTopicResponse,
  ConfluentGetTopicResponse,
  ConfluentListTopicResponse,
} from './models'
/**
 * ConfluentTopicClient is a client for the topic part of confluents V3 api
 * @param clusterId representation of the cluster you are interacting with
 */
export class ConfluentTopicClient {
  axios: AxiosInstance
  clusterId: string
  /**
   * Create a new topic client for a specific cluster
   * @param clusterId representation of the cluster you are interacting with
   * @param confluentUrl string with the confluent url
   * @param auth string with the auth
   */
  constructor(clusterId: string, confluentUrl: string, auth: string) {
    this.clusterId = clusterId
    this.axios = createAxiosClient(`${confluentUrl}/kafka/v3/clusters/${clusterId}/topics`, auth)
  }

  /**
   * Get a topic by id
   * @param topicId  id of the topic to get
   * @returns Promise<AxiosResponse<ConfluentGetTopicResponse>>
   */
  async get(topicId: string): Promise<AxiosResponse<ConfluentGetTopicResponse>> {
    try {
      return await this.axios.get<ConfluentGetTopicResponse>(`/${topicId}`)
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Create a topic
   * @param topicConfig ConfluentCreateTopicRequest with the topic config
   * @returns Promise<AxiosResponse<ConfluentCreateTopicResponse>>
   */
  async create(
    topicConfig: ConfluentCreateTopicRequest,
  ): Promise<AxiosResponse<ConfluentCreateTopicResponse>> {
    try {
      return await this.axios.post<ConfluentCreateTopicResponse>('', {
        ...topicConfig,
      })
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * List all topics
   * @returns Promise<AxiosResponse<ConfluentListTopicResponse>>
   */
  async list(): Promise<AxiosResponse<ConfluentListTopicResponse>> {
    try {
      return await this.axios.get<ConfluentListTopicResponse>('')
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Update a topic's partition count
   * @param topicId id of the topic to update
   * @param partitionCount number of partitions to update to
   * @returns Promise<AxiosResponse<ConfluentGetTopicResponse>>
   */
  async update(
    topicId: string,
    partitionCount: number,
  ): Promise<AxiosResponse<ConfluentGetTopicResponse>> {
    try {
      return await this.axios.patch<ConfluentGetTopicResponse>(`/${topicId}`, {
        partitions_count: partitionCount,
      })
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Delete a topic
   * @param topicId id of the topic to delete
   * @returns Promise<AxiosResponse<ConfluentDeleteTopicResponse>>
   */
  async delete(topicId: string): Promise<AxiosResponse<ConfluentDeleteTopicResponse>> {
    try {
      return await this.axios.delete<ConfluentDeleteTopicResponse>(`/${topicId}`)
    } catch (e) {
      throw handleError(e)
    }
  }
}
