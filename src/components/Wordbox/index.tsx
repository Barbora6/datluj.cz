import React, { useEffect, useState } from "react";
import "./style.css";

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      // pokud uživatel napsal poslední písmenko správně
      if (lettersLeft.length === 1 && e.key === lettersLeft[0]) {
        onFinish();
        // jinak kontolujeme první znak
      } else if (e.key === lettersLeft[0]) {
        setLettersLeft((x) => x.slice(1));
      }

      return lettersLeft;
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [lettersLeft, onFinish]);

  return <div className="wordbox">{lettersLeft}</div>;
};

export default Wordbox;

// Upravte komponentu Wordbox tak, že pověsíte posluchače události keyUp na document. Pokud uživatel napsal správně první písmenko slova, toto písmenko ze slova umažte. Takto pokračujte dokud uživatel nenapíše celé slovo. V posluchači budete používat stav lettersLeft a bude potřeba se vyhnout jeho zastarávání (stale state). Použijte probíranou techniku, kdy posluchače události měníte svépomocí. Do závislostí useEffectu bude potřeba přidat stav lettersLeft.
