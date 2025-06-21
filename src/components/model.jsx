import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

useGLTF.preload('./assets/robot_playground.glb');

export const Model = ({ mouse }) => {
  const groupRef = useRef(null);
  const { animations, scene } = useGLTF('./assets/robot_playground.glb');
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    if (actions["Experiment"]) {
      actions["Experiment"].play();
      actions["Experiment"].paused = true;
    }
  }, [actions]);

  useFrame(() => {
    if (!groupRef.current || !actions["Experiment"]) return;

    // Animate on scroll
    const clipDuration = actions["Experiment"].getClip().duration;
    actions["Experiment"].time = clipDuration * scroll.offset;

    // Smoothly rotate model based on mouse position
    // mouse.x and mouse.y expected to be normalized between -1 and 1
    groupRef.current.rotation.y += (mouse.x * 0.5 - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (mouse.y * 0.3 - groupRef.current.rotation.x) * 0.1;

    // Optional subtle parallax movement
    groupRef.current.position.x += (mouse.x * 0.2 - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y += (mouse.y * 0.1 - groupRef.current.position.y) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};
