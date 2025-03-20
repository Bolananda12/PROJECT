import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full  min-h-screen flex flex-col justify-center items-center relative ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://files.oaiusercontent.com/file-5URxitKyk6VqYgMz1WhUix?se=2025-03-19T12%3A26%3A19Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D16bd0764-2a5b-46d2-aece-4f67b86da4d6.webp&sig=sdWnJjz1EIAMLd3XIVho3S%2B/N3%2BkxbcYCKWmKluFxmw%3D')] bg-cover bg-center brightness-50 blur-sm"></div>

      {/* Overlay Content */}
      <div className="relative text-center text-white px-6 max-w-3xl z-10 ">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#46EFFF] to-[#A084E8] drop-shadow-xl animate-fade-in">
          Welcome To GYM PRO MANAGEMENT
        </h1>
        <p className="mt-6 text-lg md:text-2xl font-medium text-gray-300 animate-fade-in delay-200">
          Powering the Future of Fitness – Manage, Train, and Transform with Precision.
        </p>

        {/* Action Button */}
        <div className="mt-10">
          <Link
            to={'/userLogin'}
            className="px-8 py-4 bg-gradient-to-r from-[#3A86FF] to-[#8338EC] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-[0px_0px_15px_#46EFFF] transition-all duration-300 ease-in-out animate-fade-in delay-400 transform hover:scale-105"
          >
            Get Started 🚀
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
