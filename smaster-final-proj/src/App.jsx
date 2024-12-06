import Navbar from './Component/Navbar'
import {Routes ,Route} from 'react-router-dom'
import Home from './Component/Home'
import Category from'./Component/Category'
import './App.css'
import Banner from './Component/Banner'
import Footer from './Component/Footer'
function App() {

  return (
    <>
    <Navbar />
     
<Banner/>
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route path='/Category' element ={<Category/>}/>

        </Routes>
<Footer/>
    </>
  )
}

export default App
