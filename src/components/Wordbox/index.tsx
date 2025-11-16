import React, { useEffect, useState } from "react";
import "./style.css";
import confetti from "canvas-confetti";

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({
  word,
  onFinish,
  active,
  onMistake
}) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [wordBoxMistake, setWordBoxMistake] = useState<boolean>(false);

  useEffect(() => {
    if (!active) return;
    const handleKeyUp = (e: KeyboardEvent) => {
      if (lettersLeft.length === 1 && e.key === lettersLeft[0]) {
        // vystřelíme konfety
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onFinish();
      } else if (e.key === lettersLeft[0]) {
        setLettersLeft((x) => x.slice(1));
      } else {
        setWordBoxMistake(true);
        onMistake();
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [lettersLeft, onFinish, active, onMistake]);

  return (
    <>
      <div className={`wordbox ${wordBoxMistake} ? 'wordbox-mistake' : ''`}>
        {lettersLeft}
      </div>
    </>
  );
};

export default Wordbox;
