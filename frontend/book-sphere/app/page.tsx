import FeaturedBooks from "./components/home/FeaturedBooks";
import HeroSection from "./components/home/HeroSection";
import WhyReadSection from "./components/home/WhyReadSection";
import { listBooks } from "./services/bookService";

export default async function Home() {
  let books = [];
  try {
    const data = await listBooks({
      page: 1,
      limit: 10,
    });
    books = data.books || [];
  } catch (error) {
    console.error("Failed to fetch books for Home Page:", error);
  }

  return (
    <div className="space-y-4">
      <HeroSection books={books} />

      <FeaturedBooks books={books} />

      <WhyReadSection />
    </div>
  );
}