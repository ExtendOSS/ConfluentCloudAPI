export interface ConfluentRegionQueryParams {
  /**
   * Filter the results by exact match for spec.cloud.
   * @example cloud=AWS
   */
  'spec.cloud': string
  /**
   * Filter the results by exact match for spec.region_name.
   * @example region_name=us-east-2
   */
  'spec.region_name': string
  /**
   * Filter the results by exact match for spec.packages. Pass multiple times to see results matching any of the values.
   * @example packages=ESSENTIALS&packages=ADVANCED
   */
  'spec.packages': string[]

  /**
   * A pagination size for collection requests.
   * @example page_size=10
   * @default 10
   */
  page_size: number

  /**
   * An opaque pagination token for collection requests.
   * @example string <255 characters
   */
  page_token: string
}

/**
 * APIVersion defines the schema version of this representation of a resource.
 */
export type APIVersion = 'srcm/v2'

/**
 * Kind defines the object this REST resource represents.
 */
export type Kind = 'RegionList'

/**
 * ListMeta describes metadata that resource collections may have.
 */
export interface ListMeta {
  /** A link to the first page of results. */
  first?: string | null
  /** A link to the last page of results. */
  last?: string | null
  /** A link to the previous page of results. */
  prev?: string | null
  /** A link to the next page of results. */
  next?: string | null
  /** Number of records in the full result set. */
  total_size?: number
}

/**
 * Metadata is the metadata that all persisted resources must have, including objects users must create.
 */
export interface Metadata {
  /** A Uniform Resource Locator (URL) at which an object can be addressed. */
  self: string
  /** A Uniform Resource Identifier (URI) that is globally unique across space and time. */
  resource_name: string
  /** The date and time at which this object was created. */
  created_at: string
  /** The date and time at which this object was last updated. */
  updated_at: string
  /** The date and time at which this object was (or will be) deleted. */
  deleted_at: string
}

/**
 * Spec is the desired state of the Region.
 */
export interface Spec {
  /** The display name. */
  display_name: string
  /** The cloud service provider that hosts the region. */
  cloud: 'AWS' | 'GCP' | 'AZURE'
  /** The region name. */
  region_name: string
  /** List of Stream Governance packages allowing placement in this region. */
  packages: string[]
}

/**
 * Region represents a region resource.
 */
export interface Region {
  /** APIVersion defines the schema version of this representation of a resource. */
  api_version: APIVersion
  /** Kind defines the object this REST resource represents. */
  kind: Kind
  /** ID is the "natural identifier" for an object within its scope/namespace. */
  id: string
  /** ObjectMeta is metadata that all persisted resources must have. */
  metadata: Metadata
  /** The desired state of the Region. */
  spec: Spec
}

// Example usage:
export const mockRegionData: Region = {
  api_version: 'srcm/v2',
  kind: 'RegionList',
  id: 'dlz-f3a90de',
  metadata: {
    self: 'https://api.confluent.cloud/srcm/v2/regions/sgreg-12345',
    resource_name:
      'crn://confluent.cloud/organization=9bb441c4-edef-46ac-8a41-c49e44a3fd9a/region=sgreg-12345',
    created_at: '2006-01-02T15:04:05-07:00',
    updated_at: '2006-01-02T15:04:05-07:00',
    deleted_at: '2006-01-02T15:04:05-07:00',
  },
  spec: {
    display_name: 'Ohio (us-east-2)',
    cloud: 'AWS',
    region_name: 'us-east-2',
    packages: ['ESSENTIALS', 'ADVANCED'],
  },
}
