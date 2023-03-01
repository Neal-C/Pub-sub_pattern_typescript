import { createStateHook } from "./simple-state-manager";

const useCounter = createStateHook(0);

function Counter(){
  const [count, setCount] = useCounter();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Add one</button>
      <div>count is {count}</div>
    </div>
  )

}

function App() {



  return (
    <div className="App">
    <Counter/>
    <Counter/>
    <Counter/>
    </div>
  )
}

export default App
