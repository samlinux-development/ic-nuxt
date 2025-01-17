actor {
  stable var lastName : Text = "Roland";
	public shared func setLastName(name : Text) : async Bool {
    lastName := name;
    true
  };

  public shared query func getLastName() : async Text {
    lastName;
  };
};