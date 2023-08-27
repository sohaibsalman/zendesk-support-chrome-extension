import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  response: string;
  stopGeneration: boolean;
  isGenerating: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  response,
  stopGeneration,
  isGenerating,
}) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (stopGeneration) return () => clearInterval(typingInterval);

      const currentResponsePart = response.slice(0, currentPartIndex + 1);

      if (currentPartIndex === response.length - 1) {
        clearInterval(typingInterval);
        setIsTyping(false);
      } else {
        setTypedText(currentResponsePart);
        setCurrentPartIndex(currentPartIndex + 1);
      }
    }, 15);
    return () => clearInterval(typingInterval);
  }, [response, currentPartIndex]);

  return (
    <span>{!isTyping && isGenerating ? `${typedText}...` : typedText}</span>
  );
};

export default TypingAnimation;
