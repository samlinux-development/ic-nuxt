import Time "mo:base/Time";

module {

  public type PushUp = {
    user : Text;
    count : Nat;
    date : Time.Time;
  }; 
}