import { useEffect, useState } from "react";
import "./Item.css";

export const Item = () => {
  const fullText = "Datlování";
  const [text, setText] = useState("");

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setText((e) => e + fullText[e.length]);
      }, 350);

      return () => clearTimeout(timeoutId);
    }
  }, [text]);

  return (
    <div>
      <h1 className="heading-text">{text}</h1>
    </div>
  );
};
