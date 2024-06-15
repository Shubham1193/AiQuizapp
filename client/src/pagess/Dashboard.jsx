import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import  {useNavigate} from "react-router-dom"

const Dashboard = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [quizzes, setQuizzes] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get("http://localhost:3005/api/user/get-quiz", {
                    headers: {
                        Authorization: currentUser.token
                    }
                })
                setQuizzes(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchQuizzes()
    }, [currentUser])

    return (
        <div className='flex flex-col justify-center items-center w-[100%]'>
            <h1 className='border-2 p-2 px-4 rounded-2xl mt-4 mb-4'>Your Quizzes</h1>
            <div className='w-full  h-[85vh] flex flex-col md:flex-row md:justify-center md:items-start   md:flex-wrap items-center '>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className='border-2 rounded-xl flex justify-center  items-center flex-col md:w-[20%] md:h-[30%] md:mx-2  mb-4 w-[60%] h-[40%]'  onClick={() => navigate("/QuizDetails", { state: { quiz } })}>
                            <h2 className='text-2xl'>{quiz.title}</h2>
                            
                           
                        </div>
                    ))
                ) : (
                    <p>No quizzes available</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard
