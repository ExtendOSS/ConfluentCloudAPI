/**
 * Represents a single ACL request data object.
 */
export interface CreateAclRequest {
  /**
   * The type of the ACL resource.
   */
  resource_type: AclResourceType
  /**
   * The name of the ACL resource.
   */
  resource_name: string
  /**
   * The pattern type of the ACL resource.
   */
  pattern_type: AclPatternType
  /**
   * The principal associated with the ACL.
   */
  principal: string
  /**
   * The host associated with the ACL.
   */
  host: string
  /**
   * The operation allowed or denied by the ACL.
   */
  operation: AclOperation
  /**
   * The permission granted or denied by the ACL.
   */
  permission: AclPermission
}

/**
 * Enum representing the allowed ACL resource types.
 */
export type AclResourceType =
  | 'UNKNOWN'
  | 'ANY'
  | 'TOPIC'
  | 'GROUP'
  | 'CLUSTER'
  | 'TRANSACTIONAL_ID'
  | 'DELEGATION_TOKEN'

/**
 * Enum representing the allowed ACL pattern types.
 */
export type AclPatternType = 'UNKNOWN' | 'ANY' | 'MATCH' | 'LITERAL' | 'PREFIXED'

/**
 * Enum representing the allowed ACL operations.
 */
export type AclOperation =
  | 'UNKNOWN'
  | 'ANY'
  | 'ALL'
  | 'READ'
  | 'WRITE'
  | 'CREATE'
  | 'DELETE'
  | 'ALTER'
  | 'DESCRIBE'
  | 'CLUSTER_ACTION'
  | 'DESCRIBE_CONFIGS'
  | 'ALTER_CONFIGS'
  | 'IDEMPOTENT_WRITE'

/**
 * Enum representing the allowed ACL permissions.
 */
export type AclPermission = 'UNKNOWN' | 'ANY' | 'DENY' | 'ALLOW'

/**
 * Represents an ACL request.
 */
export interface AclRequest {
  /**
   * An array of ACL request data objects.
   */
  data: CreateAclRequest[]
}

export interface AclSearchQueryParams {
  /**
   * Enum representing the allowed ACL resource types.
   */
  resource_type?: AclResourceType
  /**
   * The name of the ACL resource.
   */
  resource_name?: string
  /**
   * Enum representing the allowed ACL pattern types.
   */
  pattern_type?: AclPatternType
  /**
   * The principal associated with the ACL.
   */
  principal?: string
  /**
   * The host associated with the ACL.
   */
  host?: string
  /**
   * Enum representing the allowed ACL operations.
   */
  operation?: AclOperation
  /**
   * Enum representing the allowed ACL permissions.
   */
  permission?: AclPermission
}

export interface AclSearchResponse {
  /**
   * The kind of the ACL response.
   */
  kind: string
  /**
   * Metadata associated with the ACL response.
   */
  metadata: {
    /**
     * The self URL of the ACL response.
     */
    self: string
    /**
     * The next URL of the ACL response, or null if there is no next page.
     */
    next: string | null
  }
  /**
   * The array of ACL data.
   */
  data: AclResponse[]
}

/**
 * Represents the ACL data in the Confluent Cloud ACL response.
 */
export interface AclResponse {
  /**
   * The kind of the ACL data.
   */
  kind: string
  /**
   * Metadata associated with the ACL data.
   */
  metadata: ResourceMetadata
  /**
   * The principal associated with the ACL data.
   */
  principal: string
  /**
   * The host associated with the ACL data.
   */
  host: string
  /**
   * The operation associated with the ACL data.
   */
  operation: AclOperation
  /**
   * The permission associated with the ACL data.
   */
  permission: AclPermission
}

/**
 * Represents the metadata of a resource in the Confluent Cloud ACL response.
 */
export interface ResourceMetadata {
  /**
   * The cluster ID of the resource.
   */
  cluster_id: string
  /**
   * The resource type.
   */
  resource_type: AclResourceType
  /**
   * The resource name.
   */
  resource_name: string
  /**
   * The pattern type of the resource.
   */
  pattern_type: AclPatternType
}

export interface AclDeleteQueryParams extends Record<string, string | undefined> {
  /**
   * Enum representing the allowed ACL resource types.
   */
  resource_type: AclResourceType
  /**
   * The name of the ACL resource.
   */
  resource_name?: string
  /**
   * Enum representing the allowed ACL pattern types.
   */
  pattern_type: AclPatternType
  /**
   * The principal associated with the ACL.
   */
  principal?: string
  /**
   * The host associated with the ACL.
   */
  host?: string
  /**
   * Enum representing the allowed ACL operations.
   */
  operation: AclOperation
  /**
   * Enum representing the allowed ACL permissions.
   */
  permission: AclPermission
}

export const aclSearchResponseMock: AclSearchResponse = {
  kind: 'KafkaAclList',
  metadata: {
    self: 'https://api.confluent.cloud/v3/clusters/cluster-id/acls?resource_type=TOPIC&resource_name=topic&pattern_type=MATCH&operation=READ&permission=ALLOW',
    next: null,
  },
  data: [
    {
      kind: 'KafkaAcl',
      metadata: {
        cluster_id: 'cluster-id',
        resource_type: 'TOPIC',
        resource_name: 'topic',
        pattern_type: 'MATCH',
      },
      principal: 'User:User-1',
      host: '*',
      operation: 'READ',
      permission: 'ALLOW',
    },
    {
      kind: 'KafkaAcl',
      metadata: {
        cluster_id: 'cluster-id',
        resource_type: 'TOPIC',
        resource_name: 'topic',
        pattern_type: 'MATCH',
      },
      principal: 'User:User-1',
      host: '*',
      operation: 'READ',
      permission: 'ALLOW',
    },
  ],
}
