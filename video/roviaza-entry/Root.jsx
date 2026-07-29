import { Composition } from "remotion";
import { RoviazaEntryFilm } from "./RoviazaEntryFilm.jsx";

export function RoviazaEntryRoot() {
  return (
    <Composition
      id="RoviazaEntryFilm"
      component={RoviazaEntryFilm}
      durationInFrames={390}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
