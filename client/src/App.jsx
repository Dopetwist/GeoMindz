import { useEffect, useState } from 'react'
import './index.css'
import Input from './components/Input';
import Button from './components/Button';
import Question from "./components/Question";
import Score from "./components/Score";
import Country from './components/Country';
import axios from "axios"

function App() {

  const [inputText, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [capitals, setCapitals] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);


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
        getCountry();
        setInput("");
    } else {
        alert(`Game Over: Your Total score is ${count}`);
        setCount(0);
        setInput("");
        getCountry();
    }
  }

  function getCountry() {
    const random = capitals[Math.floor(Math.random() * capitals.length)];

    setRandomCountry(random);
  }

  function sound() {
    const audio = new Audio()
    audio.play();
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
