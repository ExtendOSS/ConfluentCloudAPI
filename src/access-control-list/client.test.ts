import { ConfluentAclClient } from './client'
import {
  AclDeleteQueryParams,
  AclSearchQueryParams,
  CreateAclRequest,
  aclSearchResponseMock,
} from './models'

describe('ConfluentAclClient', () => {
  let aclApi: ConfluentAclClient

  beforeAll(() => {
    aclApi = new ConfluentAclClient('https://api.confluent.cloud', 'bleh', 'id')
  })

  it('should search for acls based on params', async () => {
    jest.spyOn(aclApi.axios, 'get').mockResolvedValueOnce(aclSearchResponseMock)
    const params: AclSearchQueryParams = {
      resource_type: 'TOPIC',
      resource_name: 'test',
    }
    const cluster = await aclApi.searchAcls(params)
    expect(cluster).toBe(aclSearchResponseMock)
  })

  it('should delete acls based on params', async () => {
    const deleteSpy = jest.spyOn(aclApi.axios, 'delete').mockResolvedValueOnce('')
    const params: AclDeleteQueryParams = {
      resource_type: 'TOPIC',
      pattern_type: 'LITERAL',
      operation: 'READ',
      permission: 'ALLOW',
    }
    await aclApi.deleteAcls(params)
    expect(deleteSpy).toBeCalledTimes(1)
  })

  it('should create acls based on create request input', async () => {
    jest.spyOn(aclApi.axios, 'post').mockResolvedValueOnce({ status: 201 })
    const params: CreateAclRequest = {
      resource_type: 'TOPIC',
      resource_name: 'test',
      pattern_type: 'LITERAL',
      principal: 'User:Bob',
      host: 'jupiter',
      operation: 'READ',
      permission: 'ALLOW',
    }
    const cluster = await aclApi.createAcls(params)
    expect(cluster.status).toBe(201)
  })

  it('should create acls based on batch create request input', async () => {
    jest.spyOn(aclApi.axios, 'post').mockResolvedValueOnce({ status: 201 })
    const params: CreateAclRequest[] = [
      {
        resource_type: 'TOPIC',
        resource_name: 'test',
        pattern_type: 'LITERAL',
        principal: 'User:Bob',
        host: 'jupiter',
        operation: 'READ',
        permission: 'ALLOW',
      },
      {
        resource_type: 'TOPIC',
        resource_name: 'test',
        pattern_type: 'LITERAL',
        principal: 'User:Bob',
        host: 'jupiter',
        operation: 'READ',
        permission: 'ALLOW',
      },
    ]
    const cluster = await aclApi.batchCreateAcls(params)
    expect(cluster.status).toBe(201)
  })
})
