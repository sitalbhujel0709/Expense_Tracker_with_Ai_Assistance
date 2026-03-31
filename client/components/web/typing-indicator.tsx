export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-300 px-3 py-2 rounded-lg w-fit">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      </div>
    </div>
  );
}
