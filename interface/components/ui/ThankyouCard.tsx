import React from "react";
import { Transition } from "@headlessui/react"; // optional for smooth transitions

export default function ThankyouCard() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 scale-90"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-90"
    >
      <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Thank You!
        </h2>
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Your submission has been received successfully.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
      </div>
    </Transition>
  );
}
