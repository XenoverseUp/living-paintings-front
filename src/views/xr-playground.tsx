import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";

import defaultPanoSrc from "@/assets/curated/accolade/pano.jpg";
import defaultDepthSrc from "@/assets/curated/accolade/depth.jpg";
import EnableXR from "@/components/enable-xr";
import { useParams } from "react-router";
import useQuery from "@/lib/hooks/useQuery";
import { Suspense, useEffect, useState } from "react";
import AdjustCamera from "@/components/adjust-camera";

function XRPlayground() {
  const { id } = useParams();
  const query = useQuery();

  const [panoSrc, setPanoSrc] = useState<string>(defaultPanoSrc);
  const [depthSrc, setDepthSrc] = useState<string>(defaultDepthSrc);

  useEffect(() => {
    if (query.get("local") === "true" && id) {
      import(`@/assets/curated/${id}/pano.jpg`).then((mod) =>
        setPanoSrc(mod.default),
      );

      import(`@/assets/curated/${id}/depth.jpg`).then((mod) =>
        setDepthSrc(mod.default),
      );
    }
  }, [id, query]);

  const [panorama, depthMap] = useLoader(THREE.TextureLoader, [
    panoSrc,
    depthSrc,
  ]);

  return (
    <div className="relative isolate h-screen w-full overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 0] }}>
        <Suspense fallback={null}>
          <EnableXR />

          {/* Lights and scene */}
          <Lights />
          <Panorama panorama={panorama} depthMap={depthMap} />
        </Suspense>
      </Canvas>
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
  panorama,
  depthMap,
}: {
  panorama: THREE.Texture;
  depthMap: THREE.Texture;
}) {
  return (
    <mesh scale={[-1, 1, 1]} rotation={[0, -Math.PI / 2, 0]}>
      <sphereGeometry args={[500, 200, 100]} />
      <meshStandardMaterial
        map={panorama}
        displacementMap={depthMap}
        displacementScale={200}
        displacementBias={-50}
        side={THREE.BackSide}
        metalness={0}
        roughness={1}
        dithering={true}
      />
    </mesh>
  );
}

export default XRPlayground;
