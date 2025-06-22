import { useAnimations, useGLTF, useScroll, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

useGLTF.preload('./assets/robot_playground.glb');

const isslQuestions = [
  {
    id: 'q1',
    question: 'What is ISSL Network?',
    answer:
      'ISSL Network offers AI-powered solutions that help businesses automate tasks like appointment booking, lead follow-ups, and ad generation. We enable companies to scale faster, save time, and increase profitability through intelligent automation.',
  },
  {
    id: 'q2',
    question: 'How does your AI assistant work?',
    answer:
      'Our AI assistant is designed to handle your business operations 24/7. It automatically responds to customer inquiries, schedules appointments, sends follow-up emails, and even engages with leads on social media — all while learning from your business to improve over time.',
  },
  {
    id: 'q3',
    question: 'Will the AI integrate with my existing systems?',
    answer:
      'Yes! Our platform is built to integrate seamlessly with your existing tools and workflows. Whether you use CRMs, social media platforms, or email marketing systems, our AI will easily plug into your processes, boosting efficiency without the need for complicated setups.',
  },
  {
    id: 'q4',
    question: 'How will AI automation save me time?',
    answer:
      "AI automation handles routine tasks like appointment scheduling, responding to leads, and sending follow-up emails, allowing you to focus on more strategic activities. With AI doing the repetitive work, you'll save valuable hours each week.",
  },
  {
    id: 'q5',
    question: 'How can this platform help my business grow and save costs?',
    answer:
      'By automating repetitive tasks, optimizing workflows, and providing data-driven insights, our platform helps you increase efficiency and reduce operational costs. This allows you to focus on strategic goals and business expansion.',
  },
  {
    id: 'q6',
    question: "How quickly can I see results from using ISSL Network's AI solutions?",
    answer:
      "You can start seeing improvements within the first few weeks as our AI tools automate key processes, boost engagement, and optimize your workflows. Over time, as the AI learns from your business, you'll notice even more significant results in efficiency, lead conversion, and overall growth.",
  },
];

export const Model = ({ mouse }) => {
  const groupRef = useRef(null);
  const { camera } = useThree();
  const { animations, scene } = useGLTF('./assets/robot_playground.glb');
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();

  const originalCameraPos = useRef({ x: camera.position.x, y: camera.position.y, z: camera.position.z });
  const originalCameraRot = useRef({ x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z });

  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isslMenuOpen, setIsslMenuOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [initialMessageShown, setInitialMessageShown] = useState(true);

  const dialogue = [
    "Hi there! Welcome to my playground.",
    "This is a fun little world where you can learn about ISSL.",
    "Would you like to look around or hear a joke?",
  ];

  const mainChoices = ["About ISSL", "Tell me a joke", "Look around", "Goodbye"];
  const isslChoices = [...isslQuestions.map(q => q.question), "Goodbye"];

  useEffect(() => {
    if (actions["Experiment"]) {
      actions["Experiment"].play();
      actions["Experiment"].paused = true;
    }

    const timeout = setTimeout(() => {
      setInitialMessageShown(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [actions]);

  const handleClick = () => {
    originalCameraPos.current = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    originalCameraRot.current = { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z };

    gsap.to(camera.position, {
      x: 0,
      y: 1.5,
      z: 2,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(camera.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    setShowDialogue(true);
    setDialogueStep(0);
    setMenuOpen(false);
    setIsslMenuOpen(false);
    setResponse(null);
  };

  const handleContinue = () => {
    if (dialogueStep < dialogue.length - 1) {
      setDialogueStep(dialogueStep + 1);
    } else {
      setMenuOpen(true);
    }
  };

  const handleChoice = (choice) => {
    if (!isslMenuOpen) {
      if (choice === "Goodbye") {
        zoomOutAndClose();
      } else if (choice === "Look around") {
        setResponse("Feel free to explore all around this playground!");
        setMenuOpen(false);
      } else if (choice === "Tell me a joke") {
        setResponse("Why did the robot go to the party? Because it had a lot of bytes!");
        setMenuOpen(false);
      } else if (choice === "About ISSL") {
        setIsslMenuOpen(true);
        setResponse(null);
        setMenuOpen(true);
      }
    } else {
      if (choice === "Goodbye") {
        zoomOutAndClose();
      } else {
        const found = isslQuestions.find(q => q.question === choice);
        if (found) {
          setResponse(found.answer);
          setMenuOpen(false);
        }
      }
    }
  };

  const backToMenu = () => {
    setResponse(null);
    setMenuOpen(true);
  };

  const zoomOutAndClose = () => {
    gsap.to(camera.position, {
      x: originalCameraPos.current.x,
      y: originalCameraPos.current.y,
      z: originalCameraPos.current.z,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(camera.rotation, {
      x: originalCameraRot.current.x,
      y: originalCameraRot.current.y,
      z: originalCameraRot.current.z,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => {
        setShowDialogue(false);
        setMenuOpen(false);
        setResponse(null);
        setDialogueStep(0);
        setIsslMenuOpen(false);
      },
    });
  };

  // ✅ NEW FUNCTION to only zoom out
  const zoomOutOnly = () => {
    gsap.to(camera.position, {
      x: originalCameraPos.current.x,
      y: originalCameraPos.current.y,
      z: originalCameraPos.current.z,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(camera.rotation, {
      x: originalCameraRot.current.x,
      y: originalCameraRot.current.y,
      z: originalCameraRot.current.z,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  useFrame(() => {
    if (!groupRef.current || !actions["Experiment"]) return;

    const clipDuration = actions["Experiment"].getClip().duration;
    actions["Experiment"].time = clipDuration * scroll.offset;

    groupRef.current.rotation.y += (mouse.x * 0.5 - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (mouse.y * 0.3 - groupRef.current.rotation.x) * 0.1;

    groupRef.current.position.x += (mouse.x * 0.2 - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y += (mouse.y * 0.1 - groupRef.current.position.y) * 0.1;
  });

  return (
  <group ref={groupRef} onClick={handleClick}>
    <primitive object={scene} />

    {(initialMessageShown || showDialogue) && (
      <Html position={[0, 2.2, 0]} center distanceFactor={8}>
        <div style={styles.bubble} onClick={e => e.stopPropagation()}>
          {initialMessageShown && (
            <p style={styles.text}><strong>Scroll for animation and click me for answers!</strong></p>
          )}

          {!initialMessageShown && !menuOpen && !response && (
            <>
              <p style={styles.text}>{dialogue[dialogueStep]}</p>
              {/* Flex container to swap button positions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <button style={styles.zoomButton} onClick={zoomOutOnly}>
                  🔍 Zoom Out
                </button>
                <button style={styles.button} onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </>
          )}

          {!initialMessageShown && menuOpen && !response && (
            <div style={styles.choices}>
              {(isslMenuOpen ? isslChoices : mainChoices).map((choice, i) => (
                <button
                  key={i}
                  style={styles.choiceButton}
                  onClick={() => handleChoice(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}

          {!initialMessageShown && response && (
            <>
              <p style={styles.text}>{response}</p>
              <button style={styles.button} onClick={backToMenu}>
                Back to menu
              </button>
            </>
          )}

          {/* Removed the separate zoom button from here since it’s included above */}
        </div>
        <div style={styles.tail} />
      </Html>
    )}
  </group>
);
};

const styles = {
  bubble: {
    position: "absolute",
    background: "none",
    borderRadius: "24px",
    padding: "20px 24px",
    width: "320px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    textAlign: "center",
    color: "#3a3a3a",
    userSelect: "none",
  },
  text: {
    marginBottom: "16px",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  button: {
    padding: "10px 20px",
    fontSize: "15px",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#79C267",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 3px 6px rgba(192, 0, 250, 0.6)",
    transition: "background-color 0.3s ease",
  },
  zoomButton: {
    marginTop: "10px",
    padding: "8px 14px",
    fontSize: "13px",
    borderRadius: "16px",
    backgroundColor: "none",
    color: "#C8A2C8",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  choices: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  choiceButton: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "20px",
    backgroundColor: "#FFFFFF",
    color: "#4a4a4a",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 3px 6px rgba(115, 0, 255, 0.7)",
    transition: "background-color 0.3s ease",
  },
  tail: {
    position: "hidden",
    bottom: "-16px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "16px solid transparent",
    borderRight: "16px solid transparent",
    borderTop: "16px solid transparent",
  },
};