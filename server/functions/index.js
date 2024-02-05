const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });

//initialize admin

admin.initializeApp();

//initialize the db instance

const db = admin.firestore();

// function to validatethe user jwt token coming from the app.jsx in client folder
exports.validateUserJWTToken = functions.https.onRequest(async (req, res) => {
  // enabling cors
  cors(req, res, async () => {
    const authorizationHeader = request.get("Authorization");

    // check if the authorization header is present
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    // Extract the token from the authorization header
    const token = authorizationHeader.split("Bearer")[1];

    try {

       // Verify the JWT token
      const decodedToken = await admin.auth().verifyIdToken(token, "your-secret-key");
      
      // If verification is successful, respond with success message
      if (decodedToken) {
        return res.status(200).json({Success: true, user: decodedToken})
      }

    } catch (error) {
      console.error("Token validation error: ", error.message);
      return response
        .status(401)
        .json({ error: error.message, status: "Unauthorized" });
    }

    // try {
    //   // Check if the request contains the JWT token
    //   const token = request.headers.authorization;
    //   if (!token) {
    //     throw new Error("No token provided");
    //   }

    //   // Extract the token from the authorization header
    //   const bearerToken = token.split(" ")[1];

    //   // Verify the JWT token
    //   const decodedToken = jwt.verify(bearerToken, "your-secret-key");

    //   // If verification is successful, respond with success message
    //   response
    //     .status(200)
    //     .json({ message: "Token is valid", data: decodedToken });

    // } catch (error) {
    //   console.error("Token validation error:", error.message);
    //   response.status(401).json({ error: "Unauthorized" });
    // }
  });
});
