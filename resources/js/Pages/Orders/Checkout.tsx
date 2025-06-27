import { Head, Link } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/Pages/Orders/CheckoutForm';

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
    stripePublishableKey: string;
}

export default function Checkout({ book, stripePublishableKey }: Props) {
    const stripePromise = loadStripe(stripePublishableKey);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ja-JP', {
            style: 'currency',
            currency: 'JPY',
        }).format(price);
    };

    return (
        <>
            <Link
                href="/books"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                ← 書籍一覧に戻る
            </Link>
            <Head title={`${book.title} - 決済`} />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        決済手続き
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* 商品情報 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                注文内容
                            </h2>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={book.image_url}
                                    alt={book.title}
                                    className="w-20 h-28 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        著者: {book.author}
                                    </p>
                                    <p className="text-xl font-bold text-blue-600 mt-2">
                                        {formatPrice(book.price)}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">
                                        合計金額
                                    </span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {formatPrice(book.price)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 決済フォーム */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                お客様情報・決済情報
                            </h2>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm book={book} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
