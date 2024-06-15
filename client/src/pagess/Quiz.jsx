import React, { useState } from "react";
import Progressbar from "../components/Progressbar";
import axios from "axios";
import pdfToText from "react-pdftotext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Quiz = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(10);
  const [file , setFile] = useState(null)
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [title , setTitle] = useState("")
   const [showModel , setShowModel] = useState(false)
  const [mcqData, setMcqData] = useState(null);
  const [completed , setCompleted] = useState(false)
  

  function extractText(event) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text) => setText(text))
      .catch((error) =>
        console.error("Failed to extract text from pdf", error)
      );
    // console.log(text)
  }

  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(text)
  };

  const handleGenerateMCQ = async () => {
    setIsLoading(true);
    setError(null);

    if (!text) {
      setError("Please upload a PDF file or enter text to generate MCQ questions");
      setIsLoading(false);
      
      return;
    }

    try {
      const response = await axios.post("http://localhost:3005/api/user/generate-mcq", {
        text,
      });
      setMcqData(response.data);

      console.log(response.data);
      console.log(response.data.questions.length);
    } catch (error) {
      console.error("Error making API call:", error);
      setError("An error occurred while generating MCQ questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === mcqData.questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    console.log("Score:", score);
    if (currentQuestion < mcqData.questions.length -1) {
      setCurrentQuestion((prevScore) => prevScore + 1);
      setProgress((currentQuestion + 2) * 10);
      setSelectedAnswer(null);
    }
    if (currentQuestion === mcqData.questions.length - 1) {
      setCompleted(true); // Set completed to true on last question
      alert(score)
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setProgress(currentQuestion * 10);
      setSelectedAnswer(null);
      setScore((score) => score - 1);
    }
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  

  const handleQuizSubmit = async() => {
    console.log(currentUser._id)
    setShowModel(false)
    const data = {  title : title , userId : currentUser._id ,  question : mcqData.questions , score : [score]}
    try {
      const res = await axios.post("http://localhost:3005/api/user/submit-mcq" , data ,{
        headers : {
          Authorization :  currentUser.token
        }
    })
    navigate('/dashboard')
    }catch(e){
      console.log(e)
    }
    console.log(data)
  }

  return (
    
    <div className="w-full h-auto flex justify-center flex-col items-center mt-8">
       {
        !mcqData ? <>
         <div class="flex items-center justify-center w-[80%]  md:w-[30%] mt-8  ">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-3 pb-4">
                <svg class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">PDF</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" onChange={extractText}/>
           
            <div>
   
            <input type="text"  id="small-input" value={text} onChange={handleTextChange} placeholder="Enter Topic" class="block  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4 w-auto mb-4" />
            </div>
            </label>        
        </div> 
        <button onClick={() => handleGenerateMCQ(text)} type="button" class="py-2.5 px-5 me-2 mb-2 mt-8 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" > 
            
            {  isLoading ? 

            <div class="flex items-center justify-center   ">
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
             : 'Generate Quiz'} </button>
        {
            error && <span className="text-red-800 border-2 border-red-600 rounded-lg p-2 m-2">{error}</span>
        }</> : 
        
        
        <>
           <div className=" w-[80%] md:w-[40%] h-[85vh] flex flex-col items-center mt-8">
                <span className="text-xl border-2 mt-2 py-2 rounded-xl px-4">Welcome to Quizify</span>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-4 h-6">
                    <div className={`bg-blue-600 text-s font-medium text-blue-100 text-center h-full p-0.5 leading-none rounded-full ${progress === 0 ? "none" : "" } `} style={{width:`${progress}%`}}> {progress}</div>
                </div>
                
                <div className="border-2 p-4 mt-6 text-xl rounded-xl m-2 w-full ">{mcqData.questions[currentQuestion].question}</div>
                <div className="flex flex-col w-full items-center"> 
                    {mcqData.questions[currentQuestion].options.map(
                    (option, index) => (
                    <button
                        className={`border-2 w-[70%] rounded-3xl p-2 mt-2 ${selectedAnswer === option ? "border-green-500" : ""}`}
                        key={index}
                        value={option}
                        onClick={() => handleAnswerClick(option)}
                    >
                    {option}
                    </button>
                    )
                    )}
                </div>

                <div className="w-full flex justify-between">
                    {/* <button className="border-2 w-[20%] rounded-xl p-2 mt-2" onClick={handlePrevious}>Prev</button>
                    <button className="border-2 w-[20%] rounded-xl p-2 mt-2" onClick={handleNext}>Next</button> */}
               
                <button onClick={handlePrevious} disabled={currentQuestion === 0} className="border-2 w-[30%] rounded-xl p-2 mt-2">Previous</button>
                {currentQuestion === mcqData.questions.length - 1 ? (
                    <button onClick={() => {setShowModel(true)}}  className="border-2 w-[30%] rounded-xl p-2 mt-2">Submit</button>
                    ) : (
                    <button
                    className="border-2 w-[30%] rounded-xl p-2 mt-2"
                    onClick={handleNext}
                    disabled={
                    currentQuestion === mcqData.questions.length ||
                    selectedAnswer === null }>
                    Next
                    </button>
                )}
                </div>

        {/* {currentQuestion === mcqData.length && (
              <div>
                <h3>
                  Your Score: {score} / {mcqData.length}
                </h3>
                <button
                  onClick={() =>
                    alert(`Your Score: ${score} / ${mcqData.length}`)
                  }
                >
                  See Score Details
                </button>
              </div>
        )} */}

       

            </div> 
        
        </>
       }

      {showModel ?
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
                <div className="bg-white border-2 p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
                  <h2 className="text-xl mb-4 text-blue-950">Submit Quiz</h2>
                  <input
                    type="text"
                    placeholder="Enter title for this Quiz"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block p-2 border border-gray-300 rounded-lg w-full text-blue-950"
                  />
                  <button
                    onClick = {handleQuizSubmit}
                    className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg "
                  >
                    Submit
                  </button>
                </div>
              </div> : ""
        }
    </div>

  );
};

export default Quiz;
