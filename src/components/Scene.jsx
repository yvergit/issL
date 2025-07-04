'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Html, useProgress } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Typewriter } from 'react-simple-typewriter';
import { Model } from './model'; // ✅ Ensure this path is correct
import { useScroll } from '@react-three/drei';


// Then, inside your main component's JSX return, just add:


function ButtonOverlay({ buttons, handleButtonClick, activeBtnId, threshold = 0.01 }) {
  const scroll = useScroll(); // MUST be inside Canvas
  const [visible, setVisible] = useState(false)


  return (
    <div
      className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4 z-50 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {buttons.map(({ id, label, img }) => (
        <button
          key={id}
          onClick={() => handleButtonClick(id)}
          className={`relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg transition transform hover:scale-110 ${
            activeBtnId === id ? 'bg-gradient-to-br from-green-400 to-blue-600' : 'bg-transparent'
          }`}
        >
          <img
            src={img}
            alt={`Button ${label}`}
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />
        </button>
      ))}
    </div>
  );
}

const CircularButtons = ({ buttons, handleButtonClick, activeBtnId }) => {
  const [radius, setRadius] = useState(240); // default to desktop

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setRadius(120); // smaller screens
      } else {
        setRadius(240); // desktop
      }
    };

    updateRadius(); // run once on mount
    window.addEventListener('resize', updateRadius); // update on resize

    return () => window.removeEventListener('resize', updateRadius); // cleanup
  }, []);
}


function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% Loading</Html>;
}

const buttonTexts = {
  4: 'ISSL NETWORK EU, 031 685817063, Amsterdamsestraatweg, Utrecht, info@isslnetwork.com',
  5: 'Empowering businesses with innovative solutions, we are committed to providing seamless support and fostering growth. Connect with us for a brighter, smarter future!',
};

// New titles and descriptions for Button 2 clickable rotating titles
const button2Items = [
  {
    title: 'AI Appointment Booking',
    description:
      'Our AI-powered appointment booking system is built to eliminate the back-and-forth of scheduling. It automates the entire process, from client inquiries to confirmed bookings, so your calendar stays full and organized without you lifting a finger. This tool works 24/7 and integrates across websites, social media, and even SMS.',
  },
  {
    title: 'AI Employees',
    description:
      'AI Employees are virtual team members trained to work just like a real staff member, but faster, 24/7, and without burnout. These AI assistants handle routine, repetitive, and time-consuming tasks so your human team can focus on high-impact work.',
  },
  {
    title: 'Automation Solutions',
    description:
      'We offer end-to-end automation solutions designed to streamline your business operations, reduce manual tasks, and boost overall efficiency. From lead generation and follow-ups to scheduling, customer service, and data management, these smart systems are built to save time, cut costs, and scale effortlessly.',
  },
  {
    title: 'Automated Lead Follow-ups',
    description:
      'Our Automated Lead Follow-Up system ensures that no lead ever slips through the cracks. By using smart automation, your business can respond instantly to new inquiries and consistently follow up across SMS, email, and social DMs. It’s like having a persistent sales assistant working 24/7 to close the deal.',
  },
  {
    title: 'Seamless Integration',
    description:
      "Our seamless integration service connects all your tools, systems, and platforms, so your business runs like a well-oiled machine. Whether you're already using CRMs, calendars, marketing platforms, or communication tools, ISSL ensures everything works together smoothly, eliminating headaches and boosting productivity.",
  },
  {
    title: 'Customizable CRM',
    description:
      'Our customizable CRM\'s are designed to fit your business like a glove, built around your specific workflows and industry needs. It helps automate lead follow-ups, appointment scheduling, and client communication across SMS, email, and social media. With AI-driven insights and seamless integrations, it’s all about saving time, boosting conversions, and streamlining how you manage customer relationships. It is also designed to be easy on the eyes compared to a lot of overly complex CRM\'s.',
  },
];

// New titles and descriptions for Button 3 clickable rotating titles
const button3Items = [
  {
    title: 'Odhran Kinning',
    description:
      'Working with ISSL Network transformed our operations. Their AI tools handle bookings, follow-ups, and leads—saving us hours weekly and boosting project inquiries. A total game-changer for construction!',
  },
  {
    title: 'AI Employees',
    description:
      'ISSL built us a full autopilot funnel and handles all our DMs and leads. Since launch, engagement tripled and followers became clients. Highly recommend!',
  },
  {
    title: 'Soon',
    description:
      'New Partnerships and testimonials will be added soon. Stay tuned for more success stories!',
  },
];

