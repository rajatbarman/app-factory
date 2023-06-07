import {db, dbSchema} from '@core/db'

export default function({ fullName, email } : {fullName?: string, email: string}) {
  const user = {
    fullName,
    email,
  }
  return db.insert(dbSchema.users).values(user)
}
