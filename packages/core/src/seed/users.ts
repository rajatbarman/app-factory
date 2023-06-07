import { users } from "../db/schema";
import { db } from "../db";

export default function() {
  const user = {
    fullName: "Rajat Barman",
    email: "narutoaof@gmail.com",
  };

  return db.insert(users).values(user);
}
