import { useState } from 'react'
import './index.css'
import Input from './components/Input';
import Button from './components/Button';
import Question from "./components/Question";
import Score from "./components/Score";

function App() {

  const [inputText, setInput] = useState("");
  const [count, setCount] = useState(0);

  function handleChange(event) {
    const inputValue = event.target.value;

    setInput(inputValue);
  }


  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <div className="content">
        <Score 
          total={count}
        />

        <div className="container">
          <Question />

          <Input 
            change={handleChange}
            textValue={inputText}
          />
                
          <Button 
            click={handleClick}
          />
        </div>    
        
      </div>
    </>
  )
}

export default App;
