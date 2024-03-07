import { AxiosError } from 'axios'
import { ConfluentErrorResponse } from '../utils/error'
import {
  ConfluentCreateTopicRequest,
  ConfluentCreateTopicResponse,
  ConfluentDeleteTopicResponse,
  ConfluentGetTopicResponse,
  ConfluentListTopicResponse,
} from './models'

export const mockCreateTopicResponse: ConfluentCreateTopicResponse = {
  kind: 'KafkaTopic',
  metadata: {
    self: 'mock-url',
  },
  topic_name: 'mock-topic',
  cluster_id: 'mock-cluster',
  is_internal: false,
  replication_factor: 3,
  partitions_count: 6,
  partitions: {
    related: 'mock-url',
  },
  configs: {
    related: 'mock-url',
  },
  partition_reassignments: {
    related: 'mock-url',
  },
}

export const mockDeleteTopicResponse: ConfluentDeleteTopicResponse = 'mock-success-message'

export const mockGetTopicResponse: ConfluentGetTopicResponse = {
  kind: 'KafkaTopic',
  metadata: {
    self: 'mock-url',
  },
  topic_name: 'mock-topic',
  cluster_id: 'mock-cluster',
  is_internal: false,
  replication_factor: 3,
  partitions_count: 6,
  partitions: {
    related: 'mock-url',
  },
  configs: {
    related: 'mock-url',
  },
  partition_reassignments: {
    related: 'mock-url',
  },
}

export const mockListTopicResponse: ConfluentListTopicResponse = {
  kind: 'KafkaTopicsList',
  metadata: 'mock-metadata',
  data: [
    {
      kind: 'KafkaTopic',
      metadata: {
        self: 'mock-url-1',
      },
      topic_name: 'mock-topic-1',
      cluster_id: 'mock-cluster',
      is_internal: false,
      replication_factor: 3,
      partitions_count: 6,
      partitions: {
        related: 'mock-url',
      },
      configs: {
        related: 'mock-url',
      },
      partition_reassignments: {
        related: 'mock-url',
      },
    },
    {
      kind: 'KafkaTopic',
      metadata: {
        self: 'mock-url-2',
      },
      topic_name: 'mock-topic-2',
      cluster_id: 'mock-cluster',
      is_internal: false,
      replication_factor: 3,
      partitions_count: 6,
      partitions: {
        related: 'mock-url',
      },
      configs: {
        related: 'mock-url',
      },
      partition_reassignments: {
        related: 'mock-url',
      },
    },
  ],
}

export const mockCreateTopicRequest: ConfluentCreateTopicRequest = {
  topic_name: 'mock-topic',
  partitions_count: 3,
  replication_factor: 3,
  configs: [
    {
      name: 'mock-config-1',
      value: 'mock-value-1',
    },
    {
      name: 'mock-config-2',
      value: 'mock-value-2',
    },
  ],
}

export const mockAxiosError: AxiosError<ConfluentErrorResponse> = {
  response: {
    config: {},
    headers: {},
    data: {
      message: 'mock message',
      error_code: 123,
      id: 'mock id',
      code: 'mock code',
      title: 'mock title',
      detail: 'mock detail',
    },
    status: 400,
    statusText: 'Bad Request',
  },
  name: 'AxiosError',
  message: 'Request failed with status code 400',
  stack: 'mock stack trace',
} as AxiosError<ConfluentErrorResponse>
