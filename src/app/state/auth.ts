import { jwtDecode } from 'jwt-decode';

interface JwtDecoded {
  user_id:string;
  exp: number;
}

export function isTokenExpired(token: string | null): boolean {
    try {
      if (token !== null) {
        const decodedToken = jwtDecode<JwtDecoded>(token);
        const currentTime = Date.now() / 1000;
        return Math.floor(decodedToken.exp) < Math.floor(currentTime);
      }else {
        return true
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
}

