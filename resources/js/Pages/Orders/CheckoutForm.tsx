import { useState, FormEvent } from 'react';
import { router } from '@inertiajs/react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    price: number;
}

interface Props {
    book: Book;
}

export default function CheckoutForm({ book }: Props) {
    const stripe = useStripe();
    const elements = useElements();

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            // 1. PaymentIntentを作成
            const { data } = await axios.post(
                `/books/${book.id}/payment-intent`,
                {
                    customer_name: customerName,
                    customer_email: customerEmail,
                },
            );

            const { client_secret, order_id } = data;

            // 2. 決済を確定
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('カード情報の取得に失敗しました');
            }

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                client_secret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: customerName,
                            email: customerEmail,
                        },
                    },
                },
            );

            if (error) {
                setErrorMessage(error.message || '決済に失敗しました');
            } else if (paymentIntent?.status === 'succeeded') {
                // 成功ページにリダイレクト
                router.visit(`/orders/success?order_id=${order_id}`);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data?.error ||
                        '決済処理中にエラーが発生しました',
                );
            } else {
                setErrorMessage('予期しないエラーが発生しました');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
                fontFamily: 'system-ui, -apple-system, sans-serif',
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* お客様情報 */}
            <div>
                <label
                    htmlFor="customer_name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    お名前 *
                </label>
                <input
                    id="customer_name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="田中太郎"
                />
            </div>

            <div>
                <label
                    htmlFor="customer_email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    メールアドレス *
                </label>
                <input
                    id="customer_email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="example@email.com"
                />
            </div>

            {/* カード情報 */}
            <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                    クレジットカード情報 *
                </span>
                <div className="w-full px-3 py-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                    <CardElement options={cardElementOptions} />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    テスト用カード番号: 4242 4242 4242 4242
                </p>
            </div>

            {/* エラーメッセージ */}
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                </div>
            )}

            {/* 決済ボタン */}
            <button
                type="submit"
                disabled={
                    !stripe || isProcessing || !customerName || !customerEmail
                }
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
                {isProcessing
                    ? '処理中...'
                    : `${book.price.toLocaleString()}円を支払う`}
            </button>
        </form>
    );
}
