import BaseLayout from "../modules/layout/base-layout/base-layout";

export const App = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F6F7FF] px-4 py-8 text-slate-800 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-64 h-96 w-96 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />

        <BaseLayout />
    </main>
  );
};

export default App;
