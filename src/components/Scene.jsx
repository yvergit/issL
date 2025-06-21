'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls, Html, useProgress } from '@react-three/drei';
import { Suspense, useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Typewriter } from 'react-simple-typewriter';
import { Model } from './model'; // ✅ Ensure this path is correct
import { useScroll } from '@react-three/drei';
import Texty from './texty';  // adjust path if needed

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

const AMA_QUESTIONS = [
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
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
<Texty />




      {/* AMA Button */}
      <div className="absolute left-1/2 top-40 -translate-x-1/2 z-50">
        <button
          onClick={openAMA}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`px-5 py-2 rounded-full text-white font-semibold transition transform hover:scale-105
            ${
              initialStyle || isHovered
                ? 'bg-gradient-to-br from-green-400 to-blue-600 hover:from-blue-600 hover:to-green-400 shadow-lg'
                : 'bg-transparent shadow-none'
            }`}
          style={{
            border: initialStyle || isHovered ? '2px solid white' : '2px solid transparent',
            transition: 'background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          Your Questions, Answered Clearly
        </button>

        {/* AMA Popup */}
        {isAMAOpen && (
          <div className="relative max-w-xs bg-white bg-opacity-95 rounded-xl shadow-xl p-5 text-gray-900 font-medium mt-3">
            {/* Tail */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderTop: '12px solid white',
              }}
            />
            {!selectedQuestionId ? (
              <>
                <h3 className="text-lg font-semibold mb-3">Ask Me Anything</h3>
                <ul className="space-y-3 max-h-60 overflow-y-auto">
                  {AMA_QUESTIONS.map(({ id, question }) => (
                    <li key={id}>
                      <button
                        onClick={() => selectQuestion(id)}
                        className="text-left w-full text-blue-600 hover:underline focus:outline-none"
                      >
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={closeAMA}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-3">
                  {AMA_QUESTIONS.find((q) => q.id === selectedQuestionId)?.question}
                </h3>
                <p className="mb-5">
                  {AMA_QUESTIONS.find((q) => q.id === selectedQuestionId)?.answer}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={backToQuestions}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Back to Questions
                  </button>
                  <button
                    onClick={closeAMA}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Buttons Container */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4 z-50">
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
              className="mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
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
              className="mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
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
              className="mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
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
              className="mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
