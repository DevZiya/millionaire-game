import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wait from "../sounds/wait.mp3";
import wrong from "../sounds/wrong.mp3";

const Trivia = ({ data, setStop, setQuestionNumber, questionNumber,stop }) => {
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [Wait] = useSound(wait);
  const [Wrong] = useSound(wrong);
  const [Correct] = useSound(correct);


  useEffect(() => {
    letsPlay();
    Wait()
  }, [letsPlay,Wait]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(5000, () => {
      if (a.correct) {
        Correct()
        delay(1000,()=>{
          setQuestionNumber((prev) => prev + 1);
          setSelectAnswer(null);
        })
      } else {
        Wrong()
        delay(1000,()=>{
          setStop(true);
        })
      }
    });
  };

  return (
    <div className="trivia">
      <div className="questions">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            key={a.text}
            className={selectAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
