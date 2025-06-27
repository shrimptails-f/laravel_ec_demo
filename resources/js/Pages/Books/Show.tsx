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
    book: Book;
}

export default function Show({ book }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    return (
        <>
            <Head title={book.title} />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/books"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                        ← 書籍一覧に戻る
                    </Link>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                <img
                                    src={book.image_url}
                                    alt={book.title}
                                    className="w-full h-96 md:h-full object-cover"
                                />
                            </div>
                            <div className="p-8 md:w-2/3">
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {book.title}
                                </h1>
                                <p className="text-lg text-gray-600 mb-4">
                                    著者: {book.author}
                                </p>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {book.description}
                                </p>

                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-3xl font-bold text-blue-600">
                                        {formatPrice(book.price)}
                                    </span>
                                    <span className="text-lg text-gray-500">
                                        在庫: {book.stock}冊
                                    </span>
                                </div>

                                {book.stock > 0 ? (
                                    <Link
                                        href={`/books/${book.id}/checkout`}
                                        className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors text-center block text-lg font-semibold"
                                    >
                                        購入手続きに進む
                                    </Link>
                                ) : (
                                    <button
                                        disabled
                                        className="w-full bg-gray-400 text-white py-3 px-6 rounded-md cursor-not-allowed text-center block text-lg font-semibold"
                                    >
                                        在庫切れ
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