// Contact form component
function ContactForm({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-xl max-w-md w-full shadow-[0_0_20px_rgba(0,0,0,0.9)]"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Got a problem we can solve with Ai?</h2>

        <label className="block mb-3 text-gray-700 font-semibold">
          Name
          <input
            type="text"
            name="name"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block mb-3 text-gray-700 font-semibold">
          Email
          <input
            type="email"
            name="email"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block mb-6 text-gray-700 font-semibold">
          Message
          <textarea
            name="message"
            rows={4}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Scene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeText, setActiveText] = useState(null);
  const [activeBtnId, setActiveBtnId] = useState(null);

  const [isAMAOpen, setIsAMAOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [initialStyle, setInitialStyle] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // For Button 2 rotating titles index
  const [btn2Index, setBtn2Index] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialStyle(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // For Button 3 rotating titles index
  const [btn3Index, setBtn3Index] = useState(0);

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialStyle(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Start rotating button2 en 3 titles when Button 2 of 3 is active
  useEffect(() => {
    if (activeBtnId === 2) {
      intervalRef.current = setInterval(() => {
        setBtn2Index((prev) => (prev + 1) % button2Items.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
      setBtn2Index(0);
    }

    return () => clearInterval(intervalRef.current);
  }, [activeBtnId]);

  useEffect(() => {
    if (activeBtnId === 3) {
      intervalRef.current = setInterval(() => {
        setBtn3Index((prev) => (prev + 1) % button3Items.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
      setBtn3Index(0);
    }

    return () => clearInterval(intervalRef.current);
  }, [activeBtnId]);

  const buttons = [
    { id: 1, label: '1', img: '/btn1.png' },
    { id: 2, label: '2', img: '/btn2.png' },
    { id: 3, label: '3', img: '/btn3.png' },
    { id: 4, label: '4', img: '/btn4.png' },
    { id: 5, label: '5', img: '/btn5.png' },
  ];

  const handleButtonClick = (id) => {
    if (id === 1) {
      // Show Contact Form modal for Button 1
      setActiveBtnId(1);
      setActiveText(null);
    } else if (id === 2) {
      // Show modal with clickable rotating titles and descriptions
      setActiveBtnId(2);
    } else if (id === 3) {
      setActiveBtnId(3);
      // no setActiveText here, we handle content differently for Button 2
    } else {
      // For Buttons 4,5 show their typewriter text modals
      setActiveBtnId(id);
      setActiveText(buttonTexts[id]);
    }
  };

  const closeText = () => {
    setActiveBtnId(null);
    setActiveText(null);
  };

  const openAMA = () => {
    setIsAMAOpen(true);
    setSelectedQuestionId(null);
  };

  const closeAMA = () => {
    setIsAMAOpen(false);
    setSelectedQuestionId(null);
  };

  const selectQuestion = (id) => {
    setSelectedQuestionId(id);
  };

  const backToQuestions = () => {
    setSelectedQuestionId(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background icon */}
      <img
        src="/social.png"
        alt="Social Icon"
        className="absolute top-4 left-4 w-24 h-24 md:w-32 md:h-32 z-10 pointer-events-none opacity-50"
      />

      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="absolute top-4 left-4 w-24 h-24 md:w-32 md:h-32 z-40 pointer-events-none"
      />

      {/* Canvas */}
      <Canvas dpr={[1, 2]} gl={{ antialias: true }} className="w-full h-full">
  <directionalLight position={[-5, -5, 5]} intensity={10} />
  <Suspense fallback={<Loader />}>
    <ScrollControls damping={0.2} pages={6}>
      <Model mouse={mousePos} />

      {/* Wrap ButtonOverlay with Html for proper DOM rendering inside Canvas */}
      <Html
      
      
        // position={[0, 0, 0]} // optional: position in 3D space
        // fullscreen // optional: make it cover whole canvas (usually for UI overlays)
        style={{ pointerEvents: 'auto' }} // make buttons interactive
      >
        <ButtonOverlay
          buttons={buttons}
          handleButtonClick={handleButtonClick}
          activeBtnId={activeBtnId}
          threshold={0.01}
        />
      </Html>
    </ScrollControls>
  </Suspense>
</Canvas>



 {/* Circular Buttons Container */}
<div
  className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
  style={{ position: 'absolute' }}
>
  {buttons.map(({ id, label, img }, index) => {
    const angle = (index / buttons.length) * 2 * Math.PI; // Use 2π for full circle
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 240; // Check if window is defined
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return (
      <button
        key={id}
        onClick={() => handleButtonClick(id)}
        style={{
          position: 'absolute',
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          width: '56px',
          height: '56px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
        }}
        className={`rounded-full overflow-hidden border-2 border-white shadow-lg transition transform hover:scale-110 ${
          activeBtnId === id ? 'bg-gradient-to-br from-green-400 to-blue-600' : 'bg-transparent'
        }`}
      >
        <img
          src={img}
          alt={`Button ${label}`}
          className="w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
        />
      </button>
    );
  })}
</div>



      {/* Modal Content for Button 1 (Contact Form) */}
      {activeBtnId === 1 && <ContactForm onClose={closeText} />}

      {/* Modal Content for Buttons 4,5 (Typewriter Text) */}
      {(activeBtnId === 4 || activeBtnId === 5) && activeText && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeText}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-lg mx-4 cursor-auto shadow-[0_0_20px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Typewriter
              words={[activeText]}
              cursor
              cursorStyle=""
              typeSpeed={5}
              deleteSpeed={0}
              delaySpeed={10000}
              loop={false}
            />
            <button
              onClick={closeText}
              className="mt-6 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal Content for Button 2 (Clickable rotating titles and description) */}
      {activeBtnId === 2 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeText}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-lg mx-4 cursor-auto shadow-[0_0_20px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Rotating clickable titles */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {button2Items.map(({ title }, index) => (
                <button
                  key={title}
                  onClick={() => setBtn2Index(index)}
                  className={`px-4 py-2 rounded-full font-semibold transition
                    ${
                      btn2Index === index
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-800 hover:bg-purple-400 hover:text-white'
                    }`}
                >
                  {title}
                </button>
              ))}
            </div>

            {/* Description for the current title */}
            <div className="text-gray-900 text-base whitespace-pre-line min-h-[120px]">
              {button2Items[btn2Index].description}
            </div>

            <button
              onClick={closeText}
              className="mt-6 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}{/* Modal Content for Button 3 (Clickable rotating titles and description) */}
      {activeBtnId === 3 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeText}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-lg mx-4 cursor-auto shadow-[0_0_20px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Rotating clickable titles */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {button3Items.map(({ title }, index) => (
                <button
                  key={title}
                  onClick={() => setBtn3Index(index)}
                  className={`px-4 py-2 rounded-full font-semibold transition
                    ${
                      btn3Index === index
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-800 hover:bg-purple-400 hover:text-white'
                    }`}
                >
                  {title}
                </button>
              ))}
            </div>

            {/* Description for the current title */}
            <div className="text-gray-900 text-base whitespace-pre-line min-h-[120px]">
              {button3Items[btn3Index].description}
            </div>

            <button
              onClick={closeText}
              className="mt-6 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal Content for Button 2 (Clickable rotating titles and description) */}
      {activeBtnId === 2 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeText}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-lg mx-4 cursor-auto shadow-[0_0_20px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Rotating clickable titles */}
            <div className="flex flex-wrap gap-3 mb-6 justify-center">
              {button2Items.map(({ title }, index) => (
                <button
                  key={title}
                  onClick={() => setBtn2Index(index)}
                  className={`px-4 py-2 rounded-full font-semibold transition
                    ${
                      btn2Index === index
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-800 hover:bg-purple-400 hover:text-white'
                    }`}
                >
                  {title}
                </button>
              ))}
            </div>

            {/* Description for the current title */}
            <div className="text-gray-900 text-base whitespace-pre-line min-h-[120px]">
              {button2Items[btn2Index].description}
            </div>

            <button
              onClick={closeText}
              className="mt-6 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
