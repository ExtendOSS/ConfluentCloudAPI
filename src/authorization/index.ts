import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

/**
 * getApiToken returns a base64 encoded string of your username and password.
 * Used for accessing the kafka cluster
 * @returns string - Basic {Base64 Encoded Creds}
 */
export const getApiToken = () => {
  const clientId = process.env.API_USERNAME as string
  const clientSecret = process.env.API_PASSWORD as string

  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
}

/**
 * getSchemaRegistryToken returns a base64 encoded string of your username and password.
 * Used for accessing the schema registry cluster
 * @returns string - Basic {Base64 Encoded Creds}
 */
export const getSchemaRegistryToken = () => {
  const schemaRegUser = process.env.SCHEMA_USERNAME as string
  const schemaRegPass = process.env.SCHEMA_PASSWORD as string

  return `Basic ${Buffer.from(`${schemaRegUser}:${schemaRegPass}`).toString('base64')}`
}

/**
 * getOAuthCreds returns a jwt token for accessing the admin functionality in confluent
 * e.g. creating clusters, environments, and users.
 * @param email Email for the OAuth used
 * @param password Password for the OAuth user
 * @returns A jwt bearer token
 */
export const getOAuthCreds = async (email: string, password: string) => {
  const token = await axios.post('https://confluent.cloud/api/sessions', {
    email,
    password,
  })
  return `Bearer ${token.data.token as string}`
}
