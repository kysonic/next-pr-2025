import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { cartStore } from '@/stores/cart';
import BookCartCard from '../BookCartCard/BookCartCard';

export const CartList = observer(() => {
    useEffect(() => {
        cartStore.getCart();
    }, []);

    return (
        <div className="w-full p-10">
            <div className="books-list flex flex-col items-center justify-center gap-10">
                {cartStore.books?.map((book) => (
                    <BookCartCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
});

export default CartList;
