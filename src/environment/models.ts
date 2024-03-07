export interface ConfluentEnvironment {
  /** The API version of the resource. */
  api_version: string
  /** The object type this resource represents. */
  kind: string
  /** The unique identifier for the environment. */
  id: string
  /** The human-readable name of the environment. */
  display_name: string
}

/**
 *
 * GET
 *
 */

/**
 * Represents an isolated namespace for Confluent resources for organizational purposes.
 */
export interface ConfluentEnvironmentGetResponse extends ConfluentEnvironment {
  /** Metadata associated with the environment. */
  metadata: ConfluentEnvironmentGetResponseMetadata
}

/**
 * Metadata associated with a Confluent environment.
 */
export interface ConfluentEnvironmentGetResponseMetadata {
  /** The URL address of the resource. */
  self: string
  /** The globally unique identifier (URI) of the resource. */
  resource_name: string
  /** The date and time when the resource was created (in UTC). */
  created_at: string
  /** The date and time when the resource was last updated (in UTC). */
  updated_at: string
  /** The date and time when the resource was (or will be) deleted (in UTC). */
  deleted_at: string
}

/**
 *
 * CREATE
 *
 */

/**
 * Request body for creating an environment.
 */
export interface ConfluentEnvironmentCreateRequest {
  /**
   * A human-readable name for the Environment.
   */
  display_name: string
}

/**
 * Response body for creating an environment.
 */
export interface ConfluentEnvironmentCreateResponse extends ConfluentEnvironment {
  /**
   * The schema version of this representation of a resource.
   */
  api_version: string
  /**
   * The object this REST resource represents.
   */
  kind: string
  /**
   * The "natural identifier" for an object within its scope/namespace.
   */
  id: string
  /**
   * Metadata that all persisted resources must have.
   */
  metadata: ConfluentEnvironmentGetResponseMetadata
}

/**
 *
 * LIST
 *
 */

/**
 * Response from calling Confluents's environment api's list endpoint
 */
export interface ConfluentEnvironmentListResponse {
  /**
   * The API version.
   */
  api_version: string
  /**
   * The kind of the object.
   */
  kind: string
  /**
   * Metadata information about the environment list.
   */
  metadata: {
    /**
     * The URL of the first page.
     */
    first?: string
    /**
     * The URL of the last page.
     */
    last?: string
    /**
     * The URL of the previous page.
     */
    prev?: string
    /**
     * The URL of the next page.
     */
    next: string | undefined
    /**
     * The total number of environments.
     */
    total_size?: number
  }
  /**
   * The list of environments.
   */
  data: ConfluentEnvironment[]
}

/**
 *
 * ERROR
 *
 */

/**
 * Error Responses for the confluent client's environment api
 */
export interface ConfluentEnvironmentErrorResponse {
  errors: ConfluentEnvironmentError[]
}

/**
 * Error object structure.
 */
interface ConfluentEnvironmentError {
  /**
   * A unique identifier for this particular occurrence of the problem.
   */
  id: string
  /**
   * The HTTP status code applicable to this problem.
   */
  status: string
  /**
   * An application-specific error code.
   */
  code: string
  /**
   * A short, human-readable summary of the problem.
   */
  title: string
  /**
   * A human-readable explanation specific to this occurrence of the problem.
   */
  detail: string
  /**
   * If this error was caused by a particular part of the API request, the source will point to the query string parameter or request body property that caused it.
   */
  source?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  /**
   * An application-specific error code.
   */
  error_code?: number
  /**
   * A message associated with the error, if available.
   */
  message?: string | null
}
