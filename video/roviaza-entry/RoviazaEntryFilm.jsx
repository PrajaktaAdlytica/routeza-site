import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const scenes = [
  {
    from: 0,
    duration: 120,
    src: "assets/story/roviaza-warsaw-traffic.webp",
    origin: "50% 48%",
    x: [-12, 8],
    y: [0, -8],
  },
  {
    from: 90,
    duration: 120,
    src: "assets/story/roviaza-dispatch-room.webp",
    origin: "58% 46%",
    x: [10, -8],
    y: [3, -4],
  },
  {
    from: 180,
    duration: 120,
    src: "assets/story/roviaza-driver-recovery.webp",
    origin: "70% 48%",
    x: [-8, 12],
    y: [4, -5],
  },
  {
    from: 270,
    duration: 120,
    src: "assets/story/roviaza-cold-chain-depot.webp",
    origin: "58% 52%",
    x: [8, -10],
    y: [2, -7],
  },
];

function DocumentaryScene({ scene }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeFrames = Math.round(0.8 * fps);
  const opacity = interpolate(
    frame,
    [0, fadeFrames, scene.duration - fadeFrames, scene.duration],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity, backgroundColor: "#061315" }}>
      <Img
        src={staticFile(scene.src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: scene.origin,
          scale: interpolate(frame, [0, scene.duration], [1.075, 1.015], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: `${interpolate(frame, [0, scene.duration], scene.x, {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px ${interpolate(frame, [0, scene.duration], scene.y, {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px`,
          filter: "saturate(0.82) contrast(1.08) brightness(0.88)",
        }}
      />
    </AbsoluteFill>
  );
}

export function RoviazaEntryFilm() {
  const frame = useCurrentFrame();
  const closingShade = interpolate(frame, [360, 389], [0, 0.42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#061315" }}>
      {scenes.map((scene) => (
        <Sequence key={scene.src} from={scene.from} durationInFrames={scene.duration}>
          <DocumentaryScene scene={scene} />
        </Sequence>
      ))}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 62% 46%, transparent 12%, rgba(3, 15, 17, 0.2) 58%, rgba(3, 15, 17, 0.58) 100%)",
        }}
      />
      <AbsoluteFill style={{ backgroundColor: `rgba(3, 15, 17, ${closingShade})` }} />
    </AbsoluteFill>
  );
}
