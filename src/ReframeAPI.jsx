const lv95towgs84 = "http://geodesy.geo.admin.ch/reframe/lv95towgs84";
const wgs84tolv95 = "http://geodesy.geo.admin.ch/reframe/wgs84tolv95";

export async function LV95toWGS84({
  eastingE,
  northingE,
  Error,
  setEastingA,
  setNorthingA,
  setError,
}) {
  try {
    const response = await fetch(
      `${lv95towgs84}?easting=${eastingE}&northing=${northingE}&format=json`
    );

    if (!response.ok) {
      throw new Error("Transformation ist fehlgeschlagen!!");
    }
    const data = await response.json();

    setNorthingA(data.northing);
    setEastingA(data.easting);
    setError("");
  } catch (error) {
    console.error("Transformation ist fehlgeschlagen!!", error);
    setError("Transformation ist fehlgeschlagen");
  }

  console.log("LV95toWGS84");
}

export async function WGS84toLV95({
  eastingE,
  northingE,
  Error,
  setEastingA,
  setNorthingA,
  setError,
}) {
  try {
    const response = await fetch(
      `${wgs84tolv95}?easting=${eastingE}&northing=${northingE}&format=json`
    );

    if (!response.ok) {
      throw new Error("Transformation ist fehlgeschlagen!!");
    }
    const data = await response.json();

    setNorthingA(data.northing);
    setEastingA(data.easting);
    setError("");
  } catch (error) {
    console.error("Transformation ist fehlgeschlagen!!", error);
    setError("Transformation ist fehlgeschlagen");
  }

  console.log("WGS84toLV95");
}
