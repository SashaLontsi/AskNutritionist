import Chat from '../components/Chat';

export default function Ask() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-accent mb-4 text-centre">Ask Our Nutritionist AI</h1>
      <p className="text-gray-700 mb-4">
        Want to know what to eat, when, or how to improve your lifestyle? Ask anything, and our AI will guide you.
      </p>
      <Chat />
    </main>
  );
}