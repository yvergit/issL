import dynamic from "next/dynamic";

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Background image as an absolutely positioned div */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      ></div>

      {/* Scene component container with transparent background */}
      <div className="relative w-full h-full bg-transparent">
        <Scene />
      </div>

      {/* Add other content here */}
    </main>
  );
}
