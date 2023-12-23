import { Member, Profile, Server } from "@prisma/client";

type ServerWithMembersWithProfiles = Server & {
  Member: (Member & { profile: Profile })[];
};

// export type ServerWithMembersWithProfiles = Server & {
//   members: (Member & { profile: Profile })[];
// };
