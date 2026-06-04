import Link from "next/link";
import { getBookById } from "../../services/bookService";
import BookDetailsClient from "../../components/books/BookDetailsClient";

interface PageProps {
  params: Promise<{
    "book-id": string;
  }>;
}

export default async function BookDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const bookId = resolvedParams["book-id"];

  let book = null;
  try {
    book = await getBookById(bookId);
  } catch (err) {
    console.error("Failed to fetch book in Server Component:", err);
  }

  if (!book) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Book Not Found
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            The book you are trying to view does not exist or may have been removed from our database.
          </p>
        </div>
        <Link
          href="/books"
          className="inline-block px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition shadow-md"
        >
          Return to Book Directory
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <BookDetailsClient book={book} />
    </main>
  );
}

