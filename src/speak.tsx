let msg: SpeechSynthesisUtterance;
export const startAssistant = () => {
  msg = new SpeechSynthesisUtterance();
};

export const stopAssistant = () => {};

export const speakText = (text: string) => {
  console.log(text);
  msg.text = text;
  window.speechSynthesis.speak(msg);
};
