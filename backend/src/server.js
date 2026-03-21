import express from 'express';
import {ENV} from './config/env.js';
import {db} from './config/db.js';

const app = express();
const PORT = ENV.PORT || 5001;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({success: true});
});

app.get("/api/favorites", async (req, res) => {
    try {
        const {userId, receipId,  title, image, cookTime, servings} = req.body;

        if (!userId || !receipId || !title) {
            return res.status(400).json({error: "Missing required fields"});
        }
        await db.insert(favoriteTable).values({userId, receipId, title, image, cookTime, servings}).returning();
        res.status(201).json(newFavorite[0]);

    } catch (error) {
        console.log("Error adding favorite", error);
        res.status(500).json({error: "Something went wrong"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});