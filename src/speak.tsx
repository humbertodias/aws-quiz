let utterance: SpeechSynthesisUtterance;
export const startAssistant = () => {
  utterance = new SpeechSynthesisUtterance();
  utterance.lang = "en";
};

export const stopAssistant = () => {};

export const speakText = (text: string) => {
  utterance.text = text;
  window.speechSynthesis.speak(utterance);
};
