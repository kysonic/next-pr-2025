import { useState, type FC, type MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import type { Book } from '@/entities/Book';
import { Button, Card } from 'flowbite-react';
import Image from 'next/image';
import { booksStore } from '@/stores/books';

export interface BookCardProps {
    book: Book;
}

export const BookCard: FC<BookCardProps> = observer(({ book }) => {
    // For items loading state should be not global
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
    const [isToCartLoading, setIsToCartLoading] = useState(false);

    const favorite = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsFavoriteLoading(true);
        await booksStore.favorite(book.id);
        setIsFavoriteLoading(false);
    };

    const toCart = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsToCartLoading(true);
        await booksStore.toCart(book.id);
        setIsToCartLoading(false);
    };

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
            <div className="controls flex gap-5">
                <Button
                    onClick={favorite}
                    className="cursor-pointer"
                    color="alternative"
                    pill
                    disabled={isFavoriteLoading}
                >
                    Favorite
                </Button>
                <Button
                    onClick={toCart}
                    className="cursor-pointer"
                    pill
                    disabled={isToCartLoading}
                >
                    Add to Cart
                </Button>
            </div>
        </Card>
    );
});

export default BookCard;
