import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";

import Map "mo:map/Map";
import { nhash } "mo:map/Map";

//import T "migration/v0/types";
import Mv1 "migration/v1/lib";

shared ({ caller = creator }) actor class Main () {
  stable var counter:Nat = 0;
  // Migration strategy in two steps:
  // 1. Create a new map for the new version of the type und migrate the data from the old map to the new map
  // 2. rewrite to the newMap 

  //stable let map = Map.new<Nat, T.PushUp>();
  stable let mapV1 = Map.new<Nat, Mv1.PushUp>();

  /* 
  // migrate pushUp for each pushUp in the map
  public shared ({caller}) func migratePushUps() : async Text {
    assert (creator == caller);  
    let r = await Mv1.migratePushUps(map, mapV1);
    r;
  };
  */ 

  /* 
  Old version of addPushUp
  public shared func addPushUp(user:Text, count : Nat) : async Text {
    // calc new pushUps sum from the attampt array
    
    let pushUp:T.PushUp = {
      user = user;
      count = count;
      date = Time.now();
    };

    Map.set(map, nhash, counter, pushUp);
    counter := counter + 1;
    "Push up added";
  };
 */
 
	public shared func addPushUp(user:Text, count : Nat, attampt:[Mv1.Attempt]) : async Text {
    // calc new pushUps sum from the attampt array
    let pushUp:Mv1.PushUp = {
      user = user;
      count = count;
      date = Time.now();
      executions = attampt;
    };

    Map.set(mapV1, nhash, counter, pushUp);
    counter := counter + 1;
    "Push up added";
  };

  // get all push ups
  public query func getPushUps() : async [(Nat, Mv1.PushUp)] {
    Map.toArray(mapV1);
  };

  // get pushUps count
  public query func getPushUpCount() : async Nat {
    counter;
  };

  // total pushUps count
  public query func getTotalPushUpCount() : async Nat {   
    var total = 0;
    let pushUps = Map.toArray(mapV1);
    for ((index, pushUp) in pushUps.vals()) {
      total := total + pushUp.count;
    };
    total;
  };
};