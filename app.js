// Import the Express module and other modules
import express from "express";
import indexRoutes from "./routes/index.js";
import userRoutes from "./routes/user.js";
import { isContentTypeApplicationJSON } from "./middleware/utils.js";

// Create an Express application
const app = express();

// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes);
app.use("/", indexRoutes);
app.use(isContentTypeApplicationJSON);

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(
        `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
    );
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;

