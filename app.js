// Import the Express module
import express from "express";

// Import routes
import authRoutes from "./routes/auth.js";
import indexRoutes from "./routes/index.js";
import userRoutes from "./routes/user.js";
import wellnessRoutes from "./routes/wellness.js"
import teamRoutes from "./routes/team.js";

// Import middleware
import { isContentTypeApplicationJSON } from "./middleware/utils.js";

// Create an Express application
const app = express();

// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(isContentTypeApplicationJSON);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/teams", teamRoutes);
app.use("/", indexRoutes);

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(
        `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
    );
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;

