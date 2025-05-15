import { useEffect, useState } from 'react'
import './index.css'
import Input from './components/Input';
import Button from './components/Button';
import Question from "./components/Question";
import Score from "./components/Score";
import axios from "axios"

function App() {

  const [inputText, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [capitals, setCapitals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await axios.get("http://localhost:5000/api/countries");

        setCapitals(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function handleChange(event) {
    const inputValue = event.target.value;

    setInput(inputValue);
  }


  function handleClick() {
    // setCount(count + 1);

    console.log(capitals);
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
