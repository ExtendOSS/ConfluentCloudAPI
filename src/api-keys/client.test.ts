import { ConfluentApiKeyClient } from './client'
import { mockAPIKeyCreateReq } from './models'

describe('ConfluentApiKeyClient', () => {
  let apiKeyAPI: ConfluentApiKeyClient

  beforeEach(() => {
    apiKeyAPI = new ConfluentApiKeyClient('apiKey')
  })

  describe('createApiKey', () => {
    it('should create a new API key', async () => {
      const response = {
        data: {
          success: 'ok',
        },
      }

      jest.spyOn(apiKeyAPI.axios, 'post').mockResolvedValue(response)

      const result = await apiKeyAPI.createApiKey(mockAPIKeyCreateReq)

      expect(apiKeyAPI.axios['post']).toHaveBeenCalledWith('', mockAPIKeyCreateReq)
      expect(result).toEqual(response)
    })
  })

  describe('getApiKey', () => {
    it('should get details of a specific API key', async () => {
      const apiKeyId = 'test-api-key-id'
      const response = {
        data: { key: 'test-key' },
      }

      jest.spyOn(apiKeyAPI.axios, 'get').mockResolvedValue(response)

      const result = await apiKeyAPI.getApiKey(apiKeyId)

      expect(apiKeyAPI.axios['get']).toHaveBeenCalledWith(`/${apiKeyId}`)
      expect(result).toEqual(response)
    })
  })

  describe('deleteApiKey', () => {
    it('should delete an API key', async () => {
      const apiKeyId = 'test-api-key-id'
      const response = {}

      jest.spyOn(apiKeyAPI.axios, 'delete').mockResolvedValue(response)

      const result = await apiKeyAPI.deleteApiKey(apiKeyId)

      expect(apiKeyAPI.axios['delete']).toHaveBeenCalledWith(`/${apiKeyId}`)
      expect(result).toEqual(response)
    })
  })

  describe('listApiKeys', () => {
    it('should list all API keys for the organization', async () => {
      const options = {
        owner: 'test-owner',
        resource: 'test-resource',
        page_size: 10,
        page_token: 'test-page-token',
      }
      const response = {
        data: { keys: [] },
      }

      jest.spyOn(apiKeyAPI.axios, 'get').mockResolvedValue(response)

      const result = await apiKeyAPI.listApiKeys(options)

      const params = {
        spec: { owner: 'test-owner', resource: 'test-resource' },
        page_size: 10,
        page_token: 'test-page-token',
      }
      expect(apiKeyAPI.axios['get']).toHaveBeenCalledWith('', { params })
      expect(result).toEqual(response)
    })

    it('should list all API keys for the organization without options', async () => {
      const response = {
        data: { keys: [] },
      }

      jest.spyOn(apiKeyAPI.axios, 'get').mockResolvedValue(response)

      const result = await apiKeyAPI.listApiKeys()

      expect(apiKeyAPI.axios['get']).toHaveBeenCalledWith('', {
        params: {
          page_size: undefined,
          page_token: undefined,
          spec: {
            owner: undefined,
            resource: undefined,
          },
        },
      })
      expect(result).toEqual(response)
    })
  })
})
