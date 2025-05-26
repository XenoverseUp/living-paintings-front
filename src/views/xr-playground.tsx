import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";

import panoSrc from "@/assets/pano.jpeg";
import depthSrc from "@/assets/depth.jpeg";
import EnableXR from "@/components/enable-xr";

function XRPlayground() {
  const panorama = useLoader(THREE.TextureLoader, panoSrc);
  const depthMap = useLoader(THREE.TextureLoader, depthSrc);

  return (
    <div className="bg-background relative isolate h-screen w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 0] }}>
        <EnableXR />

        {/* Lights and scene */}
        <Lights />
        <Panorama panorama={panorama} depthMap={depthMap} />
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
    <mesh>
      <sphereGeometry args={[25, 200, 100]} />
      <meshStandardMaterial
        map={panorama}
        displacementMap={depthMap}
        displacementScale={400}
        displacementBias={-25}
        metalness={0}
        roughness={1}
        side={THREE.BackSide}
        alphaTest={0.1}
        opacity={1}
        transparent={true}
        dithering={true}
      />
    </mesh>
  );
}

export default XRPlayground;
