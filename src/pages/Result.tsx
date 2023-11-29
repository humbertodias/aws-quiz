import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import QuestionProps from "../type/QuestionProps";
import Api from "../services/Api";
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
import CircularWithValueLabel from "../components/CircularProgressWithLabel";
import { randomBoolean, randomBooleanArray } from "../helpers";

const Result = () => {
  const { id } = useParams<string>();

  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [corrects, setCorrects] = useState<boolean[]>(randomBooleanArray(10));

  useEffect(() => {
    Api.get(`/json/${id}.json`)
      .then((response) => {
        setQuestions(response.data.results);
        setCorrects (questions.map(() => {
          return randomBoolean()
        })
        )
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [id]);

  const sayQuestion = (index: number) => {
    speakText(questions[index].question);
  };

  const countCorrect = () => {
    return corrects.filter((c) => c == true).length;
  };
  const countIncorrect = () => {
    return questions.length - countCorrect();
  };

  const score = () => {
    if (countCorrect() <= 0) return 0;
    return Math.round((questions.length / countCorrect()) * 1000);
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
        <AppBar position="static">
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
              Result {id}
            </Typography>
            <Link to="/">
              <Button
                size="large"
                color="inherit"
                endIcon={<HomeIcon />}
                title="Go back to Home"
              ></Button>
            </Link>
          </Toolbar>
        </AppBar>

        <div className="pt-5 text-center">
          <CircularWithValueLabel />
          <div>
            <div className="text-green-700">Correct {countCorrect()}</div>
            <div className="text-red-700">Incorrect {countIncorrect()}</div>
            <div>Score {score()}</div>
          </div>
        </div>

        <div className="p-10">
          {error?.message}

          {questions.map((q, index) => {
            return (
              <>
                {corrects}
                {index + 1} - {q.question}
                <Button
                  onClick={() => sayQuestion(index)}
                  color="inherit"
                  endIcon={<CampaignIcon />}
                  title="Read outloud the question"
                ></Button>
                <br />
                <br />
                <li
                  className={
                    corrects[index] ? "text-green-600" : "text-red-600"
                  }
                >
                  {q.correct_answers}
                </li>
                <br /> <hr />
                <br />
              </>
            );
          })}
        </div>
      </Box>
    </>
  );
};

export default Result;
