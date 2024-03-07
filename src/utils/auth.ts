/**
 * This function encodes a username and password into a base64 string for confluent
 * @param userName the username to encode
 * @param password the password to encode
 * @returns the encoded string
 */
export function encodeAuthString(userName: string, password: string) {
  return Buffer.from(`Basic ${userName}:${password}`).toString('base64')
}
