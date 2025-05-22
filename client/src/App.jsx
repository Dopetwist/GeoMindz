import { useEffect, useState } from 'react'
import './index.css'
import Input from './components/Input';
import Button from './components/Button';
import Question from "./components/Question";
import Score from "./components/Score";
import Country from './components/Country';
import Restart from './components/Restart';
import axios from "axios";

function App() {

  const [inputText, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [capitals, setCapitals] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [isFailed, setIsFailed] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/api/countries");

        setCapitals(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (capitals.length > 0) {
      getCountry();
    }
  }, [capitals]);


  function handleChange(event) {
    const inputValue = event.target.value;

    setInput(inputValue);
  }


  function handleClick() {
    if (randomCountry.capital.toLowerCase() === inputText.trim().toLowerCase()) {
        setCount(count + 1);
        success();
        getCountry();
        setInput("");
    } else {
      alert(`Game Over: Your Total score is ${count}`);
      failure();
      setIsFailed(true);
    }
  }

  function getCountry() {
    const random = capitals[Math.floor(Math.random() * capitals.length)];

    setRandomCountry(random);
  }

  function success() {
    const audio = new Audio("success.mp3");
    audio.play();
  }

   function failure() {
    const audio = new Audio("fail.mp3");
    audio.play();
  }

  function restartQuiz() {
    setIsFailed(false);
    setCount(0);
    setInput("");
    getCountry();
  }

  if (isFailed) {
    return (
      <Restart 
        click={restartQuiz}
      />
    )
  }

  return (
    <>
      <div className="content">
        <Score 
          total={count}
        />

        <div className="container">
          <Question />

          <Country 
          countries={randomCountry}
          />

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
