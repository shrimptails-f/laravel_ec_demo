import { Head, Link } from '@inertiajs/react';

interface Book {
    id: number;
    title: string;
    description: string;
    author: string;
    price: number;
    image_url: string;
    stock: number;
}

interface Props {
    books: Book[];
}

export default function Index({ books }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    return (
        <>
            <Head title="書籍一覧" />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        書籍一覧
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src={book.image_url}
                                    alt={book.title}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {book.title}
                                    </h2>
                                    <p className="text-gray-600 mb-2">
                                        著者: {book.author}
                                    </p>
                                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                        {book.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-blue-600">
                                            {formatPrice(book.price)}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            在庫: {book.stock}冊
                                        </span>
                                    </div>
                                    <Link
                                        href={`/books/${book.id}`}
                                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
                                    >
                                        詳細を見る
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
