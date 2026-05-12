let currentUtterance = null;

export const speak = (text, lang = "en-US") => {
  if (!text || text.trim() === "") {
    console.log("No text to speak");
    return;
  }

  if ("speechSynthesis" in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Small delay to ensure cancellation is processed
    setTimeout(() => {
      try {
        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.lang = lang;
        currentUtterance.rate = 0.9; // Slightly slower for better clarity
        currentUtterance.pitch = 1;
        currentUtterance.volume = 1;
        
        // Handle errors
        currentUtterance.onerror = (event) => {
          console.error("Speech synthesis error:", event);
        };
        
        currentUtterance.onstart = () => {
          console.log("Speech started:", text);
        };
        
        currentUtterance.onend = () => {
          console.log("Speech ended");
        };
        
        window.speechSynthesis.speak(currentUtterance);
      } catch (error) {
        console.error("Error creating utterance:", error);
      }
    }, 100);
  } else {
    console.warn("Speech synthesis not supported in this browser");
  }
};

export const stopSpeech = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
    console.log("Speech stopped");
  }
};