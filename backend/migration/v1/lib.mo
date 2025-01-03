import Tv0 "../v0/types";

import Time "mo:base/Time";
import Map "mo:map/Map";
import { nhash } "mo:map/Map";

module {
  public type Attempt = {
    count : Nat;
    repetition: Nat;
  };

  public type PushUp = {
    user : Text;
    count : Nat;
    date : Time.Time;
    executions : [Attempt];
  }; 

  // migrate pushUp from v1 to v2 for each pushUp in the map
  public func migratePushUps(map:Map.Map<Nat, Tv0.PushUp>, newMap:Map.Map<Nat, PushUp>) : async Text {
    let pushUps = Map.toArray(map);
    for ((index, pushUp) in pushUps.vals()) {
      
      let pushUpV2:PushUp = {
        user = pushUp.user;
        count = pushUp.count;
        date = pushUp.date;
        executions = [{
          count = pushUp.count;
          repetition = 1;
        }];
       
      };
      Map.set(newMap, nhash, index, pushUpV2);
    };
    "PushUps migrated";
  };

}