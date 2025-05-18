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
  const [isCorrect, setCorrect] = useState(true);

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

  // useEffect(() => {
  //   if (randomCountry.capital.toLowerCase() === inputText.trim().toLowerCase()) {
  //     setCorrect(true);
  //   } else {
  //     setCorrect(false);
  //   }
  // }, [isCorrect]);





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
        alert(`Failed: Your Total score is ${count}`);
        setCount(0);
        setInput("");
        getCountry();
    }
  }

  function getCountry() {
    const random = capitals[Math.floor(Math.random() * capitals.length)];

    setRandomCountry(random);
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
            checkCorrect={isCorrect}
          />
        </div>    
        
      </div>
    </>
  )
}

export default App;
