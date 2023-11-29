import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import QuestionProps from "../type/QuestionProps";
import Question from "../components/Question";
import Api from "../services/Api";
import { speakText } from "../speak";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import HomeIcon from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";

const Exam = () => {
  const { id } = useParams<string>();

  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [current, setCurrent] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    Api.get(`/json/${id}.json`)
      .then((response) => {
        setQuestions(randomQuestions(response.data.results));
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [id]);

  const randomQuestions = (q: QuestionProps[]) => {
    return q.sort(() => Math.random() - 0.5);
  };

  const onPrevious = () => {
    canMoveLeft() && setCurrent(current - 1);
  };

  const onNext = () => {
    if (canMoveRight()) {
      setCurrent(current + 1);
    } else {
      navigate(`/result/${id}`)
    }
  };

  const canMoveRight = () => {
    return current + 1 < questions.length
  };


  const canMoveLeft = () => {
    return current > 0;
  };

  const sayQuestion = () => {
    const currentQuestion = questions[current];
    speakText(currentQuestion.question);
  };

  const progress = () => {
    return current + 1 / questions.length;
  };

  const currentQuestion = () => {
    const cq = questions[current];
    cq.moveNext = onNext;
    cq.movePrevious = onPrevious;
    return cq;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
              {id}
            </Typography>
            <Link to="/">
              <Button
                size="large"
                color="inherit"
                endIcon={<HomeIcon />}
                title="Go back to Home"
                ></Button>
            </Link>
            <Button
              size="large"
              onClick={sayQuestion}
              color="inherit"
              endIcon={<CampaignIcon />}
              title="Read outloud the question"
            ></Button>
          </Toolbar>
        </AppBar>


        <div className="p-10">
        {error?.message}

        {questions.length > 0 && <Question {...currentQuestion()} />}

        <br />
        <h1 className="text-center">
          <div>
            <Box sx={{ width: "100%" }}>
              <div>
                {current + 1} / {questions.length}
              </div>
              <br />
              <LinearProgress variant="determinate" value={progress()} />
            </Box>

          </div>
        </h1>
      </div>

      </Box>

    </>
  );
};

export default Exam;
