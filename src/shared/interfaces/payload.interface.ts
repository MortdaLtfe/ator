export interface Payload {
  /** Issuer (who created and signed this token) */
  iss?: string;
  /** Subject (whom the token refers to) */
  sub: any;
  /** Audience (who or what the token is intended for) */
  aud?: string[];
  /** Issued at (seconds since Unix epoch) */
  iat?: number;
  /** Expiration time (seconds since Unix epoch) */
  exp?: number;
}
/**
 * From  >>  https://github.com/jajaperson/nestjs-auth0/blob/master/src/auth/interfaces/jwt-payload.interface.ts
 */
