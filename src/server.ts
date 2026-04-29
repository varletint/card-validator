// Load environment variables from .env file before importing the app
import dotenv from "dotenv";
dotenv.config();

// Import the configured Express application instance
import app from "./app.js";

// Determine the port to bind to (e.g., from a cloud provider or fallback to 3000 locally)
const PORT = process.env.PORT ?? 3000;

// Start the Express server and begin listening for incoming connections
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
