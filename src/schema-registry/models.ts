export interface SchemaRegistryObject {
  id: string
  name: string
  kafka_cluster_id: string
  endpoint: string
  created: string
  modified: string
  status: string
  physical_cluster_id: string
  account_id: string
  organization_id: string
  max_schemas: string
  org_resource_id: string
}

export interface ConfluentSchemaRegistryAPIResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
  validation_errors?: object
  cluster: SchemaRegistryObject
  credentials?: []
}

export interface ConfluentSchemaRegistryListAPIResponse {
  clusters: SchemaRegistryObject[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export interface SchemaRegistryConfig {
  name: string
  accountId: string
  // Weird types, I know, but it's the only options we were using at the time.
  location: 'US' | string
  serviceProvider: 'aws' | string
}

export interface CreateSchemaRegistryClusterSpec {
  package: 'ESSENTIALS' | 'ADVANCED'
  environment: {
    id: string
  }
  region: {
    id: string
  }
}
