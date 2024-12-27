import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

import Map "mo:map/Map";
import { nhash } "mo:map/Map";

actor {
  type PushUp = {
    user : Text;
    count : Nat;
    date : Time.Time;
  };
  stable var counter:Nat = 0;

  stable let map = Map.new<Nat, PushUp>();

	public shared func addPushUp(user:Text, count : Nat) : async Text {

    let pushUp:PushUp = {
      user = user;
      count = count;
      date = Time.now();
    };

    Map.set(map,nhash, counter, pushUp);
    counter := counter + 1;
    "Push up added";
  };

  // get all push ups
  public shared func getPushUps() : async [(Nat, PushUp)] {
    Map.toArray(map);
  };
};