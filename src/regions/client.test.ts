// The tests for the region client.

import { ConfluentRegionClient } from './client'
import { mockRegionData } from './models'

describe('Test the region api', () => {
  it('should list regions', async () => {
    const regionClient = new ConfluentRegionClient('auth')
    jest.spyOn(regionClient.axios, 'get').mockResolvedValueOnce({ data: [mockRegionData] })
    const regions = await regionClient.list()
    expect(regions).toBeDefined()
  })
  it('should get a region', async () => {
    const regionClient = new ConfluentRegionClient('auth')
    jest.spyOn(regionClient.axios, 'get').mockResolvedValueOnce({ mockRegionData })
    const region = await regionClient.read('a23')
    expect(region).toBeDefined()
  })
})
