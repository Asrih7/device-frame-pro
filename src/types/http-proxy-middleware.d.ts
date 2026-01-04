declare module 'http-proxy-middleware' {
  import { RequestHandler } from 'express';
  export function createProxyMiddleware(options: any): RequestHandler;
  export default createProxyMiddleware;
}
