import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import type { Book } from '@/entities/Book';
import { Card } from 'flowbite-react';
import Image from 'next/image';

export interface BookCardProps {
    book: Book;
}

export const BookCard: FC<BookCardProps> = observer(({ book }) => {
    return (
        <Card
            href={`/book/${book.id}`}
            className="max-w-sm self-stretch"
            renderImage={() => (
                <Image
                    className="max-w-[384] aspect-[3/2]"
                    width={384}
                    height={256}
                    src={book.coverImage}
                    alt={book.title}
                />
            )}
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.title} by {book.author}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.description}
            </p>
        </Card>
    );
});

export default BookCard;
