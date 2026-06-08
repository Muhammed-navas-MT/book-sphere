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
  let errorMessage = "";

  try {
    book = await getBookById(bookId);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load book";

    console.error(error);
  }

  if (errorMessage) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
          !
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Something Went Wrong
          </h2>

          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>

        <Link
          href="/books"
          className="inline-block px-5 py-2.5 bg-purple-600 text-white rounded-xl"
        >
          Return to Books
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
          !
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Book Not Found</h2>

          <p className="text-gray-500">The requested book does not exist.</p>
        </div>

        <Link
          href="/books"
          className="inline-block px-5 py-2.5 bg-purple-600 text-white rounded-xl"
        >
          Return to Books
        </Link>
      </div>
    );
  }

  return (
    <>
      <main className="bg-white">
        <BookDetailsClient book={book} />
      </main>
    </>
  );
}
