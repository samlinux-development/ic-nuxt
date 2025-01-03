export const idlFactory = ({ IDL }) => {
  const Attempt = IDL.Record({ 'count' : IDL.Nat, 'repetition' : IDL.Nat });
  const Time = IDL.Int;
  const PushUp = IDL.Record({
    'executions' : IDL.Vec(Attempt),
    'date' : Time,
    'count' : IDL.Nat,
    'user' : IDL.Text,
  });
  const Main = IDL.Service({
    'addPushUp' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Vec(Attempt)],
        [IDL.Text],
        [],
      ),
    'getPushUpCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getPushUps' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, PushUp))],
        ['query'],
      ),
    'getTotalPushUpCount' : IDL.Func([], [IDL.Nat], ['query']),
  });
  return Main;
};
export const init = ({ IDL }) => { return []; };
