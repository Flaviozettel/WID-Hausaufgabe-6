import { useState } from "react";
import { Typography, Button } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LV95toWGS84, WGS84toLV95 } from "./ReframeAPI";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import "./App.css";

function App() {
  const [methode, setMethode] = useState("");
  const [eastingE, setEastingE] = useState("");
  const [northingE, setNorthingE] = useState("");
  const [eastingA, setEastingA] = useState("");
  const [northingA, setNorthingA] = useState("");

  async function Berechnung() {
    const props = { eastingE, northingE, setEastingA, setNorthingA };
    if (methode === "LV95toWGS84") {
      await LV95toWGS84(props);
    } else if (methode === "WGS84toLV95") {
      await WGS84toLV95(props);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,

        p: 2,
        boxShadow: 3,
        borderRadius: 6,
      }}
    >
      <Grid2 container spacing={2}>
        <div>
          <Grid2 xs={12}>
            <Typography variant="h3">Umrechnung ...</Typography>
          </Grid2>
          <Grid2 xs={12}>
            <Select
              sx={{ width: "100%", maxWidth: "500", height: 40 }}
              placeholder="Methode"
              value={methode} //erhält den Wert von useState. Steuert aber nicht die Darstellung für den User, sondern dient zur Kontrolle, dass sich die Methode mit der Benutzereingabe ändert. Probleme würde es geben, wenn "methode" nicht nur über select geändert wird, d.H. dass methode z.B. mit einem 2. Dropdown verändert wird, aber dann im ersten nicht aktuallisiert. // Mit Value in Select wird dies verhindert und des wird immer das aktuelle Value angezeigt + das dementsprechende Item gewählt
              onChange={(e) => setMethode(e.target.value)}
            >
              <MenuItem value="LV95toWGS84">LV95toWGS84</MenuItem>
              <MenuItem value="WGS84toLV95">WGS84toLV95</MenuItem>
            </Select>
          </Grid2>
        </div>
        <Grid2 xs={6}>
          <TextField
            fullWidth
            className="Input"
            type="text"
            placeholder="Eingabe Ost"
            onChange={(e) => setEastingE(e.target.value)}
          />
        </Grid2>
        <Grid2 xs={6}>
          <TextField
            fullWidth
            className="Input"
            type="text"
            placeholder="Eingabe Nord"
            onChange={(e) => setNorthingE(e.target.value)}
          />
        </Grid2>

        <Grid2
          xs={12}
          sx={{
            width: "100%",
            paddingLeft: 4,
            backgroundColor: "#cceeff",
            marginRight: 8,
          }}
        >
          <Button onClick={Berechnung}>Transform</Button>
        </Grid2>

        <Grid2 xs={6}>
          <TextField
            fullWidth
            className="Input"
            type="text"
            placeholder="Ausgabe Ost"
            value={eastingA}
            readOnly
          />
        </Grid2>
        <Grid2 xs={6}>
          <TextField
            fullWidth
            className="Input"
            type="text"
            placeholder="Ausgabe Nord"
            value={northingA}
            readOnly
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default App;
