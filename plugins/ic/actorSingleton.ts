import { idlFactory } from "../src/declarations/backend/backend.did.js";
import { Actor, HttpAgent } from "@dfinity/agent";
import type { ActorSubclass } from "@dfinity/agent";
import type { _SERVICE } from "../src/declarations/backend/backend.did";
import { useRuntimeConfig } from '#app';

// for typescript
declare global {
  interface Window {
    global: any;
  }
}
window.global ||= window;

type OptionsType = {
  agentOptions?: import("@dfinity/agent").HttpAgentOptions;
  actorOptions?: import("@dfinity/agent").ActorConfig;
};

let actorInstance: ActorSubclass<_SERVICE> | null = null;

export const getActor = (options?: OptionsType): ActorSubclass<_SERVICE> => {
  if (!actorInstance) {
    console.log('>> createActor as singleton <<');
    
    const config = useRuntimeConfig();
    const canisterId = config.public.backendCanisterId;
    const network = config.public.network || 'local';

    let _host = 'http://localhost:4943';
    const hosts = ['ic', 'playground'];

    if (hosts.includes(network)) {
      _host = `https://${canisterId}.ic0.app`;
    }

    const hostOptions = { host: _host };
    if (!options) {
      options = {
        agentOptions: hostOptions,
      };
    } else if (!options.agentOptions) {
      options.agentOptions = hostOptions;
    } else {
      options.agentOptions.host = hostOptions.host;
    }

    const agent = new HttpAgent({ ...options.agentOptions });

    // Fetch root key for certificate validation during development
    if (network !== "ic") {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
        );
        console.error(err);
      });
    }

    actorInstance = Actor.createActor<_SERVICE>(idlFactory, {
      agent,
      canisterId: canisterId,
      ...options?.actorOptions,
    });
  }

  return actorInstance;
};