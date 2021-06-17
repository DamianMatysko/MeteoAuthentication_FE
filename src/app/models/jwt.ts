export interface Jwt {
  jwt: string;
}

export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}
