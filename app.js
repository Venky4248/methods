const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const paths = path.join(__dirname, "cricketTeam.db");

let ans = null;
const initialize = async () => {
  try {
    ans = await open({
      filename: paths,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("running");
    });
  } catch (e) {
    console.log(`error:${e.message}`);
    process.exit(1);
  }
};
initialize();
app.get("/players/", async (request, response) => {
  const query = `SELECT * FROM cricket_team;`;
  const res = await db.all(query);
  response.send(res);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const query1 = `INSERT INTO cricket_team(playerName,jerseyNumber,role) VALUES(${playerName},
        ${jerseyNumber},
        ${role})`;
  const answer = await db.run(query1);
  const result = answer.lastID;
  response.send("Player Added to Team");
});
app.get("/players/:playerId/", async (request, response) => {
  const playerId = request.params;
  const query2 = `
        SELECT 
            *
        From 
        cricket_team
        WHERE player_id=${playerId}`;
  const ans1 = await db.get(query2);
  response.send(ans1);
});
app.put("/players/:playerId/", async (request, response) => {
  const details = request.body;
  const { playerName, jerseyNumber, role } = details;
  const playerId = request.params;
  const query3 = `
    UPDATE
    cricket_team
    SET
    "playerName=${playerName}
    jerseyNumber=${jerseyNumber}"
    role=${role}`;
  const ans2 = await db.run(query3);
  response.send("Player Details Updated");
});
app.delete("/players/:playerId/", async (request, response) => {
  const playerId = request.params;
  const final = `
    DELETE 
    FROM 
    cricket_team
    WHERE player_Id=${playerId}`;
  const ans4 = await db.run(final);
  response.send("Player Removed");
});
