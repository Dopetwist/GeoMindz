import { useEffect, useState } from 'react'
import './index.css'
import Input from './components/Input';
import Button from './components/Button';
import Question from "./components/Question";
import Score from "./components/Score";
import Country from './components/Country';
import axios from "axios"

function App() {
  let randomCountry = {};

  const [inputText, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [capitals, setCapitals] = useState([]);

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

  function handleChange(event) {
    const inputValue = event.target.value;

    setInput(inputValue);
  }


  function handleClick() {
    
  }

  function getCountry() {
    const random = capitals[Math.floor(Math.random() * capitals.length)];

    randomCountry = random;

    return randomCountry.country;
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
          countries={getCountry}
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
