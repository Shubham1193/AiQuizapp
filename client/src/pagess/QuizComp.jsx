import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LineChart } from '@mui/x-charts/LineChart';
export const QuizComp = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const  {quiz}  = location.state;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(10);

  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [showModel, setShowModel] = useState(false);
  const [title , setTitle] = useState("")
  const [loading , setLoading] = useState(true)
  const [chartindex , setChartIndex] = useState(null)
  const [data , setData] = useState(null);
  const [retake, setRetake] = useState(false);
  
//   console.log(quiz._id)

const [color, setColor] = useState(() => (
    theme === 'light' ? '#76b7b2' : '#59a14f' // Light mode color
  ));

  useEffect(() => {
    setColor(() => (
      theme === 'light' ? '#76b7b2' : '#59a14f'// Dark mode color with transparency
    ));
    console.log("Current color:", color); // Log for debugging
  }, [theme]);

  useEffect( () => {
  
    const fetchMcq = async () => {
        try {
            const res = await axios.get(`http://localhost:3005/api/user/get-singlequiz/${quiz._id}` ,{
              headers : {
                Authorization :  currentUser.token
              }
              })
            setData(res.data)
            setLoading(false)
            console.log(data.title)
            
              
      
          }catch(e){
            console.log(e)
          }
    }
    fetchMcq()
  },[retake , theme])
 


  const handleNext = () => {
    if (selectedAnswer === data.question[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    console.log("Score:", score);
    if (currentQuestion < data.question.length -1) {
      setCurrentQuestion((prevScore) => prevScore + 1);
      setProgress((currentQuestion + 2) * 10);
      setSelectedAnswer(null);
    }
    if (currentQuestion === data.question.length - 1) {
      setCompleted(true); // Set completed to true on last question
      alert(score)
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setProgress(currentQuestion * 10);
      setSelectedAnswer(null);
    //   setScore((score) => score - 1);
    }
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  

  const handleQuizSubmit = async() => {
    console.log(quiz._id)
    setShowModel(false)
    // const data = {  title : title , userId : currentUser._id ,  question : mcqData.questions , score : [score]}
    try {
      const res = await axios.put(`http://localhost:3005/api/user/update-score/${quiz._id}` , {score} ,{
        headers : {
          Authorization :  currentUser.token
        }
        })
        // setMcq(res.data)
        setRetake(false)

    }catch(e){
      console.log(e)
    }
    // console.log(data)
  }

  return (
   <div>
    {
        loading ? <p>loaing</p> :
        <div className="w-full flex justify-center flex-col items-center">
     
     {retake ? (
        <div className=" w-[80%] md:w-[40%] h-auto flex flex-col items-center mt-8  justify-start">
          <span className="text-xl border-2 mt-2 py-2 rounded-xl px-4">
            Welcome to Quizify
          </span>
          <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-4 h-6">
            <div
              className={`bg-blue-600 text-s font-medium text-blue-100 text-center h-full p-0.5 leading-none rounded-full ${
                progress === 0 ? "none" : ""
              } `}
              style={{ width: `${progress}%` }}
            >
              {" "}
              {progress}
            </div>
          </div>

          <div className="border-2 p-4 mt-6 text-xl rounded-xl m-2 w-full ">
            {data.question[currentQuestion].question}
          </div>
          <div className="flex flex-col w-full items-center">
            {data.question[currentQuestion].options.map((option, index) => (
              <button
                className={`border-2 w-[70%] rounded-3xl p-2 mt-2 ${
                  selectedAnswer === option ? "border-green-500" : ""
                }`}
                key={index}
                value={option}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="w-full flex justify-between mt-8">
            {/* <button className="border-2 w-[20%] rounded-xl p-2 mt-2" onClick={handlePrevious}>Prev</button>
         <button className="border-2 w-[20%] rounded-xl p-2 mt-2" onClick={handleNext}>Next</button> */}

            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-2 w-[30%] rounded-xl p-2 mt-2"
            >
              Previous
            </button>
            {currentQuestion === data.question.length - 1 ? (
              <button
                onClick={() => {
                  setShowModel(true);
                }}
                className="border-2 w-[30%] rounded-xl p-2 mt-2"
              >
                Submit
              </button>
            ) : (
              <>
                <button
                className="border-2 w-[30%] rounded-xl p-2 mt-2"
                onClick={handleNext}
                disabled={
                  currentQuestion === data.question.length || selectedAnswer === null
                }
              >
                Next
              </button>

              <button
                className="border-2 w-[30%] rounded-xl p-2 mt-2"
                // onClick={handleNext}
                onClick = { () => setRetake(false)}
              >
                Back
              </button>
              
              </>
              
            )}
          </div>
        </div>
        ) : <div className="w-full h-screen flex flex-col items-center ">
                <h1 className="text-4xl m-4 border-2 p-2 rounded-xl  ">{data.title}</h1>
                <div className="h-[30%] w-[90%] md:w-[50%] md:h-[50%] border-2">
                <LineChart
                    
                    // xAxis={[{ data: [1,2,3,4,5] , scaleType : 'point' }]}
                    series={[
                      {
                        data: data.score, min : 0 
                      },
                    ]}
                  
                        grid = {{vertical: true,horizontal: true , color : '#fdb462'}}
                        sx={{
                            //change left yAxis label styles
                           "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel":{
                            strokeWidth:"0.5",
                            fill:'#76b7b2'
                           },
                           "& .MuiChartsLegend-mark" :{
                             display : "None"
                           },
                           // change all labels fontFamily shown on both xAxis and yAxis
                           "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                               fontFamily: "Roboto",
                            },
                            // change bottom label styles
                            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel":{
                                strokeWidth:"0.5",
                                fill:'#76b7b2'
                             },
                              // bottomAxis Line Styles
                             "& .MuiChartsAxis-bottom .MuiChartsAxis-line":{
                              stroke:'#76b7b2',
                              strokeWidth: "0.5"
                             },
                             // leftAxis Line Styles
                             "& .MuiChartsAxis-left .MuiChartsAxis-line":{
                              stroke:'#76b7b2',
                              strokeWidth:0.5
                             },
                             "& .MuiChartsGrid-line" :{
                             stroke : '#bab0ab'
                           },
                           "& .MuiChartsLegend-series" :{
                            stroke : '#bab0ab'
                          }
                          }}
                        
                    />
                </div>
      
                <div className="mt-4 text-2xl w-[90%] md:w[50%] flex justify-around">
                <button onClick={() => setRetake(true)} className="border-2 mt-4 text-2xl w-[40%] md:w-[20%] rounded-xl p-2">Retake</button>
                <button onClick={() => navigate('/dashboard')} className="border-2 mt-4 text-2xl w-[40%] md:w-[20%] rounded-xl">Dashboard</button>
                </div>
            </div>
        }

    {showModel ?
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
                <div className="bg-white border-2 p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
                  <h2 className="text-xl mb-4 text-blue-950">Submit Quiz</h2>
                  <input
                    type="text"
                    placeholder="Enter title for this Quiz"
                    value={data.title}
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
    
    }
   </div>
  );
};
