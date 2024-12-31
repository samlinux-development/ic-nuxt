import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface PushUp { 'date' : Time, 'count' : bigint, 'user' : string }
export type Time = bigint;
export interface _SERVICE {
  'addPushUp' : ActorMethod<[string, bigint], string>,
  'getPushUpCount' : ActorMethod<[], bigint>,
  'getPushUps' : ActorMethod<[], Array<[bigint, PushUp]>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
