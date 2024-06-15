
import { BrowserRouter  , Routes , Route} from 'react-router-dom'
import Header from './components/Header'
import { Home } from './pagess/Home'
import Signin from "./pagess/Signin";
import Signup from "./pagess/Signup";
import Quiz from "./pagess/Quiz";
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pagess/Dashboard';
import { QuizComp } from './pagess/QuizComp';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      {/* <Route path="/quiz" element={<Quiz />} /> */}
      <Route path="/QuizDetails" element={<QuizComp />} />
      <Route element={<PrivateRoute/>}>
        <Route path ='/dashboard' element={<Dashboard/>}/>    

        <Route path="/quiz" element={<Quiz />} />  
        </Route>
      </Routes>

    </BrowserRouter>

  )
}