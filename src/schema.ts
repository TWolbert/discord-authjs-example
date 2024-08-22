import {
  index,
  int,
  mysqlTable,
  bigint,
  text,
  char,
  varchar,
  boolean,
  datetime
} from 'drizzle-orm/mysql-core';

/**
 * This table links Discord users who OAuth with us, and gives them an 
 * identifier (AKA "silly string") which they will put into their Rumble client
 * mod (Rombly). The client mod will submit this silly string so we know which
 * discord user we are working with.
 * 
 * discordUserId
 * discordDisplayName
 * sillyString: This should be some GUID to give to the Rumble client mod.
 * lastUpdated
 */
export const discordUsers = mysqlTable('discord_user', {
  discordUserId: bigint('discord_user_id', { mode: 'number' }).primaryKey(),
  discordDisplayName: varchar('discord_display_name', { length: 32 }).notNull(),
  profilePictureUrl: text('profile_picture_url').notNull(),
  discordUserEmail: varchar('discord_user_email', { length: 64 }).notNull(),
  userColor: varchar('user_color', { length: 7 }).notNull(),
  lastUpdated: datetime('last_updated').notNull()
})

export const linkingCodes = mysqlTable('linking_code', {
  linkingCode: char('linking_code').primaryKey(),
  discordUserId: bigint('discord_user_id', { mode: 'number' }).references(() => discordUsers.discordUserId),
  lastUpdated: datetime('last_updated').notNull()
});

/**
 * This contains Rumble based on a Buckethead issued ID.
 * 
 * bucketheadId: In Rumble, there is a unique string that can be used to 
 *  identify each player (words of pep).
 * discordUserId: If a registered Discord user has used the client mod, we will
 *  populate this field.
 */
export const rumbleProfiles = mysqlTable('rumble_profile', {
  // TODO: Find out more about this ID. How long is it?
  bucketheadId: varchar('buckethead_id', { length: 64 }).primaryKey(),
  discordUserId: bigint('discord_user_id', { mode: 'number' }).unique()
    .references(() => discordUsers.discordUserId),
  rumbleDisplayName: varchar('rumble_display_name', { length: 48 }).notNull(), 
  isOculus: boolean('is_oculus').notNull(), // TODO: What is this about?
  bp: int('bp').notNull().default(0)
})

const schema = {
  discordUsers,
  linkingCodes,
  rumbleProfiles
}