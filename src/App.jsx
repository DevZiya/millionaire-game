import { useEffect, useMemo, useState } from "react";
import "./app.scss";
import Timer from "./Componnet/Timer";
import Trivia from "./Componnet/Trivia";
import Start from "./Componnet/Start";

const App = () => {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPramida = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );
  useEffect(()=>{
    questionNumber >1 &&
    setEarned(moneyPramida.find(m=>m.id === questionNumber -1).amount)
  },[moneyPramida,questionNumber])

  return (
    <div className="app">
        {!username ? <Start setUsername={setUsername} />
        :
        <>
         <div className="main">
        {stop ? (
          <h1 className="endText">Your earned: {earned}</h1>
        ) : (
          <>
            <div className="timer">
              <span><Timer setStop={setStop} questionNumber={questionNumber} /></span>
            </div>
            <div className="bottom">
              <Trivia
                setStop={setStop}
                data={data}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}
                stop={stop}
                />
            </div>
          </>
        )}
      </div>
      <div className="coin">
        {moneyPramida.map((m) => (
            <div
            className={questionNumber === m.id ? "pramida active" : "pramida"}
            key={m.id}
            >
            <span>{m.id}</span>
            <p>{m.amount}</p>
          </div>
        ))}
      </div>
      </>
    }
    </div>
  );
};

export default App;
