export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getLastName' : IDL.Func([], [IDL.Text], ['query']),
    'setLastName' : IDL.Func([IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
