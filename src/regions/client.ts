import { AxiosInstance, AxiosResponse } from 'axios'
import { createAxiosClient, handleErrorArray } from '../utils'
import { ConfluentRegionQueryParams, Region } from './models'

// Create the region client class just like my other client classes with axios

/**
 * ConfluentRegionClient is a client for the region part of confluents V3 api
 */
export class ConfluentRegionClient {
  readonly axios: AxiosInstance

  /**
   * Create a new region client
   * @param auth The Confluent Cloud auth string.
   */
  constructor(auth: string) {
    this.axios = createAxiosClient('https://api.confluent.cloud/srcm/v2/regions', auth)
  }

  /**
   * List all regions
   * @param queryParams The query params to filter the regions
   * @returns AxiosResponse<Region[]> A list of regions
   * @example
   * ```typescript
   * const regions = await client.regions.list()
   * ```
   */
  async list(queryParams?: ConfluentRegionQueryParams): Promise<AxiosResponse<Region[]>> {
    try {
      return await this.axios.get<Region[]>('', {
        params: queryParams,
      })
    } catch (e) {
      throw handleErrorArray(e)
    }
  }

  /**
   * Read a region by id
   * @param regionId The region id
   * @returns Region The region
   */
  async read(regionId: string): Promise<AxiosResponse<Region>> {
    try {
      return await this.axios.get<Region>(`/${regionId}`)
    } catch (e) {
      throw handleErrorArray(e)
    }
  }
}
