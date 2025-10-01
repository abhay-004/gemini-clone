import { useState } from "react";
import main from "../config/gemini";
import { Context } from "./ContextObject";

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const formatResponse = (text) => {
    // Split text into lines
    let formattedText = text;

    // Convert **bold** to <strong>
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert ## Heading to <h2>
    formattedText = formattedText.replace(/^## (.*$)/gm, '<h2>$1</h2>');

    // Convert ### Heading to <h3>
    formattedText = formattedText.replace(/^### (.*$)/gm, '<h3>$1</h3>');

    // Convert #### Heading to <h4>
    formattedText = formattedText.replace(/^#### (.*$)/gm, '<h4>$1</h4>');

    // Convert bullet points starting with * or ***
    formattedText = formattedText.replace(/^\*\*\*(.*$)/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/^\* (.*$)/gm, '<li>$1</li>');

    // Wrap consecutive <li> tags in <ul>
    formattedText = formattedText.replace(/(<li>.*?<\/li>(\n|$))+/g, (match) => {
      return '<ul>' + match + '</ul>';
    });

    // Convert code blocks ```code``` to <pre><code>
    formattedText = formattedText.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');

    // Convert inline `code` to <code>
    formattedText = formattedText.replace(/`(.*?)`/g, '<code>$1</code>');

    // Convert numbered lists
    formattedText = formattedText.replace(/^\d+\.\s(.*$)/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/(<li>.*?<\/li>(\n|$))+/g, (match) => {
      if (!match.includes('<ul>')) {
        return '<ol>' + match + '</ol>';
      }
      return match;
    });

    // Convert --- to <hr>
    formattedText = formattedText.replace(/^---$/gm, '<hr>');

    // Convert line breaks to <br>
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  };

  const onSent = async (prompt) => {
    setResultData('');
    setLoading(true);
    setShowResults(true);
    
    let currentPrompt = prompt !== undefined ? prompt : input;
    setRecentPrompt(currentPrompt);
    
    // Add to previous prompts if it's a new prompt
    if (!prevPrompts.includes(currentPrompt)) {
      setPrevPrompts(prev => [currentPrompt, ...prev]);
    }
    
    const response = await main(currentPrompt);
    setLoading(false);
    
    // Typing effect - show text character by character
    const formattedResponse = formatResponse(response);
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < formattedResponse.length) {
        setResultData(formattedResponse.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 10); // 10ms delay between each character (adjust for speed)
    
    setInput('');
  };

  const newChat = () => {
    setShowResults(false);
    setLoading(false);
    setResultData('');
    setRecentPrompt('');
    setInput('');
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;