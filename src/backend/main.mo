import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Types
  type ChatSession = {
    id : Text;
    title : Text;
    createdAt : Int;
    updatedAt : Int;
    messageCount : Nat;
  };

  type Message = {
    id : Text;
    sessionId : Text;
    role : Text; // "user" or "florence"
    content : Text;
    timestamp : Int;
  };

  type Tool = {
    id : Text;
    name : Text;
    description : Text;
    url : Text;
    iconEmoji : Text;
    category : Text;
  };

  type UserProfile = {
    name : Text;
    creditsRemaining : Nat;
  };

  module ChatSession {
    public func compare(a : ChatSession, b : ChatSession) : Order.Order {
      Int.compare(b.updatedAt, a.updatedAt);
    };
  };

  type UfId = (Principal, Text);

  module UfId {
    public func compare(a : UfId, b : UfId) : Order.Order {
      switch (Principal.compare(a.0, b.0)) {
        case (#equal) { Text.compare(a.1, b.1) };
        case (notEqual) { notEqual };
      };
    };
  };

  // State
  let chatSessions = Map.empty<Principal, Map.Map<Text, ChatSession>>();
  let messages = Map.empty<UfId, List.List<Message>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let tools = Map.empty<Text, Tool>();
  var sessionCounter = 0;
  var messageCounter = 0;

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Static tool data
  let staticToolsArray : [Tool] = [
    {
      id = "nurse-station";
      name = "NurseStation";
      description = "Ultimate nursing resources hub";
      url = "https://nursestation.app";
      iconEmoji = "🩺";
      category = "Resources";
    },
    {
      id = "campus-lounge";
      name = "CampusLounge";
      description = "Student nurse community platform";
      url = "https://campuslounge.app";
      iconEmoji = "👩‍🎓";
      category = "Community";
    },
    {
      id = "faculty-lounge";
      name = "FacultyLounge";
      description = "Nurse educators network";
      url = "https://facultylounge.app";
      iconEmoji = "👩‍🏫";
      category = "Networking";
    },
    {
      id = "nursicon";
      name = "Nursicon";
      description = "Nursing icons & visual assets";
      url = "https://nursicon.app";
      iconEmoji = "👩‍⚕️";
      category = "Design";
    },
    {
      id = "rnsider";
      name = "RNsider";
      description = "Nursing news & insights";
      url = "https://rnsider.app";
      iconEmoji = "📰";
      category = "News";
    },
    {
      id = "omof";
      name = "Omof";
      description = "One moment of focus — wellness";
      url = "https://omof.app";
      iconEmoji = "🧘‍♀️";
      category = "Wellness";
    },
    {
      id = "sup-nurse";
      name = "SupNurse";
      description = "Nurse peer support community";
      url = "https://supnurse.app";
      iconEmoji = "💬";
      category = "Community";
    },
    {
      id = "nurse-idea";
      name = "NurseIdea";
      description = "Nursing innovation ideas";
      url = "https://nurseidea.app";
      iconEmoji = "💡";
      category = "Innovation";
    },
    {
      id = "nursing-innoverse";
      name = "NursingInnoverse";
      description = "Nursing innovation universe";
      url = "https://nursinginnoverse.app";
      iconEmoji = "🌌";
      category = "Innovation";
    },
    {
      id = "nurse-forge";
      name = "NurseForge";
      description = "Nurse career builder";
      url = "https://nurseforge.app";
      iconEmoji = "🏭";
      category = "Career";
    },
    {
      id = "scrub-life";
      name = "ScrubLife";
      description = "Nursing apparel & gear";
      url = "https://scrublife.app";
      iconEmoji = "👕";
      category = "Shopping";
    },
    {
      id = "nurse-fluencers";
      name = "NurseFluencers";
      description = "Nurse influencer network";
      url = "https://nursefluencers.app";
      iconEmoji = "🌟";
      category = "Networking";
    },
    {
      id = "suggest-a-tool";
      name = "Suggest a Tool";
      description = "Submit your tool ideas";
      url = "https://nurseecosystem.com";
      iconEmoji = "📝";
      category = "Submission";
    },
  ];

  system func preupgrade() {
    chatSessions.clear();
    messages.clear();
    userProfiles.clear();

    tools.clear();
    for (tool in staticToolsArray.values()) {
      let id = tool.id;
      tools.add(id, tool);
    };
  };

  // Required profile functions per instructions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Chat session functions
  public shared ({ caller }) func createChatSession(initialMessage : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create chat sessions");
    };

    let sessionId = "session-" # sessionCounter.toText();
    sessionCounter += 1;

    let newSession : ChatSession = {
      id = sessionId;
      title = initialMessage;
      createdAt = Time.now();
      updatedAt = Time.now();
      messageCount = 0;
    };

    let callerSessions = switch (chatSessions.get(caller)) {
      case (null) {
        let newSessions = Map.empty<Text, ChatSession>();
        newSessions.add(sessionId, newSession);
        newSessions;
      };
      case (?sessions) {
        sessions.add(sessionId, newSession);
        sessions;
      };
    };

    chatSessions.add(caller, callerSessions);

    let initialMsg : Message = {
      id = "message-" # messageCounter.toText();
      sessionId;
      role = "user";
      content = initialMessage;
      timestamp = Time.now();
    };
    messageCounter += 1;

    let sessionMessages = List.fromArray<Message>([initialMsg]);
    messages.add((caller, sessionId), sessionMessages);

    sessionId;
  };

  public query ({ caller }) func listChatSessions() : async [ChatSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list chat sessions");
    };

    switch (chatSessions.get(caller)) {
      case (null) { [] };
      case (?sessions) { sessions.values().toArray().sort() };
    };
  };

  public shared ({ caller }) func deleteChatSession(sessionId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete chat sessions");
    };

    switch (chatSessions.get(caller)) {
      case (null) { Runtime.trap("No sessions found") };
      case (?sessions) {
        if (not sessions.containsKey(sessionId)) {
          Runtime.trap("Session not found");
        };
        sessions.remove(sessionId);
        messages.remove((caller, sessionId));
      };
    };
  };

  public shared ({ caller }) func addMessage(sessionId : Text, role : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add messages");
    };

    let messageId = "message-" # messageCounter.toText();
    messageCounter += 1;

    let newMessage : Message = {
      id = messageId;
      sessionId;
      role;
      content;
      timestamp = Time.now();
    };

    switch (messages.get((caller, sessionId))) {
      case (null) {
        let newList = List.empty<Message>();
        newList.add(newMessage);
        messages.add((caller, sessionId), newList);
      };
      case (?msgs) {
        msgs.add(newMessage);
      };
    };

    switch (chatSessions.get(caller)) {
      case (null) { Runtime.trap("No sessions found") };
      case (?sessions) {
        switch (sessions.get(sessionId)) {
          case (null) { Runtime.trap("Session not found") };
          case (?session) {
            let updatedSession = {
              session with
              updatedAt = Time.now();
              messageCount = session.messageCount + 1;
            };
            sessions.add(sessionId, updatedSession);
          };
        };
      };
    };
  };

  public query ({ caller }) func getMessages(sessionId : Text) : async [Message] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get messages");
    };

    switch (messages.get((caller, sessionId))) {
      case (null) { [] };
      case (?msgs) { msgs.toArray() };
    };
  };

  public shared ({ caller }) func getFlorenceResponse(userMessage : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get Florence responses");
    };

    if (userMessage.contains(#text "tired") or userMessage.contains(#text "burned out")) {
      "🏮 Florence: It sounds like you're doing your best and could use some rest. Have you checked out our peer support at SupNurse?";
    } else if (userMessage.contains(#text "job") or userMessage.contains(#text "career")) {
      "🏮 Florence: The nursing field has plenty of opportunities. Explore some career resources at NurseForge!";
    } else if (userMessage.contains(#text "scrubs") or userMessage.contains(#text "clothes")) {
      "🏮 Florence: ScrubLife has some great options for nursing apparel!";
    } else if (userMessage.contains(#text "student") or userMessage.contains(#text "school")) {
      "🏮 Florence: If you're looking for study tips or a community, check out CampusLounge!";
    } else if (userMessage.contains(#text "business") or userMessage.contains(#text "startup")) {
      "🏮 Florence: NurseIdea is packed with entrepreneurship resources for nurses. Go check it out!";
    } else {
      "🏮 Florence: You're doing an amazing job! Keep taking care of others AND yourself.";
    };
  };

  // Public tool listing - accessible to all including guests
  public query ({ caller }) func listTools() : async [Tool] {
    tools.values().toArray();
  };
};
