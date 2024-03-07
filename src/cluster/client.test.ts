import { ConfluentClusterClient } from './client'
import { clusterMock } from './models'

describe('ConfluentClusterClient', () => {
  const clusterAPI = new ConfluentClusterClient('https://api.confluent.cloud', 'bleh')
  const mockId = 'mockId'

  it('should return the cluster', async () => {
    jest.spyOn(clusterAPI.axios, 'get').mockResolvedValueOnce(clusterMock)

    const cluster = await clusterAPI.get(mockId)
    expect(cluster).toHaveProperty('id')
  })
})
