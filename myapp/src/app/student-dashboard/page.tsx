import Link from 'next/link';

export default function Student() {
    return (
        <div>
            <div className="relative">
                <Link href="/">
                        <button
                            type="button"
                            className="absolute top-4 right-4 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                        >
                            Log Out
                        </button>
                </Link>
            </div>

        
        </div>
    )
}