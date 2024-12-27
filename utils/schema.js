import {pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';

export const MockInverview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jsonPosition: varchar('jsonPosition').notNull(),
    jsonDesc: varchar('jsonDesc').notNull(),
    jsonExperience: varchar('jsonExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()




    });