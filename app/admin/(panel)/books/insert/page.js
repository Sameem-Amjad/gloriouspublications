import BookForm from "@/app/components/BookForm";

export default function AddBook() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Add a book</h1>
      <BookForm />
    </div>
  );
}
