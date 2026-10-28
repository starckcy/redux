import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, incbyamt } from "./redux/features/counterSlice"
import { useState } from "react"


const App = () => {

  const dispatch = useDispatch()
  const count = useSelector((state)=>state.counter.value)
  const [num, setNum] = useState(5)

  return (
    <div>
      <h1>{count}</h1>
      <button 
        onClick={()=>{
          dispatch(increment())
        }}
      >
        Increment
      </button>
      <button
        onClick={()=>{
          dispatch(decrement())
        }}
      >
        Decrement
      </button>
      <input text='number' value={num} onChange={(e)=>{
        setNum(e.target.value)
      }} />
      <button
        onClick={()=>{
          dispatch(incbyamt(Number(num)))
        }}
      >
        Increase by {}
      </button>
    </div>
  )
}

export default App