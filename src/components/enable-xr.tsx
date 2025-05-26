import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { XRButton } from "three/examples/jsm/webxr/XRButton.js";

export default function EnableXR() {
  const { gl } = useThree();

  useEffect(() => {
    gl.xr.enabled = true;

    const button = XRButton.createButton(gl);
    document.body.appendChild(button);

    return () => {
      document.body.removeChild(button);
    };
  }, [gl]);

  return null;
}
