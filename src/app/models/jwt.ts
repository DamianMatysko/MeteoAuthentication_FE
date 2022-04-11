export interface Jwt {
  jwt: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}
