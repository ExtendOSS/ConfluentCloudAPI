/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { CfnError } from '../utils/error'
import { ConfluentTopicClient } from './client'
import {
  mockAxiosError,
  mockCreateTopicRequest,
  mockCreateTopicResponse,
  mockListTopicResponse,
} from './topic-mocks'

describe('ConfluentTopicClient', () => {
  let confluentTopicClient: ConfluentTopicClient

  beforeEach(() => {
    confluentTopicClient = new ConfluentTopicClient('test-cluster-id', 'url', 'auth')
  })

  describe('get', () => {
    it('should return topic details', async () => {
      const expectedResponse = { topic: 'test-topic' }
      jest
        .spyOn(confluentTopicClient.axios, 'get')
        .mockResolvedValue({ data: expectedResponse } as any)
      const result = await confluentTopicClient.get('test-topic')
      expect(result.data).toEqual(expectedResponse)
    })

    it('should throw an error if the request fails', async () => {
      try {
        jest.spyOn(confluentTopicClient.axios, 'get').mockRejectedValue(new AxiosError())
        await confluentTopicClient.get('test-topic')
      } catch (e: any) {
        expect(e.name).toEqual('AxiosError')
      }
    })
  })

  describe('create', () => {
    it('should create a new topic', async () => {
      jest
        .spyOn(confluentTopicClient.axios, 'post')
        .mockResolvedValue({ data: mockCreateTopicResponse })
      const result = await confluentTopicClient.create(mockCreateTopicRequest)
      expect(result.data).toEqual(mockCreateTopicResponse)
    })

    it('should throw an error if the request fails', async () => {
      try {
        jest
          .spyOn(confluentTopicClient.axios, 'post')
          .mockRejectedValue(new CfnError(mockAxiosError))
        await confluentTopicClient.create(mockCreateTopicRequest)
      } catch (e: any) {
        expect(e.name).toEqual('AxiosError')
      }
    })
  })

  describe('list', () => {
    it('should return a list of topics', async () => {
      jest.spyOn(confluentTopicClient.axios, 'get').mockResolvedValue(mockListTopicResponse)
      const result = await confluentTopicClient.list()

      expect(result).toEqual(mockListTopicResponse)
    })

    it('should throw an error if the request fails', async () => {
      try {
        jest.spyOn(confluentTopicClient.axios, 'get').mockRejectedValue(new AxiosError())
        await confluentTopicClient.list()
      } catch (e: any) {
        expect(e.name).toEqual('AxiosError')
      }
    })
  })
})
