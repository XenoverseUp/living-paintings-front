import * as THREE from "three";

import { Canvas, useLoader, useThree } from "@react-three/fiber";

import EnableXR from "@/components/enable-xr";
import { Link, useParams } from "react-router";
import useQuery from "@/lib/hooks/useQuery";
import { Suspense, useEffect, useState } from "react";
import { ArrowLeft, RectangleGoggles } from "lucide-react";

function XRPlayground() {
  const { id } = useParams();
  const query = useQuery();

  const [panoPath, setPanoPath] = useState<string | null>(null);
  const [depthPath, setDepthPath] = useState<string | null>(null);
  const [audioPath, setAudioPath] = useState<string | null>(null);

  const [isReady, setIsReady] = useState({
    pano: false,
    depth: false,
    audio: false,
  });

  useEffect(() => {
    if (!id) return;

    const isLocal = query.get("local") === "true";

    if (isLocal) {
      const basePath = `/assets/curated/${id}`;

      setPanoPath(`${basePath}/pano.jpg`);
      setDepthPath(`${basePath}/depth.jpg`);
      setAudioPath(`${basePath}/soundscape.mp3`);
    } else {
      setPanoPath(`${import.meta.env.VITE_BACKEND_HOST}/pano/${id}`);
      setDepthPath(`${import.meta.env.VITE_BACKEND_HOST}/depth/${id}`);
      setAudioPath(`${import.meta.env.VITE_BACKEND_HOST}/soundscape/${id}`);
    }

    setIsReady({
      pano: true,
      depth: true,
      audio: true,
    });
  }, [id, query]);

  return (
    <div className="relative isolate flex h-screen w-full items-center justify-center overflow-hidden bg-black select-none">
      <Link to="/">
        <button className="absolute top-4 left-4 z-20 flex items-center justify-center gap-1 overflow-hidden rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm font-medium text-white opacity-85 shadow-lg backdrop-blur-xl select-none hover:bg-black/30">
          <ArrowLeft size={20} />
          Gallery
        </button>
      </Link>
      <Suspense
        fallback={
          <div className="flex w-fit flex-col items-center gap-4 text-white">
            <RectangleGoggles
              className="size-16"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <h1 className="animate-pulse text-lg font-light">
              Loading the VR Experience...
            </h1>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 0] }}>
          <EnableXR />
          <Lights />

          {Object.values(isReady).every((v) => v) && (
            <Panorama
              panoSrc={panoPath!}
              depthSrc={depthPath!}
              audioSrc={audioPath}
              indoor={query.get("env") === "indoor"}
            />
          )}
        </Canvas>
      </Suspense>
    </div>
  );
}

function Panorama({
  panoSrc,
  depthSrc,
  audioSrc,
  indoor,
}: {
  panoSrc: string;
  depthSrc: string;
  audioSrc: string | null;
  indoor?: boolean;
}) {
  const [panorama, depthMap] = useLoader(THREE.TextureLoader, [
    panoSrc,
    depthSrc,
  ]);

  const { camera } = useThree();

  // eslint-disable-next-line
  const audioBuffer = audioSrc ? useLoader(THREE.AudioLoader, audioSrc) : null;

  useEffect(() => {
    if (!audioBuffer) return;

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);
    sound.setBuffer(audioBuffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();

    return () => {
      sound.stop();
      camera.remove(listener);
    };
  }, [camera, audioBuffer]);

  return (
    <mesh
      scale={[-1, 1, 1]}
      position={[0, indoor ? 1.5 : 2, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <sphereGeometry args={[indoor ? 5 : 6, 640, 640]} />
      <meshStandardMaterial
        map={panorama}
        displacementMap={depthMap}
        displacementScale={indoor ? 2 : 4}
        displacementBias={indoor ? -1 : -2}
        side={THREE.BackSide}
        metalness={0}
        roughness={0.6}
        dithering={true}
      />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <directionalLight
        color={0xffffff}
        intensity={0.75}
        position={[0, 1, 0]}
      />
      <ambientLight color={0xffffff} />
      <hemisphereLight
        color={0xffffff}
        groundColor={0x444444}
        intensity={0.75}
        position={[0, 1, 0]}
      />
    </>
  );
}

export default XRPlayground;
