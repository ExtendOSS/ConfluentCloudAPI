import { ConfluentEnvironmentClient } from './client'

describe('ConfluentEnvironmentClient', () => {
  let confluentEnvAPI: ConfluentEnvironmentClient

  beforeEach(() => {
    confluentEnvAPI = new ConfluentEnvironmentClient('apiKey')
  })

  describe('createEnvironment', () => {
    it('should create a new environment', async () => {
      const environmentName = 'Test Environment'
      const cloudProvider = 'aws'

      const response = {
        data: {
          id: '123',
          type: 'environment',
          attributes: {
            name: environmentName,
            cloud_provider: cloudProvider,
          },
        },
      }
      jest.spyOn(confluentEnvAPI.axios, 'post').mockResolvedValue(response)
      const result = await confluentEnvAPI.createEnvironment(environmentName)
      expect(result).toEqual(response)
    })
  })

  describe('getEnvironment', () => {
    it('should get details of a specific environment', async () => {
      const environmentId = '123'

      const response = {
        data: {
          id: environmentId,
          type: 'environment',
          attributes: {
            name: 'Test Environment',
            cloud_provider: 'aws',
          },
        },
      }

      const spy = jest.spyOn(confluentEnvAPI.axios, 'get').mockResolvedValueOnce(response)
      const result = await confluentEnvAPI.getEnvironment(environmentId)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`/${environmentId}`)
      expect(result).toEqual(response)
    })
  })

  describe('deleteEnvironment', () => {
    it('should delete an environment', async () => {
      const environmentId = '123'

      const response = {
        status: 204,
        statusText: 'No Content',
      }
      const spy = jest.spyOn(confluentEnvAPI.axios, 'delete').mockResolvedValueOnce(response)

      const result = await confluentEnvAPI.deleteEnvironment(environmentId)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`/${environmentId}`)
      expect(result).toEqual(response)
    })
  })

  describe('listEnvironments', () => {
    it('should list all environments for the organization', async () => {
      const response = {
        data: {
          metadata: {
            next: undefined,
          },
          data: [
            {
              id: '123',
              type: 'environment',
              attributes: {
                name: 'Test Environment 1',
                cloud_provider: 'aws',
              },
            },
            {
              id: '456',
              type: 'environment',
              attributes: {
                name: 'Test Environment 2',
                cloud_provider: 'gcp',
              },
            },
          ],
        },
      }

      const spy = jest.spyOn(confluentEnvAPI.axios, 'get').mockResolvedValueOnce(response)
      const result = await confluentEnvAPI.listEnvironments()
      expect(spy).toHaveBeenCalledTimes(1)
      expect(result.status).toEqual(200)
    })
  })
})
