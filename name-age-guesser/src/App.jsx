import { useState, useEffect } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import style from "./styles/main.module.scss";

function App() {
  //handling controlled input
  const [value, setValue] = useState("");
  const inputHandler = (e) => {
    setValue(e.target.value);
  };
  // handling state for guesses count
  const [guesses, setGuesses] = useState(0);
  //handling results
  const [results, setResults] = useState([]);

  // getting data from custom fetch hook
  const handleFetch = async () => {
    try {
      const response = await fetch(`https://api.agify.io/?name=${value}`);
      const json = await response.json();
      setResults((prev) => [...prev, json]);
    } catch (error) {
      alert("ERROR FETCHING DATA!");
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Name Age Guesser</h1>
      <span className={style.subtitle}>Total guesses: {guesses}</span>
      <span className={style.message}>What an odd number of guesses!”</span>
      <div className={style.wrapper}>
        <Input value={value} onChange={inputHandler} />
        <Button onClick={handleFetch} />
      </div>
      <div className={style.results}>
        All guesses:
        <ul>
          {results.map((item) => (
            <li key={item.name}>
              {item.name} - {item.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
