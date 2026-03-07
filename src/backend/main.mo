import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";

actor {
  let waitlistEntries = Map.empty<Text, WaitlistEntry>();
  let calculatorQueries = Map.empty<Text, CalculatorQuery>();

  type HomeType = {
    #PG;
    #OneBHK;
    #TwoBHK;
    #ThreeBHK;
    #FourBHKPlus;
  };

  type WaitlistEntry = {
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    homeType : HomeType;
    squareFootage : Nat;
    adults : Nat;
    children : Nat;
    elderly : Nat;
    preferredStartDate : Text;
    timestamp : Time.Time;
  };

  type CalculatorQuery = {
    homeType : HomeType;
    squareFootage : Nat;
    adults : Nat;
    children : Nat;
    elderly : Nat;
    calculatedPrice : Nat;
    recommendedHours : Nat;
    timestamp : Time.Time;
  };

  public shared ({ caller }) func addWaitlistEntry(
    name : Text,
    phone : Text,
    email : Text,
    city : Text,
    homeType : HomeType,
    squareFootage : Nat,
    adults : Nat,
    children : Nat,
    elderly : Nat,
    preferredStartDate : Text,
  ) : async () {
    let id = name.concat(phone).concat(Time.now().toText());
    let entry : WaitlistEntry = {
      name;
      phone;
      email;
      city;
      homeType;
      squareFootage;
      adults;
      children;
      elderly;
      preferredStartDate;
      timestamp = Time.now();
    };
    waitlistEntries.add(id, entry);
  };

  public shared ({ caller }) func addCalculatorQuery(
    homeType : HomeType,
    squareFootage : Nat,
    adults : Nat,
    children : Nat,
    elderly : Nat,
    calculatedPrice : Nat,
    recommendedHours : Nat,
  ) : async () {
    let id = Time.now().toText();
    let queryEntry : CalculatorQuery = {
      homeType;
      squareFootage;
      adults;
      children;
      elderly;
      calculatedPrice;
      recommendedHours;
      timestamp = Time.now();
    };
    calculatorQueries.add(id, queryEntry);
  };

  public query ({ caller }) func getWaitlistCount() : async Nat {
    waitlistEntries.size();
  };

  public query ({ caller }) func getAllWaitlistEntries() : async [WaitlistEntry] {
    let entriesList = List.empty<WaitlistEntry>();
    for ((_, entry) in waitlistEntries.entries()) {
      entriesList.add(entry);
    };
    entriesList.toArray();
  };
};
