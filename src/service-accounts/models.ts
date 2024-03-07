export interface ServiceAccount {
  /**
   * APIVersion defines the schema version of this representation of a resource.
   */
  api_version: string

  /**
   * Kind defines the object this REST resource represents.
   */
  kind: string

  /**
   * ID is the "natural identifier" for an object within its scope/namespace.
   * It is normally unique across time but not space.
   * That is, you can assume that the ID will not be reclaimed and reused after an object is deleted ("time");
   * however, it may collide with IDs for other object kinds or objects of the same kind within a different scope/namespace ("space").
   */
  id: string

  /**
   * ObjectMeta is metadata that all persisted resources must have,
   * which includes all objects users must create.
   */
  metadata: Metadata

  /**
   * A human-readable name for the Service Account.
   */
  display_name: string

  /**
   * A free-form description of the Service Account.
   */
  description: string
}

interface Metadata {
  /**
   * Self is a Uniform Resource Locator (URL) at which an object can be addressed.
   * This URL encodes the service location, API version, and other particulars necessary to locate the resource at a point in time.
   */
  self: string

  /**
   * Resource Name is a Uniform Resource Identifier (URI) that is globally unique across space and time.
   * It is represented as a Confluent Resource Name.
   */
  resource_name: string

  /**
   * The date and time at which this object was created.
   * It is represented in RFC3339 format and is in UTC.
   */
  created_at: string

  /**
   * The date and time at which this object was last updated.
   * It is represented in RFC3339 format and is in UTC.
   */
  updated_at: string

  /**
   * The date and time at which this object was (or will be) deleted.
   * It is represented in RFC3339 format and is in UTC.
   */
  deleted_at: string
}

export interface ServiceAccountList {
  /**
   * APIVersion defines the schema version of this representation of a resource.
   */
  api_version: string

  /**
   * Kind defines the object this REST resource represents.
   */
  kind: string
  /**
   * ListMeta describes metadata that resource collections may have
   */
  metadata: ListMetadata
  /**
   * data is a list of ServiceAccount objects.
   */
  data: ServiceAccount[]
}

/**
 * ServiceAccountCreateSpec is the request body for creating a ServiceAccount.
 */
export interface ServiceAccountCreateRequest {
  /**
   * A human-readable name for the Service Account.
   */
  display_name: string
  /**
   * A free-form description of the Service Account.
   */
  description?: string
}

/**
 * ListMeta describes metadata that resource collections may have
 * pagination links
 */
export interface ListMetadata {
  first?: string
  last?: string
  prev?: string
  next?: string
  total_size: number
}

export const data: ServiceAccount = {
  api_version: 'iam/v2',
  kind: 'ServiceAccount',
  id: 'dlz-f3a90de',
  metadata: {
    self: 'https://api.confluent.cloud/iam/v2/service-accounts/sa-12345',
    resource_name: 'crn://confluent.cloud/service-account=sa-12345',
    created_at: '2006-01-02T15:04:05-07:00',
    updated_at: '2006-01-02T15:04:05-07:00',
    deleted_at: '2006-01-02T15:04:05-07:00',
  },
  display_name: 'DeLorean_auto_repair',
  description: "Doc's repair bot for the DeLorean",
}
