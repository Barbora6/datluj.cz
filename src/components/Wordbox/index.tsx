import React, { useEffect, useState } from "react";
import "./style.css";

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
      // pokud uživatel napsal poslední písmenko správně
      if (lettersLeft.length === 1 && e.key === lettersLeft[0]) {
        onFinish();
        // jinak kontolujeme první znak
      } else if (e.key === lettersLeft[0]) {
        setLettersLeft((x) => x.slice(1));
      } else {
        // uživatel udělal chybu
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
