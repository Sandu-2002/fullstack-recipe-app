import {pgTable, serial, text, timestamp, integer} from 'drizzle-orm/pg-core';

export const favoritesTable = pgTable('favorites', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), 
    recipeId: integer('recipe_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    title : text('title').notNull(),
    Image: text('image').notNull(),
    cookTime: text('cook_time').notNull(),
    servings: text('servings').notNull(),      
});