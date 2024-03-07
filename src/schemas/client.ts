import { AxiosInstance } from 'axios'
import { createAxiosClient } from '../utils'
import { handleError } from '../utils/error'
import {
  ConfluentResponse,
  ConfluentTopicSchemaAPIValidCompatibilityResponse,
  Schema,
  SchemaResponse,
  Subject,
  SubjectVersionPairs,
  TopicSchemaConfig,
  Version,
} from './models'

/**
 * The schema client is a collection of endpoints that allow you to interact with
 * schemas, subjects, and versions
 *
 */
export class ConfluentSchemaClient {
  private readonly axios: AxiosInstance

  /**
   * The schema client is a collection of endpoints that allow you to interact with
   * @param confluentUrl string of the url to the schema registry
   * @param confluentAuth string of an encoded userName, apiKey
   */
  constructor(confluentUrl: string, confluentAuth: string) {
    this.axios = createAxiosClient(confluentUrl, confluentAuth, {
      Accept:
        'application/vnd.schemaregistry.v1+json, application/vnd.schemaregistry+json, application/json',
    })
  }

  /**
   * id (int) – the globally unique identifier of the schema
   * subject (string) – Add ?subject=<someSubjectName> at the end of this
   * request to look for the subject in all contexts starting with the default
   * context, and return the schema with the ID from that context.
   * To learn more about contexts, see the exporters API reference and
   * the quick start and concepts guides for Schema Linking on Confluent
   * Platform and Schema Linking on Confluent Cloud.
   * @param id id of the schema
   * @param subject optional used as query param
   * @returns a schema
   */
  public async getSchemaById(id: string, subject?: string): Promise<Schema> {
    try {
      if (subject) {
        const res = await this.axios.get<Schema>(`/schemas/ids/${id}?subject=${subject}`)
        return res.data
      }
      const res = await this.axios.get<Schema>(`/schemas/ids/${id}`)
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Retrieves only the schema string identified by the input ID.
   * @param id id of the schema
   * @param subject optional used as query param
   * @returns a string of the schema
   */
  public async getSchemaStringById(id: string, subject?: string): Promise<string> {
    try {
      if (subject) {
        const res = await this.axios.get<string>(`/schemas/ids/${id}/schema?subject=${subject}`)
        return res.data
      }
      const res = await this.axios.get<string>(`/schemas/ids/${id}/schema`)
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * This just gets what types this registry allows
   * @returns the types allowed by the schema registry
   */
  public async getSchemaTypes(): Promise<string[]> {
    try {
      const res = await this.axios.get<string[]>('/schemas/types')
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Get the subject-version pairs identified by the input ID.
   * @param id the globally unique identifier of the schema
   * @returns a list of subject-version pairs
   */
  public async getSubjectVersionBySchemaId(id: string): Promise<SubjectVersionPairs> {
    try {
      const res = await this.axios.get<SubjectVersionPairs>(`/schemas/ids/${id}`)
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Get a list of registered subjects. (For API usage examples, see List all subjects.)
   * @param subjectPrefix Add ?subjectPrefix= (as an empty string) at the end of this request to list subjects in the default context. If this flag is not included, GET /subjects returns all subjects across all contexts.
   * @param deleted Add ?deleted=true at the end of this request to list both current and soft-deleted subjects. The default is false. If this flag is not included, only current subjects are listed (not those that have been soft-deleted). Hard and soft delete are explained below in the description of the delete API.
   * @returns a list of subjects
   */
  public async getSubject(subjectPrefix?: string, deleted = false): Promise<string[]> {
    try {
      if (subjectPrefix) {
        const filteredSubjects = await this.axios.get<string[]>('/subjects', {
          params: {
            subjectPrefix,
            deleted,
          },
        })
        return filteredSubjects.data
      }
      const subjects = await this.axios.get<string[]>('/subjects', {
        params: {
          deleted,
        },
      })
      return subjects.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Get a list of versions registered under the specified subject.
   * @param subject the name of the subject
   * @returns a list of versions registered to the subjects int array
   */
  public async getAllVersionsBySubject(subject: Subject): Promise<Version[]> {
    try {
      const res = await this.axios<ConfluentResponse<Version[]>>(`/subjects/${subject}/versions`)
      return res.data.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Deletes the specified subject and its associated compatibility level if registered.
   * It is recommended to use this API only when a topic needs to be recycled or in
   * a development environment. To learn more, see Schema Deletion Guidelines.
   * @param subject - the name of the subject
   * @param permanent – Add ?permanent=true at the end of this request to specify a
   * hard delete of the subject, which removes all associated metadata including the
   * schema ID. The default is false. If the flag is not included, a soft delete is
   * performed. You must perform a soft delete first, then the hard delete. This flag
   * is now supported on both Confluent Platform and Confluent Cloud, which sets limits
   * on the number of schema versions supported in the registry. A hard delete frees up
   * space in a way that a soft delete does not.
   * @returns version of the schema deleted under this subject
   */
  public async deleteSubject(subject: Subject, permanent = false): Promise<Version> {
    try {
      // Soft delete must happen whether a hard delete is occurring
      const res = await this.axios.delete<Version>(`/subjects/${subject}`)
      if (permanent) {
        const res = await this.axios.delete<Version>(`/subjects/${subject}`, {
          params: {
            permanent,
          },
        })
        return res.data
      }
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Get a specific version of the schema registered under this subject
   * @param subject string of the subject
   * @param version string of the versionId
   * @returns the schema response
   */
  public async getSchemaBySubjectAndVersionId(
    subject: Subject,
    version: Version,
  ): Promise<SchemaResponse> {
    try {
      const res = await this.axios.get<SchemaResponse>(`/subjects/${subject}/versions/${version}`)
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Get the schema for the specified version of this subject. The unescaped schema
   * only is returned.
   * @param subject  Name of the subject
   * @param version Version of the schema to be returned. Valid values for
   * versionId are between [1,2^31-1] or the string latest, which returns
   * the last registered schema under the specified subject. The value -1
   * is equivalent to latest. Note that there may be a new latest schema that
   * gets registered right after this request is served.
   * @returns string
   */
  public async getSchemaStringBySubjectAndVersion(
    subject: Subject,
    version: Version,
  ): Promise<string> {
    try {
      const res = await this.axios.get<string>(`/subjects/${subject}/versions/${version}/schema`)
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Register a new schema under the specified subject.
   * (Essentially, create a new schema.) If successfully registered,
   * this returns the unique identifier of this schema in the registry.
   * The returned identifier should be used to retrieve this schema from
   * the schemas resource and is different from the schema’s version which
   * is associated with the subject. If the same schema is registered under
   * a different subject, the same identifier will be returned. However,
   * the version of the schema may be different under different subjects. A
   * schema should be compatible with the previously registered schema or
   * schemas (if there are any) as per the configured compatibility level.
   * If a compatibility level has been set on a subject, the configured
   * compatibility level can be obtained by issuing a
   * GET http:get:: /config/(string: subject). If this returns an error,
   * it means that no subject-specific compatibility level is set for the
   * subject. In that case, use GET http:get:: /config to find the global
   * compatibility level, which applies to all subjects. (Subject-specific
   * compatibility, when configured, overrides global.) For examples, see
   * Update compatibility requirements on a subject and Get compatibility
   * requirements on a subject. When there are multiple instances of Schema
   * Registry running in the same cluster, the schema registration request will be
   * forwarded to one of the instances designated as the primary.
   * If the primary is not available, the client will get an error code
   * indicating that the forwarding has failed. If no schemaType is supplied,
   * schemaType is assumed to be AVRO.
   * @param subject Subject under which the schema will be registered
   * @param body - TopicSchemaConfig schema, schemaType, references
   * @param normalize optional The default is false. To learn more, see Schema Normalization.
   * @returns the id of the schema
   */
  async createSchema(
    subject: Subject,
    body: TopicSchemaConfig,
    normalize = false,
  ): Promise<number> {
    try {
      const res = await this.axios.post<ConfluentResponse<number>>(
        `/subjects/${subject}/versions`,
        body,
        {
          params: {
            normalize,
          },
        },
      )
      return res.data.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Test compatibility of a candidate parsed schema for a subject. The
   * parsed schema is compared to the latest version registered under
   * the specified subject. If the schemas are compatible, this returns
   * an empty response. If the schemas are incompatible, this returns
   * an error code and a message indicating the type of incompatibility.
   * @param subject Subject under which the schema will be registered
   * @param body TopicSchemaConfig schema, schemaType, references
   * @returns Schema
   */
  async checkSchemaExistsForSubject(subject: Subject, body: TopicSchemaConfig): Promise<number> {
    try {
      const res = await this.axios.post<ConfluentResponse<number>>(`/subjects/${subject}`, body)
      return res.data.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Deletes a specific version of the schema registered under this
   * subject. Unless you perform a hard delete (with ?permanent=true
   * as noted below), this only deletes the version, leaving the schema
   * ID intact and making it still possible to decode data using the
   * schema ID. This API is recommended to be used only in development
   * environments or under extreme circumstances where-in, its required
   * to delete a previously registered schema for compatibility purposes
   * or re-register previously registered schema.
   * @param subject Name of the subject
   * @param version The version id
   * @param permanent boolean of if this is a hard or soft delete
   * @returns the version
   */
  public async deleteSchemaVersion(
    subject: Subject,
    version: Version,
    permanent = false,
  ): Promise<Version> {
    try {
      // Soft delete must happen whether a hard delete is occurring
      const res = await this.axios.delete<Version>(`/subjects/${subject}/versions/${version}`)
      if (permanent) {
        const res = await this.axios.delete<Version>(`/subjects/${subject}/versions/${version}`, {
          params: {
            permanent,
          },
        })
        return res.data
      }
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Get a list of IDs of schemas that reference the schema with the
   * given subject and version.
   * @param subject Name of the subject
   * @param version Version of the schema to be returned. Valid values
   * for versionId are between [1,2^31-1] or the string latest, which
   * returns the last registered schema under the specified subject. The
   * value -1 is equivalent to latest. Note that there may be a new
   * latest schema that gets registered right after this request is served.
   * Note that there may be a new latest schema that gets registered right
   * after this request is served.
   * @returns an array of schema ids that reference this particular schema
   */
  public async getReferences(subject: Subject, version: Version): Promise<number[]> {
    try {
      const res = await this.axios.get<number[]>(
        `/subjects/${subject}/versions/${version}/referencedby`,
      )
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * The compatibility resource allows the user to test schemas for compatibility against a
   * specific version or all versions of a subject’s schema. See Test compatibility of a schema
   * with the latest schema under subject “Kafka-value” for usage examples.
   * @param subject Name of the subject
   * @param version the version of the schema to check against
   * @param body the schema body
   * @returns the compatibility response
   */
  public async checkCompatibilityAgainstVersion(
    subject: Subject,
    version: Version,
    body: TopicSchemaConfig,
  ): Promise<ConfluentTopicSchemaAPIValidCompatibilityResponse> {
    try {
      const res = await this.axios.post<ConfluentTopicSchemaAPIValidCompatibilityResponse>(
        `/compatibility/subjects/${subject}/versions/${version}`,
        body,
        {
          params: {
            verbose: true,
          },
        },
      )
      return res.data
    } catch (e) {
      throw handleError(e)
    }
  }

  /**
   * Perform a compatibility check on the schema against one or more versions
   * in the subject, depending on how the compatibility is set. For example,
   * if compatibility on the subject is set to BACKWARD, FORWARD, or FULL, the
   * compatibility check is against the latest version. If compatibility is set to one
   * of the TRANSITIVE types, the check is against all previous versions.
   * @param subject Name of the subject
   * @param body the schema body
   */
  public async checkCompatibilityAgainstAllVersions(
    subject: Subject,
    body: TopicSchemaConfig,
  ): Promise<void> {
    try {
      await this.axios.put<void>(`/compatibility/subjects/${subject}/versions`, body, {
        params: { verbose: true },
      })
    } catch (e) {
      throw handleError(e)
    }
  }
}
