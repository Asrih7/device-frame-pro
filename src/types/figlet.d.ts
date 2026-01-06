declare module 'figlet' {
  export function textSync(text: string, options?: any): string;
  export function text(text: string, options: any, cb: (err: Error | null, data?: string) => void): void;
  const anything: any;
  export default anything;
}
