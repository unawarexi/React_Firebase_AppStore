const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });

//initialize admin

admin.initializeApp();

//initialize the db instance

const db = admin.firestore();

// function to validatethe user jwt token coming from the app.jsx in client folder
exports.validateUserJWTToken = functions.https.onRequest(
  async (request, response) => {
    // enabling cors
    cors(request, response, async () => {
      const authorizationHeader = request.get("Authorization");

      // check if the authorization header is present
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return response.status(401).json({ error: "Unauthorized" });
      }

      // Extract the token from the authorization header
      const token = authorizationHeader.split("Bearer ")[1];

      try {
        // Verify the JWT token
        const decodedToken = await admin
          .auth()
          .verifyIdToken(token, "your-secret-key");

        // If verification is successful, respond with success message
        if (decodedToken) {
          const docRef = db.collection("users").doc(decodedToken.uid);
          const doc = await docRef.get();

          if (!doc.exists) {
            const userRef = await db.collection("users").doc(decodedToken.uid);
            await userRef.set(decodedToken);
          }

          return response
            .status(200)
            .json({ Success: true, user: decodedToken });
        }
      } catch (error) {
        console.error("Token validation error: ", error.message);
        return response
          .status(401)
          .json({ error: error.message, status: "Unauthorized" });
      }
    });
  }
);
