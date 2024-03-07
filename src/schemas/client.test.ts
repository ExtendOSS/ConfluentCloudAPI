import { ConfluentSchemaClient } from './client'

describe('ConfluentSchemaClient', () => {
  let schemaClient: ConfluentSchemaClient

  beforeEach(() => {
    schemaClient = new ConfluentSchemaClient('confluent-url', 'confluent-auth')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getSchemaById', () => {
    it('should return the schema data when subject is not provided', async () => {
      const schemaId = '123'
      const expectedSchema = { id: '123', name: 'schema' }
      const axiosSpy = jest
        .spyOn(schemaClient['axios'], 'get')
        .mockResolvedValueOnce({ data: expectedSchema })

      const result = await schemaClient.getSchemaById(schemaId)

      expect(axiosSpy).toHaveBeenCalledWith(`/schemas/ids/${schemaId}`)
      expect(result).toEqual(expectedSchema)
    })

    it('should return the schema data when subject is provided', async () => {
      const schemaId = '123'
      const subject = 'subject1'
      const expectedSchema = { id: '123', name: 'schema' }
      const axiosSpy = jest
        .spyOn(schemaClient['axios'], 'get')
        .mockResolvedValueOnce({ data: expectedSchema })

      const result = await schemaClient.getSchemaById(schemaId, subject)

      expect(axiosSpy).toHaveBeenCalledWith(`/schemas/ids/${schemaId}?subject=${subject}`)
      expect(result).toEqual(expectedSchema)
    })

    it('should throw an error if the API call fails', async () => {
      const schemaId = '123'
      const error = new Error('API error')
      const axiosSpy = jest.spyOn(schemaClient['axios'], 'get').mockRejectedValueOnce(error)

      await expect(schemaClient.getSchemaById(schemaId)).rejects.toThrowError(error)
      expect(axiosSpy).toHaveBeenCalledWith(`/schemas/ids/${schemaId}`)
    })
  })

  describe('getSchemaStringById', () => {
    it('should return the schema string when subject is not provided', async () => {
      const schemaId = '123'
      const expectedSchemaString = 'schema'
      const axiosSpy = jest
        .spyOn(schemaClient['axios'], 'get')
        .mockResolvedValueOnce({ data: expectedSchemaString })

      const result = await schemaClient.getSchemaStringById(schemaId)

      expect(axiosSpy).toHaveBeenCalledWith(`/schemas/ids/${schemaId}/schema`)
      expect(result).toEqual(expectedSchemaString)
    })

    it('should return the schema string when subject is provided', async () => {
      const schemaId = '123'
      const subject = 'subject1'
      const expectedSchemaString = 'schema'
      const axiosSpy = jest
        .spyOn(schemaClient['axios'], 'get')
        .mockResolvedValueOnce({ data: expectedSchemaString })

      const result = await schemaClient.getSchemaStringById(schemaId, subject)

      expect(axiosSpy).toHaveBeenCalledWith(`/schemas/ids/${schemaId}/schema?subject=${subject}`)
      expect(result).toEqual(expectedSchemaString)
    })

    it('should throw an error if the API call fails', async () => {
      const schemaId = '123'
      const error = new Error('API error')
      const axiosSpy = jest.spyOn(schemaClient['axios'], 'get').mockRejectedValueOnce(error)

      await expect(schemaClient.getSchemaStringById(schemaId)).rejects.toThrowError(error)
      expect(axiosSpy).toHaveBeenCalledWith(`/schemas/ids/${schemaId}/schema`)
    })
  })
})
