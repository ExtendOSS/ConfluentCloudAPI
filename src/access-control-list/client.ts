import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient, handleError } from '../utils'
import {
  AclDeleteQueryParams,
  AclSearchQueryParams,
  AclSearchResponse,
  CreateAclRequest,
} from './models'

/**
 * ConfluentAclAPI is a client that interacts with the Confluent Cloud API v3 acl endpoints
 * to create, list, and delete ACLs.
 * @param auth The Confluent Cloud auth string.
 * @param clusterId The Confluent Cloud cluster ID.
 */
export class ConfluentAclClient {
  axios: AxiosInstance

  /**
   * ConfluentAclAPI constructor creates an axios client for the Confluent Cloud API v3 acl endpoints.
   * @param confluentURL The Confluent Cloud API URL.
   * @param auth The Confluent Cloud auth string.
   * @param clusterId The Confluent Cloud cluster ID.
   */
  constructor(confluentURL: string, auth: string, clusterId: string) {
    this.axios = createAxiosClient(`${confluentURL}/kafka/v3/clusters/${clusterId}`, auth)
  }

  /**
   * Batch Create ACLs
   * Creates ACLs.
   * @param data CreateAclRequest
   * @returns AxiosResponse
   */
  async createAcls(data: CreateAclRequest) {
    try {
      return await this.axios.post('/acls', data)
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Batch Create ACLs
   * Creates ACLs.
   * @param data CreateAclRequest[]
   * @returns an array of the created acls
   */
  async batchCreateAcls(data: CreateAclRequest[]) {
    try {
      return await this.axios.post('/acls', { data })
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Search ACLs
   * Returns a list of ACLs.
   * @param params AclSearchQueryParams
   * @returns AxiosResponse<AclSearchResponse> which is an array of acls
   */
  async searchAcls(params: AclSearchQueryParams): Promise<AxiosResponse<AclSearchResponse>> {
    try {
      return await this.axios.get<AclSearchResponse>('/acls', {
        params,
      })
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Delete ACLs by ID
   * @param params AclDeleteQueryParams
   * @returns AxiosResponse which is an empty object
   */
  async deleteAcls(params: AclDeleteQueryParams): Promise<AxiosResponse> {
    try {
      return await this.axios.delete('/acls', { params })
    } catch (e) {
      throw handleError(e)
    }
  }
}
