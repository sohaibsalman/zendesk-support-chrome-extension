import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  response: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ response }) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentResponsePart = response.slice(0, currentPartIndex + 1);

      if (currentPartIndex === response.length - 1) {
        clearInterval(typingInterval);
        setIsTyping(false);
      } else {
        setTypedText(currentResponsePart);
        setCurrentPartIndex(currentPartIndex + 1);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [response, currentPartIndex]);

  return <span>{isTyping ? `${typedText}|` : typedText}</span>;
};

export default TypingAnimation;
