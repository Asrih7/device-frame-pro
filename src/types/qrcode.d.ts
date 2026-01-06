declare module 'qrcode' {
  export function toDataURL(text: string, options?: any): Promise<string>;
  const qrcode: { toDataURL: (text: string, options?: any) => Promise<string> };
  export default qrcode;
}