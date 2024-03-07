export type SchemaTypes = 'AVRO' | 'JSON' | 'PROTOBUF'

export interface SchemaReference {
  name: string
  subject: string
  version: number
}

export type DeleteType = 'soft' | 'hard'

export interface TopicSchemaConfig {
  schema: string
  schemaType: SchemaTypes
  references?: SchemaReference[]
}

export interface ConfluentTopicSchemaAPIVersionsResponse {
  subject: string
  version: number
}

export interface ConfluentTopicSchemaAPICreateResponse {
  id: number
}

export interface ConfluentTopicSchemaGetResponse {
  schema: string
  id: number
  version: number
  schemaType: string
}

export type ConfluentTopicSchemaDeleteResponse = number[]

export interface ConfluentTopicSchemaAPIValidCompatibilityResponse {
  is_compatible: boolean
  messages: string[]
}

export interface ConfluentTopicSchemaAPISubjectConfigResponse {
  compatibilityLevel: string
}

export type Subject = string
export type Version = string

export interface ConfluentConfig {
  baseUrl: string
  headers: Record<string, string>
}

export interface ConfluentResponse<T> {
  status: number
  data: T
}

/**
 * Response from the schema endpoint
 */
export interface SchemaResponse {
  /**
   * Name of the subject that this schema is registered under
   */
  subject: string
  /**
   * Globally unique identifier of the schema
   */
  id: number
  /**
   * Version of the returned schema
   */
  version: number
  /**
   * The schema format: AVRO is the default (if no schema type is shown on the response, the type is AVRO), PROTOBUF, JSON
   */
  schemaType: string
  /**
   * The schema string
   */
  schema: string
}
export interface Schema {
  schema: string
}

export interface Compatibility {
  compatibility:
    | 'NONE'
    | 'BACKWARD'
    | 'BACKWARD_TRANSITIVE'
    | 'FORWARD'
    | 'FORWARD_TRANSITIVE'
    | 'FULL'
    | 'FULL_TRANSITIVE'
}

export type SubjectVersionPairs = [{ subject: string; version: string }]
