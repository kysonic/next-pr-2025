export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    price: number;
    description: string;
    coverImage: string;
    publishedDate: Date;
    publisher: string;
    pages: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
