declare module 'compression' {
  import { RequestHandler } from 'express';
  function compression(): RequestHandler;
  namespace compression {}
  export = compression;
}