 /**
  * An array of routes that are accessible to the public
  * these routes do not require authentication
  * type{   string[]}
  */
 
 export const publicRoutes = [
    "/",
    "/auth/new-verification",
    '/api/customers'
];

 /**
  * The path where logged in users will be redirected 
  */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

 /**
  * An array of routes that are used for authentication
  * these routes will logged in user directly to DEFAULT_LOGIN_REDIRECT VALUE
  * type{   string[]}
  */
 
 export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];
 
 /**
  * The path- prefix for auth api routes
  */
export const apiAuthPrefix = "/api/auth";


