import { AxiosError } from 'axios'

/**
 * Handle AxiosError and return a CfnError
 * @param e The error to handle
 * @returns A CfnError
 */
export const handleError = (e: unknown): Error => {
  if (e instanceof AxiosError) {
    return new CfnError<ConfluentErrorResponse>(e)
  } else {
    return e as Error
  }
}

export type ConfluentErrorResponse = {
  error_code: number
  message: string
  id?: string
  status?: string
  code?: string
  title?: string
  detail?: string
  source?: {
    pointer?: string
    parameter?: string
  }
}

export interface iCfnError extends Error, ConfluentErrorResponse {
  status: string
  statusText: string
  type: 'Axios' | 'Confluent' | 'Unknown'
}

/**
 *
 */
export class CfnError<T extends ConfluentErrorResponse> implements iCfnError {
  type: 'Axios' | 'Confluent' | 'Unknown'
  status: string
  statusText: string
  name: string
  message: string
  error_code: number
  cause?: Error
  stack?: string
  id?: string
  code?: string
  title?: string
  detail?: string
  source?: {
    pointer?: string
    parameter?: string
  }
  sub_code?: string

  /**
   * Constructor for CfnError. Takes an AxiosError and parses it into a CfnError.
   * @param err The AxiosError to parse.
   */
  constructor(err: AxiosError<T>) {
    if (err.response) {
      this.type = 'Confluent'
      this.status = err.response.status.toString()
      this.statusText = err.response.statusText
      this.name = err.name
      this.message = err.response.data.message
      this.error_code = err.response.data.error_code
      this.cause = err.cause
      this.stack = err.stack
      this.id = err.response.data.id
      this.code = err.response.data.code
      this.title = err.response.data.title
      this.detail = err.response.data.detail
      this.source = err.response.data.source
    } else {
      this.type = 'Axios'
      this.status = err.status?.toString() || 'Not Defined'
      this.statusText = 'Unknown'
      this.name = err.name
      this.message = err.message
      this.error_code = err.code ? Number.parseInt(err.code) : 500
      this.cause = err.cause
      this.stack = err.stack
    }
  }
}

/**
 * handleErrorArray is a function that takes an unknown error and returns an Error object.
 * @param e The unknown error.
 * @returns An Error object.
 */
export const handleErrorArray = (e: unknown): Error => {
  if (e instanceof AxiosError) {
    return new CfnErrorArray<ConfluentErrorArrayResponse>(e)
  } else {
    return e as Error
  }
}

export type ConfluentErrorArrayResponse = {
  errors: ConfluentErrorResponse[]
}

export interface iCfnErrorArray extends Error, ConfluentErrorArrayResponse {
  status: string
  statusText: string
  type: 'Axios' | 'Confluent' | 'Unknown'
}

/**
 * CfnErrorArray is a class that implements the iCfnErrorArray interface.
 */
export class CfnErrorArray<T extends ConfluentErrorArrayResponse> implements iCfnErrorArray {
  type: 'Axios' | 'Confluent' | 'Unknown'
  status: string
  statusText: string
  name: string
  message: string
  error_code: number
  errors: ConfluentErrorResponse[]

  /**
   * CfnErrorArray constructor. Takes an AxiosError and parses the response into the CfnErrorArray object.
   * @param err The AxiosError object.
   */
  constructor(err: AxiosError<T>) {
    if (err.response) {
      this.type = 'Confluent'
      this.status = err.response.status.toString()
      this.statusText = err.response.statusText
      this.errors = err.response.data.errors
      this.name = err.name
      this.message = err.response.data.errors[0].message
      this.error_code = err.response.data.errors[0].error_code
    } else {
      this.type = 'Axios'
      this.status = err.status?.toString() || 'Not Defined'
      this.statusText = 'Unknown'
      this.name = err.name
      this.message = err.message
      this.error_code = err.code ? Number.parseInt(err.code) : 500
      this.errors = []
    }
  }
}
