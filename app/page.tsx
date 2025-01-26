
import HomePage from "./components/HomePage";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="flex flex-col items-center justify-center">
      <HomePage />
    </main>
  );
}
