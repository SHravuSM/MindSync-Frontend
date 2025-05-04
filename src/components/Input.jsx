import { Search } from "lucide-react";

export default function Input({ setAppear }) {
  return (
    <div className="flex items-center lg:w-64 mx-auto bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="pl-4 text-gray-500">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        onFocus={() => setAppear(false)}
        onChange={() => { }}
        placeholder="Search posts, tags..."
        className="w-full px-2 py-2 lg:py-3 text-sm bg-transparent focus:outline-none rounded-full"
      />
    </div>
  );
}
