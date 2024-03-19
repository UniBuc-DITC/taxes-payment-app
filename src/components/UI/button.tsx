export default function Button({ text, color }: { text: string; color: string }) {
    return (
        <button
            className={`${color} text-white font-medium py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300 mt-4 mx-2 text-lg`}
        >
            {text}
        </button>
    );
}
