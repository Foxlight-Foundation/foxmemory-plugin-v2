// Stub type declarations for runtime-provided / optional dependencies.
// These modules are either supplied by the OpenClaw host at runtime or
// loaded lazily; they are not installed as build-time dependencies.

declare module "openclaw/plugin-sdk" {
  export interface OpenClawPluginApi {
    [key: string]: any;
  }
}

declare module "mem0ai" {
  const MemoryClient: any;
  export default MemoryClient;
}

declare module "mem0ai/oss" {
  const MemoryClient: any;
  export const Memory: any;
  export default MemoryClient;
}
