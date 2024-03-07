/**
 * APIVersion defines the schema version of this representation of a resource.
 */
type APIVersion = 'cmk/v2'

/**
 * Kind defines the object this REST resource represents.
 */
type Kind = 'Basic' | 'Dedicated' | 'Enterprise' | 'Standard'

/**
 * Query parameters for the cluster search endpoint.
 */
export interface ConfluentClusterListQueryParams
  extends Record<
    string,
    string | string[] | number | undefined | { network?: string[] | undefined }
  > {
  environment: string // Example: environment=env-00000
  spec?: {
    network?: string[] // Example: spec.network=n-00000&spec.network=n-00001
  }
  page_size?: number // integer <= 100, Default: 10
  page_token?: string // string <= 255 characters
}

/**
 * Cluster metadata.
 */
export interface ConfluentClusterMetadata {
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
   * The date and time at which this object was created. It is represented in RFC3339 format and is in UTC.
   */
  created_at: string

  /**
   * The date and time at which this object was last updated. It is represented in RFC3339 format and is in UTC.
   */
  updated_at: string

  /**
   * The date and time at which this object was (or will be) deleted. It is represented in RFC3339 format and is in UTC.
   */
  deleted_at: string
}

/**
 * The desired state of the Cluster.
 */
export interface ConfluentClusterSpec {
  /**
   * The name of the cluster.
   */
  display_name: string

  /**
   * The availability zone configuration of the cluster.
   * Note: The availability zone can be updated from Single to Multi-Zone for Basic and Standard clusters but cannot be downgraded from Multi-Zone to Single Zone.
   */
  availability: 'MULTI_ZONE' | 'SINGLE_ZONE'

  /**
   * The cloud service provider in which the cluster is running.
   */
  cloud: 'AWS' | 'GCP' | 'AZURE'

  /**
   * The cloud service provider region where the cluster is running.
   */
  region: string

  /**
   * The configuration of the Kafka cluster.
   * Note: Clusters can be upgraded from Basic to Standard, but cannot be downgraded from Standard to Basic.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any // Define the specific type for config if available

  /**
   * The bootstrap endpoint used by Kafka clients to connect to the cluster.
   */
  kafka_bootstrap_endpoint: string

  /**
   * The cluster HTTP request URL.
   */
  http_endpoint: string

  /**
   * The Kafka API cluster endpoint used by Kafka clients to connect to the cluster.
   */
  api_endpoint: string

  /**
   * The environment to which this belongs.
   */
  environment: {
    id: string
    environment: string
    related: string
    resource_name: string
  }

  /**
   * The network associated with this object.
   */
  network: {
    id: string
    environment: string
    related: string
    resource_name: string
  }

  /**
   * The byok associated with this object.
   */
  byok: {
    id: string
    related: string
    resource_name: string
  }
}

/**
 * The status of the Cluster.
 */
interface ClusterStatus {
  /**
   * The lifecycle phase of the cluster:
   * - PROVISIONED: cluster is provisioned.
   * - PROVISIONING: cluster provisioning is in progress.
   * - FAILED: provisioning failed.
   */
  phase: 'PROVISIONING' | 'PROVISIONED' | 'FAILED'

  /**
   * The number of Confluent Kafka Units (CKUs) the Dedicated cluster currently has.
   */
  cku: number
}

/**
 * Represents a Cluster.
 */
export interface ConfluentClusterResponse {
  /**
   * Value: "cmk/v2"
   */
  api_version: APIVersion

  /**
   * Value: "Cluster Type"
   */
  kind: Kind

  /**
   * ID is the "natural identifier" for an object within its scope/namespace;
   * it is normally unique across time but not space.
   * That is, you can assume that the ID will not be reclaimed and reused after an object is deleted ("time");
   * however, it may collide with IDs for other object kinds or objects of the same kind within a different scope/namespace ("space").
   */
  id: string

  /**
   * Object metadata.
   */
  metadata: ConfluentClusterMetadata

  /**
   * The desired state of the Cluster.
   */
  spec: ConfluentClusterSpec

  /**
   * The status of the Cluster.
   */
  status: ClusterStatus
}

export interface ConfluentClusterListResponse {
  api_version: APIVersion
  kind: Kind
  metadata: {
    first: string
    last: string
    prev: string
    next: string
    total_size: number
  }
  data: ConfluentClusterResponse[]
}

/**
 * Represents the desired state of a Confluent Cluster for update.
 */
export interface ConfluentClusterUpdateRequest {
  /**
   * The specifications for the cluster update.
   */
  spec: {
    /**
     * The name of the cluster.
     */
    display_name?: string

    /**
     * The availability zone configuration of the cluster.
     * @enum ["MULTI_ZONE","SINGLE_ZONE"]
     * Note: The availability zone can be updated from Single to Multi-Zone for Basic and Standard clusters but cannot be downgraded from Multi-Zone to Single Zone.
     */
    availability?: 'MULTI_ZONE' | 'SINGLE_ZONE'

    /**
     * The configuration of the Kafka cluster.
     */
    config?: {
      /**
       * The type of enterprise cluster.
       */
      kind: Kind
      /**
       * Only Valid for Dedicated: The number of Confluent Kafka Units (CKUs) for Dedicated cluster types. MULTI_ZONE dedicated clusters must have at least two CKUs. >=1
       */
      cku?: number
    }

    /**
     * The environment to which this cluster belongs.
     */
    environment: {
      /**
       * ID of the referred resource.
       */
      id: string

      /**
       * Environment of the referred resource, if environment-scoped.
       */
      environment?: string
    }
  }
}

export const clusterMock: ConfluentClusterResponse = {
  api_version: 'cmk/v2',
  kind: 'Basic',
  id: '12345',
  metadata: {
    self: 'https://example.com/clusters/12345',
    resource_name: 'cluster-12345',
    created_at: '2022-01-01T00:00:00Z',
    updated_at: '2022-01-02T00:00:00Z',
    deleted_at: '2022-01-03T00:00:00Z',
  },
  spec: {
    display_name: 'MyCluster',
    availability: 'MULTI_ZONE',
    cloud: 'AWS',
    region: 'us-west-2',
    config: {}, // Mock config data
    kafka_bootstrap_endpoint: 'kafka-bootstrap.example.com:9092',
    http_endpoint: 'https://example.com/clusters/12345',
    api_endpoint: 'https://api.example.com/clusters/12345',
    environment: {
      id: 'env-123',
      environment: 'production',
      related: 'https://example.com/environments/env-123',
      resource_name: 'env-123',
    },
    network: {
      id: 'network-123',
      environment: 'production',
      related: 'https://example.com/networks/network-123',
      resource_name: 'network-123',
    },
    byok: {
      id: 'byok-123',
      related: 'https://example.com/byoks/byok-123',
      resource_name: 'byok-123',
    },
  },
  status: {
    phase: 'PROVISIONED',
    cku: 3,
  },
}
