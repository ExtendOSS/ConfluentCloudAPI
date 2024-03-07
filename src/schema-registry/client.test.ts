import { ConfluentSchemaRegistryClient } from './client'

describe('SchemaRegistry', () => {
  let schemaRegistry: ConfluentSchemaRegistryClient

  beforeEach(() => {
    schemaRegistry = new ConfluentSchemaRegistryClient('confluent-auth')
  })

  it('should be able to list schema registries', async () => {
    jest.spyOn(schemaRegistry['axios'], 'get').mockResolvedValueOnce({ data: 'schema' })
    const result = await schemaRegistry.list('1234')
    expect(result).toEqual({ data: 'schema' })
  })

  it('should be able to create schema registries', async () => {
    jest.spyOn(schemaRegistry['axios'], 'post').mockResolvedValueOnce({ data: 'schema' })
    const result = await schemaRegistry.create({
      package: 'ESSENTIALS',
      environment: {
        id: 'cluster-1234',
      },
      region: {
        id: 'us-east-1',
      },
    })
    expect(result).toEqual({ data: 'schema' })
  })

  it('should throw an error if the API call fails', async () => {
    const error = new Error('API error')
    jest.spyOn(schemaRegistry['axios'], 'get').mockRejectedValueOnce(error)
    try {
      await expect(schemaRegistry.list('1234')).rejects.toThrowError(error)
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })

  it('should list schema registries with environmentId', async () => {
    jest.spyOn(schemaRegistry['axios'], 'get').mockResolvedValueOnce({ data: 'schema' })
    const result = await schemaRegistry.list('environment-id')
    expect(result).toEqual({ data: 'schema' })
  })

  it('should list schema registries with environmentId and name', async () => {
    jest.spyOn(schemaRegistry['axios'], 'get').mockResolvedValueOnce({ data: 'schema' })
    const result = await schemaRegistry.list('environment-id', 'name')
    expect(result).toEqual({ data: 'schema' })
  })
})
