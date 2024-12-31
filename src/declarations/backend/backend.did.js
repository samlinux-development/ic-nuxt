export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const PushUp = IDL.Record({
    'date' : Time,
    'count' : IDL.Nat,
    'user' : IDL.Text,
  });
  return IDL.Service({
    'addPushUp' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Text], []),
    'getPushUpCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getPushUps' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, PushUp))],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
