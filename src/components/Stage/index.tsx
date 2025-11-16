import { useState } from "react";
import Wordbox from "../Wordbox";
import wordList from "../../word-list";
import "./style.css";
import bird from "./bird.gif";

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size: number) => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState<string[]>(["jahoda"]);
  const [stageMistake, setStageMistake] = useState<number>(0);

  const handleFinish = () => {
    const newWord = generateWord(6);
    if (newWord) {
      setWords([newWord]);
    }
  };

  const handleMistake = () => {
    setStageMistake((e) => e + 1);
  };

  return (
    <div className="stage">
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            word={word}
            key={word + index}
            onFinish={handleFinish}
            active={index === 0}
            onMistake={handleMistake}
          />
        ))}
      </div>
      <div>
        {" "}
        <img className="bird" src={bird} alt="" />
      </div>

      <div className="stage__mistakes">Chyb:{stageMistake}</div>
    </div>
  );
};

export default Stage;
