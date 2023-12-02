import { useParams, Link } from "react-router-dom";
import { speakText } from "../speak";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import HomeIcon from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";
import PrintIcon from '@mui/icons-material/Print';

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";


import { exams, questions, corrects } from "../store";
import { useRef } from "react";
import ReactToPrint from "react-to-print";


const Result = () => {
  const { id } = useParams<string>()
  const componentRef = useRef<HTMLDivElement | null>(null);

  const sayQuestion = (index: number) => {
    speakText(questions.value[index].question);
  };

  const countCorrect = () => {
    return corrects.value.filter((c) => c == true).length;
  };

  const countIncorrect = () => {
    return questions.value.length - countCorrect();
  };

  const score = () => {
    return countCorrect() * 100;
  };

  const result = () => {
    return score() >= currentExam()[0].score;
  };

  const currentExam = () => {
    return exams.value.filter((e) => e.id == id)
  };



  return (
    <>
      <Box
        sx={{
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Result - {id}
            </Typography>
            <Link to="/">
              <Button
                size="large"
                color="inherit"
                endIcon={<HomeIcon />}
                title="Go back to Home"
              ></Button>
            </Link>
            <ReactToPrint
              trigger={() => <Button color="inherit" endIcon={<PrintIcon />}></Button>}
              content={() => componentRef.current}
            />

          </Toolbar>
        </AppBar>

        <ReactToPrint
              trigger={() => <Button color="inherit" endIcon={<PrintIcon />}>Print this out!</Button>}
              content={() => componentRef.current}
            />

        <div ref={(el) => (componentRef.current = el)}>
        <div className="pt-5 text-center">
          <div>
            <div className="text-green-700">Correct {countCorrect()}</div>
            <div className="text-red-700">Incorrect {countIncorrect()}</div>
            <div>Score {score()} / {currentExam()[0].score}</div>
            <div>Result {result() ? "Pass" : "Fail"}</div>
          </div>
        </div>


        <div className="p-10">

          {questions.value.map((q, index) => {
            return (
              <>
                {index + 1} - {q.question}
                <br />
                <br />
    
                {q.incorrect_answers.map((a) => {
                  return (
                  <div>
                    <Button
                  onClick={() => sayQuestion(index)}
                  color="inherit"
                  endIcon={<CampaignIcon />}
                  title="Read outloud the question"
                ></Button>
                    {a}
                  </div>
                  )
                })}


                {q.correct_answers.map((a) => {
                  return (
                  <div className="text-green-700">
                    <Button
                  onClick={() => sayQuestion(index)}
                  color="inherit"
                  endIcon={<CampaignIcon />}
                  title="Read outloud the question"
                ></Button>
                    {a}
                  </div>
                  )
                })}
                <span className="p-2"></span>
                <Alert severity={corrects.value[index] ? "success" : "error"}>
                  <AlertTitle>{corrects.value[index] ? "Correct" : "Incorrect"}</AlertTitle>
                  {q.hint}
                </Alert>
                <br></br>
              </>
            );
          })}
          </div>
        </div>
      </Box>
    </>
  );
};

export default Result;
