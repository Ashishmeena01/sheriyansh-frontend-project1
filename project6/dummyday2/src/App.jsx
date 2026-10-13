import { createContext, useState } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import { crxCx, useCx } from './context/TestContext';
import {Prd} from "./context/TestContext"

let Cx = crxCx({ name: "ashish" }); 
let cx1 = createContext();
// console.log(cx.Provider)
console.log(<Prd/>);


function Test() {
  const {data} = useCx(Cx);
  console.log(data);
  return(<><div>{data}</div></>)
}

function App() {
  // console.log(<div></div>)
  return (
    // <CtxDummy>
      <div className='w-full h-screen flex items-center justify-center'>
        {/* <Form /> */}
        {/* <Test></Test> */}
      </div>
    // </CtxDummy>
  )
}


function CtxDummy({ children }) {
  const [data, setData] = useState(0);
  return (
    <Cx.Provider value={data}>
      {children}
    </Cx.Provider>
  )
}

export default App
