import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";

import EnableXR from "@/components/enable-xr";
import { useParams } from "react-router";
import useQuery from "@/lib/hooks/useQuery";
import { Suspense, useEffect, useState } from "react";
import { RectangleGoggles } from "lucide-react";

function XRPlayground() {
  const { id } = useParams();
  const query = useQuery();

  const [panoPath, setPanoPath] = useState<string | null>(null);
  const [depthPath, setDepthPath] = useState<string | null>(null);

  useEffect(() => {
    if (query.get("local") === "true" && id) {
      import(`@/assets/curated/${id}/pano.jpg`).then((mod) =>
        setPanoPath(mod.default),
      );
      import(`@/assets/curated/${id}/depth.jpg`).then((mod) =>
        setDepthPath(mod.default),
      );
    }
  }, [id, query]);

  const isReady = panoPath && depthPath;

  return (
    <div className="relative isolate flex h-screen w-full items-center justify-center overflow-hidden bg-black">
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
          {isReady && <Panorama panoSrc={panoPath} depthSrc={depthPath} />}
        </Canvas>
      </Suspense>
    </div>
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

function Panorama({
  panoSrc,
  depthSrc,
}: {
  panoSrc: string;
  depthSrc: string;
}) {
  const [panorama, depthMap] = useLoader(THREE.TextureLoader, [
    panoSrc,
    depthSrc,
  ]);
  return (
    <mesh
      scale={[-1, 1, 1]}
      position={[0, 2, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <sphereGeometry args={[6, 1024, 1024]} />
      <meshStandardMaterial
        map={panorama}
        displacementMap={depthMap}
        displacementScale={4}
        displacementBias={-2}
        side={THREE.BackSide}
        metalness={0}
        roughness={0.6}
        dithering={true}
      />
    </mesh>
  );
}

export default XRPlayground;
