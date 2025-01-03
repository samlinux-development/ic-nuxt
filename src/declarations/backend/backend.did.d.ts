import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Attempt { 'count' : bigint, 'repetition' : bigint }
export interface Main {
  'addPushUp' : ActorMethod<[string, bigint, Array<Attempt>], string>,
  'getPushUpCount' : ActorMethod<[], bigint>,
  'getPushUps' : ActorMethod<[], Array<[bigint, PushUp]>>,
  'getTotalPushUpCount' : ActorMethod<[], bigint>,
}
export interface PushUp {
  'executions' : Array<Attempt>,
  'date' : Time,
  'count' : bigint,
  'user' : string,
}
export type Time = bigint;
export interface _SERVICE extends Main {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
