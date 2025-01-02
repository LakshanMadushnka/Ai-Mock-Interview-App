import {pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';

export const MockInverview = pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jsonPosition').notNull(),
    jobDesc: varchar('jsonDesc').notNull(),
    jobExperience: varchar('jsonExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()


    });