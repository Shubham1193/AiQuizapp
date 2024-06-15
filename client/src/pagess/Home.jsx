import React from "react";
import { Link } from "react-router-dom";
import step1 from "../assets/step1.jpeg";
import step2 from "../assets/step2.jpeg";
import step3 from "../assets/step33.jpeg";

export const Home = () => {
  return (
    <div className=" h-screen">
      <div className="self-center whitespace-nowrap text-sm sm:text-xl  flex justify-center font-semibold dark:text-white w-[100%] ">
        <span className="  bg-gray-600 rounded-lg text-white p-2 my-6 md:my-24">
          Generate Quiz from you Pdf , Notes and Topic
        </span>
      </div>

      <div className="self-center whitespace-nowrap text-sm sm:text-xl  flex justify-center font-semibold dark:text-white w-[100%] ">
        <Link
          to="/Quiz"
          className="px-4  bg-gray-600 rounded-lg text-white p-2 my-4"
        >
          Generate
        </Link>
      </div>
      <div className="self-center mx-auto whitespace-nowrap  text-sm sm:text-xl my-4 py-4 flex flex-col md:justify-around items-center font-semibold dark:text-white w-[96%] md:h-64 h-[70vh] rounded-sm md:flex-row">
        <div className="h-full md:w-[20%] w-[60%] mt-4  rounded-lg ">
          <div className="step-title text-center ">Generate Quiz</div>
          <div
            className="h-[80%] md:w-[100%] w-[100%] mt-4 border-2 rounded-lg"
            style={{
              backgroundImage: `url(${step1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {" "}
          </div>
        </div>
        <div className="h-full md:w-[20%] w-[60%] mt-4  rounded-lg">
          <div className="step-title text-center">Attempt Quiz</div>
          <div
            className="h-[80%] md:w-[100%] w-[100%] mt-4 border-2 rounded-lg"
            style={{
              backgroundImage: `url(${step2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {" "}
          </div>
        </div>
        <div className="h-full md:w-[20%] w-[60%] mt-4  rounded-lg">
          <div className="step-title text-center">Track Progress</div>
          <div
            className="h-[80%] md:w-[100%] w-[100%] mt-4 border-2 rounded-lg"
            style={{
              backgroundImage: `url(${step3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
};
