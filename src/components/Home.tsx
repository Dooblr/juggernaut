import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ParticleEffect from "./ParticleEffect"; // Import the ParticleEffect component
import BackgroundEffectCanvas from "./BackgroundEffect"; // Import the BackgroundEffect component

const Home: React.FC = () => {
  const [displayText, setDisplayText] = useState(""); // Text being typed
  const [showQuestion, setShowQuestion] = useState(false); // To show the question section
  const [activeEffect, setActiveEffect] = useState<string | null>(null); // Track active effect
  const [skipped, setSkipped] = useState(false); // Track if the skip button was used
  const typingIntervalRef = useRef<any>(null); // Ref to store the typing interval

  const firstText = "Heere's some cool stuff you can do with Javascript.";
  const secondText = "Wee can make websites more engaging for customers with visuals or question trees.";

  // Function to stop the typing animation and clear text
  const stopTypingAnimation = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current); // Stop the typing interval
    }
    setDisplayText(""); // Clear any text on the screen
  };

  const resetState = () => {
    setDisplayText("");
    setShowQuestion(false);
    setActiveEffect(null); // Reset active effect
    setSkipped(false); // Reset skip state
    startTypingAnimation();
  };

  useEffect(() => {
    if (!skipped) {
      startTypingAnimation();
    } else {
      setShowQuestion(true); // If skipped, show question section immediately
    }
  }, [skipped]);

  const startTypingAnimation = () => {
    let index = 0;

    // Function to type out text character by character
    const typeOutText = (text: string, speed: number, callback: () => void) => {
      typingIntervalRef.current = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(typingIntervalRef.current!); // Stop typing once the text is fully typed
          setTimeout(callback, 1000); // Wait before moving to the next phase
        }
      }, speed);
    };

    const untypeText = (speed: number, callback: () => void) => {
      typingIntervalRef.current = setInterval(() => {
        if (index > 0) {
          setDisplayText((prev) => prev.slice(0, -1)); // Remove one character at a time
          index--;
        } else {
          clearInterval(typingIntervalRef.current!); // Stop untyping once all text is cleared
          setTimeout(callback, 500); // Wait before moving to the next phase
        }
      }, speed);
    };

    typeOutText(firstText, 50, () => {
      index = firstText.length;
      untypeText(50, () => {
        index = 0;
        typeOutText(secondText, 50, () => {
          index = secondText.length;
          untypeText(50, () => setShowQuestion(true)); // Show the question section after typing
        });
      });
    });
  };

  const handleButtonClick = (effectType: string) => {
    if (activeEffect === effectType) {
      setActiveEffect(null); // Turn off the effect if it's already active
    } else {
      setActiveEffect(effectType); // Activate the selected effect
    }
  };

  const handleSkip = () => {
    stopTypingAnimation(); // Stop typing and clear text
    setSkipped(true); // Skip the typing and show the buttons
    setShowQuestion(true); // Show the question section immediately
  };

  return (
    <div className="landing-content">
      <button className="skip-button" onClick={handleSkip}>
        Skip
      </button>

      <h1 className="hero-text">{displayText}</h1>

      {showQuestion && (
        <motion.div
          className="question-section"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }} // Keep opacity to 1, no fade out
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p style={{ fontSize: "4rem" }}>What do you want to see?</p>
          <motion.div
            className="button-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <button
              className={activeEffect === "Particle Effects" ? "active" : ""}
              onClick={() => handleButtonClick("Particle Effects")}
            >
              Particle Effects
            </button>
            <button
              className={activeEffect === "Background Effects" ? "active" : ""}
              onClick={() => handleButtonClick("Background Effects")}
            >
              Background Effects
            </button>
            <button onClick={() => alert("Complex Animations coming soon!")}>
              Complex Animations
            </button>
            <button onClick={() => alert("Interactive 3D Visuals coming soon!")}>
              Interactive 3D Visuals
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Show particle effect when triggered */}
      {activeEffect === "Particle Effects" && <ParticleEffect />}
      
      {/* Show background effect when triggered */}
      {activeEffect === "Background Effects" && <BackgroundEffectCanvas />}
    </div>
  );
};

export default Home;
