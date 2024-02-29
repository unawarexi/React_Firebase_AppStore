const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { user } = require("firebase-functions/v1/auth");

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
        let userData;
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
            userData = decodedToken;
            userData.role = "member";
            await userRef.set(userData);
            return response.status(200).json({ Success: true, user: userData });
          } else {
            return response
              .status(200)
              .json({ Success: true, user: doc.data() });
          }
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

// function to save app data to cloud
exports.createNewApp = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const appData = req.body;
      const docRef = db.collection("Apps").doc(req.body._id);
      
      // Set data to the document
      await docRef.set(appData);

      // Retrieve data from the cloud
      const appDetailSnapshot = await docRef.get();
      const appDetailData = appDetailSnapshot.data(); 
      
      // Respond with created document data
      res.status(201).json({ _id: docRef.id, appData: appDetailData });
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ error: "Could not create post" });
    }
  });
});