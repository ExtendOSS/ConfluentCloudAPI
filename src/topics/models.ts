/**
 * url for listing topics
 * @param clusterId The Confluent Cloud cluster ID.
 * @returns string
 */
export const url = (clusterId: string): string => `/kafka/v3/clusters/${clusterId}/topics`

export interface CreateTopicConfigs {
  name: string
  value?: string | null
}

export interface ConfluentCreateTopicRequest {
  topic_name: string
  partitions_count?: number
  replication_factor?: number
  configs?: CreateTopicConfigs[]
}

export interface ConfluentMetadata {
  self: string
  resource_name?: string | null
}

export type ConfluentTopicResponse = {
  kind: string
  metadata: ConfluentMetadata
  topic_name: string
  cluster_id: string
  is_internal: boolean
  replication_factor: number
  partitions_count: number
  partitions: {
    related: string
  }
  configs: {
    related: string
  }
  partition_reassignments: {
    related: string
  }
}

export type ListTopicResponse = {
  kind: string
  metadata: string
  data: ConfluentTopicResponse[]
}

/**
 * Get the url for a topic
 * @param clusterId The Confluent Cloud cluster ID.
 * @param topicName The Confluent Cloud topic name.
 * @returns string
 */
export const getTopicUrl = (clusterId: string, topicName: string): string =>
  `/kafka/v3/clusters/${clusterId}/topics/${topicName}`

export type ConfluentListTopicResponse = ListTopicResponse
export type ConfluentCreateTopicResponse = ConfluentTopicResponse
export type ConfluentGetTopicResponse = ConfluentTopicResponse
export type ConfluentDeleteTopicResponse = string
