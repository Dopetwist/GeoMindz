import { useEffect, useState } from 'react'
import './index.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Input from './components/Input';
import Button from './components/Button';
import Question from "./components/Question";
import Score from "./components/Score";
import Country from './components/Country';
import Restart from './components/Restart';
import axios from "axios";
import Timer from './components/Timer';

function App() {

  const [inputText, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [capitals, setCapitals] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [isFailed, setIsFailed] = useState(false);


  // Connect backend to app

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


  // Detect correct or incorrect answer on click
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

  // Get a new random country
  function getCountry() {
    const random = capitals[Math.floor(Math.random() * capitals.length)];

    setRandomCountry(random);
  }

  // Play success sound
  function success() {
    const audio = new Audio("success.mp3");
    audio.play();
  }

  // Play failure sound
   function failure() {
    const audio = new Audio("fail.mp3");
    audio.play();
  }

  // Restart Quiz
  function restartQuiz() {
    setIsFailed(false);
    setCount(0);
    setInput("");
    getCountry();
  }

  // Display restart button
  if (isFailed) {
    return (
      <Restart 
        click={restartQuiz}
      />
    )
  }

  return (
    <>
      {/* <Header /> */}
      <Timer />

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

      <Footer />
    </>
  )
}

export default App;
