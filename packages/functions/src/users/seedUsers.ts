import {db} from '@core/db/index'
import seedUsers from '@core/seed/users'

export const handler = async () => {
  try {
    await seedUsers()
  } catch (e) {
    console.log('Error when seeding users', e)
  }
}
