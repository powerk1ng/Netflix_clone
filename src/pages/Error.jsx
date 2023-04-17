import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black/90 text-white/90">
      <h1 className="text-6xl font-bold mb-8">404 Not Found</h1>
      <p className="text-3xl mb-8">
        We're sorry, but the page you're looking for doesn't exist.
      </p>
      <p className='className="text-xl'>
        Go back to <Link to="/" className="text-red-400 underline hover:text-red-700">Home</Link> page
      </p>
    </div>
  );
};

export default ErrorPage;
