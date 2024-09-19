declare module "miragejs" {
  import { ModelDefinition, FactoryDefinition, Registry, Server as MirageServer } from "miragejs";
  import { Response as MirageResponse } from "miragejs";

  export function createServer(options?: any): MirageServer;

  export const Model: ModelDefinition<any>;
  export const Factory: FactoryDefinition<any>;

  export class Response extends MirageResponse {
    constructor(code: number, headers: any, body: any);
  }
}
