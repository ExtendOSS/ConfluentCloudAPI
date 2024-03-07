/**
 * Represents the desired state of the API Key.
 */
export interface APIKeyCreateReq {
  /**
   * The desired display name for the API key.
   * @example "CI kafka access key"
   */
  display_name?: string
  /**
   * The desired description for the API key.
   * @example "This API key provides Kafka access to cluster x"
   */
  description?: string
  /**
   * The owner to which this API key belongs.
   */
  owner: {
    /**
     * The ID of the owner.
     * @example "u-a83k9b"
     */
    id: string
  }
  /**
   * The resource associated with this API key.
   * It can be one of Kafka Cluster ID, Schema Registry Cluster ID, or ksqlDB Cluster ID.
   * It may be null or omitted if not associated with a resource.
   * For Cloud API keys, the resource should be null.
   */
  resource?: {
    /**
     * The ID of the resource.
     * @example "lkc-12345"
     */
    id: string
    /**
     * The environment of the resource, if it is environment-scoped.
     * @example "env-scoped"
     */
    environment?: string
  }
}

export interface ListApiKeysOptions {
  owner?: string
  resource?: string
  page_size?: number
  page_token?: string
}

/**
 * Represents an API Key.
 */
export interface APIKey {
  /**
   * API version of the resource representation.
   * @example "iam/v2"
   */
  api_version: string
  /**
   * Type of object this REST resource represents.
   * @example "ApiKey"
   */
  kind: string
  /**
   * Natural identifier for the object within its scope/namespace.
   * It is normally unique across time but not space.
   * @example "dlz-f3a90de"
   */
  id: string
  /**
   * Metadata that all persisted resources must have.
   */
  metadata: ApiKeyMetadata
  /**
   * Desired state of the API Key.
   */
  spec: ApiKeySpec
}

/**
 * Metadata for a persisted resource.
 */
export interface ApiKeyMetadata {
  /**
   * URL at which an object can be addressed.
   * This URL encodes the service location, API version, and other particulars necessary to locate the resource at a point in time.
   * @example "https://api.confluent.cloud/iam/v2/api-keys/ak-12345"
   */
  self: string
  /**
   * Uniform Resource Identifier (URI) that is globally unique across space and time.
   
   * It is represented as a Confluent Resource Name.
   * @example "crn://confluent.cloud/organization=9bb441c4-edef-46ac-8a41-c49e44a3fd9a/api-key=ak-12345"
   */
  resource_name: string
  /**
   * Date and time at which this object was created.
   
   * It is represented in RFC3339 format and is in UTC.
   * @example "2006-01-02T15:04:05-07:00"
   */
  created_at: string
  /**
   * Date and time at which this object was last updated.
   
   * It is represented in RFC3339 format and is in UTC.
   * @example "2006-01-02T15:04:05-07:00"
   */
  updated_at: string
  /**
   * Date and time at which this object was (or will be) deleted.
   
   * It is represented in RFC3339 format and is in UTC.
   * @example "2006-01-02T15:04:05-07:00"
   */
  deleted_at: string
}

/**
 * Desired state of the API Key.
 */
export interface ApiKeySpec {
  /**
   * The API key secret. Only provided in create responses, not in get or list.
   * @example "R15hoiDIq8Nxu/lY4mPO3DwAVIfU5W7OI+efsB607mLgHTnVW5XJGVqX2ysDx987"
   */
  secret: string
  /**
   * A human-readable name for the API key.
   * @example "CI kafka access key"
   */
  display_name: string
  /**
   * A human-readable description for the API key.
   * @example "This API key provides Kafka access to cluster x"
   */
  description: string
  /**
   * The owner to which this belongs.
   */
  owner: Owner
  /**
   * The resource associated with this object.
   */
  resource?: Resource | null
}

/**
 * Represents the owner of the API Key.
 */
export interface Owner {
  /**
   * The ID of the owner.
   * @example "u-a83k9b"
   */
  id: string
  /**
   * Related URL for the owner.
   * @example "https://api.confluent.cloud/iam/v2/users/u-a83k9b"
   */
  related: string
  /**
   * Resource name for the owner.
   * @example "https://api.confluent.cloud/user=u-a83k9b"
   */
  resource_name: string
  /**
   * API version of the owner.
   * @example "string"
   */
  api_version: string
  /**
   * Type of object the owner represents.
   * @example "string"
   */
  kind: string
}

/**
 * Represents the resource associated with the API Key.
 */
export interface Resource {
  /**
   * The ID of the resource.
   * @example "lkc-c29js0"
   */
  id: string
  /**
   * The environment of the resource.
   * @example "string"
   */
  environment: string
  /**
   * Related URL for the resource.
   * @example "https://api.confluent.cloud/cmk/v2/clusters/lkc-c29js0"
   */
  related: string
  /**
   * Resource name for the resource.
   * @example "https://api.confluent.cloud/organization=9bb441c4-edef-46ac-8a41-c49e44a3fd9a/environment=env-abc123/cloud-cluster=lkc-c29js0"
   */
  resource_name: string
  /**
   * API version of the resource.
   * @example "string"
   */
  api_version: string
  /**
   * Type of object the resource represents.
   * @example "string"
   */
  kind: string
}

// Example usage
export const mockAPIKey: APIKey = {
  api_version: 'iam/v2',
  kind: 'ApiKey',
  id: 'dlz-f3a90de',
  metadata: {
    self: 'https://api.confluent.cloud/iam/v2/api-keys/ak-12345',
    resource_name:
      'crn://confluent.cloud/organization=9bb441c4-edef-46ac-8a41-c49e44a3fd9a/api-key=ak-12345',
    created_at: '2006-01-02T15:04:05-07:00',
    updated_at: '2006-01-02T15:04:05-07:00',
    deleted_at: '2006-01-02T15:04:05-07:00',
  },
  spec: {
    secret: 'R15hoiDIq8Nxu/lY4mPO3DwAVIfU5W7OI+efsB607mLgHTnVW5XJGVqX2ysDx987',
    display_name: 'CI kafka access key',
    description: 'This API key provides Kafka access to cluster x',
    owner: {
      id: 'u-a83k9b',
      related: 'https://api.confluent.cloud/iam/v2/users/u-a83k9b',
      resource_name: 'https://api.confluent.cloud/user=u-a83k9b',
      api_version: 'string',
      kind: 'string',
    },
    resource: {
      id: 'lkc-c29js0',
      environment: 'string',
      related: 'https://api.confluent.cloud/cmk/v2/clusters/lkc-c29js0',
      resource_name:
        'https://api.confluent.cloud/organization=9bb441c4-edef-46ac-8a41-c49e44a3fd9a/environment=env-abc123/cloud-cluster=lkc-c29js0',
      api_version: 'string',
      kind: 'string',
    },
  },
}

export const mockAPIKeyCreateReq: APIKeyCreateReq = {
  display_name: 'Mock API Key',
  description: 'This is a mock API key',
  owner: {
    id: 'mock-owner-id',
  },
  resource: {
    id: 'mock-resource-id',
    environment: 'mock-environment',
  },
}
