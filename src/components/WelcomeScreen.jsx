import { MessageCircle } from "lucide-react";

function WelcomeScreen() {

  return (
    <div className="flex-1 flex items-center justify-center p-6">

      <div className="text-center">

        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-5">

          <MessageCircle
            size={45}
            className="text-indigo-600"
          />

        </div>

        <h2 className="text-2xl font-bold text-gray-700">
          Welcome to ChatApp
        </h2>

        <p className="text-gray-500 mt-2">
          Select a user from the sidebar to start chatting.
        </p>

      </div>

    </div>
  );
}

export default WelcomeScreen;