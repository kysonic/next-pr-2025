import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { booksStore } from '@/stores/books';
import BookCard from '@/components/features/BookCard/BookCard';

export const BooksList = observer(() => {
    useEffect(() => {
        booksStore.getBooks();
    }, []);

    return (
        <div className="mx-auto p-10">
            <div className="books-list flex flex-wrap items-center justify-center gap-10">
                {booksStore.books?.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
});

export default BooksList;
