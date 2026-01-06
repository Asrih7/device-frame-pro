declare module 'commander' {
  export class Command {
    constructor(name?: string);
    version(v?: string): this;
    option(flags: string, description?: string, defaultValue?: any): this;
    parse(argv?: string[]): this;
    parseAsync?(argv?: string[]): Promise<this>;
    [key: string]: any;
  }
  export function program(): Command;
  const commander: { Command: typeof Command; program: () => Command };
  export default commander;
}