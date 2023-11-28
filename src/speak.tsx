// // Import the Artyom library
// import Artyom from "artyom.js"

// // Create a "globally" accesible instance of Artyom
// export const Jarvis = new Artyom();

export const startAssistant = () => {
  // console.log("Artyom succesfully started !");

  // Jarvis.initialize({
  //   lang: "en-US",
  //   debug: true,
  //   continuous: true,
  //   soundex: true,
  //   listen: true,
  // })
  //   .then(() => {
  //     // Display loaded commands in the console
  //     console.log(Jarvis.getAvailableCommands());
  //   })
  //   .catch((err: string) => {
  //     console.error("Oopsy daisy, this shouldn't happen !", err);
  //   });
};

export const stopAssistant = () => {
  // Jarvis.fatality()
  //   .then(() => {
  //     console.log("Jarvis has been succesfully stopped");
  //   })
  //   .catch((err: string) => {
  //     console.error("Oopsy daisy, this shouldn't happen neither!", err);
  //   });
};

export const speakText = (text: string) => {
  console.log(text);
  // // Speak text with Artyom
  // Jarvis.say(text, {
  //   onEnd() {
  //     console.log("No more text to talk");
  //   },
  // });
};
