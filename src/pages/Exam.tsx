import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import CampaignIcon from '@mui/icons-material/Campaign';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Exam = () => {
  const { id, name } = useParams<string>();

  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    Api.get(`/json/${id}.json`)
      .then((response) => {
        setQuestions(randomQuestions(response.data.results));
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  const randomQuestions = (q: QuestionProps[]) => {
    return q.sort(() => Math.random() - 0.5);
  };

  const onPrevious = () => {
    canMoveLeft() && setCurrent(current - 1);
  };

  const onNext = () => {
    canMoveRight() && setCurrent(current + 1);
  };

  const canMoveRight = () => {
    return current + 1 < questions.length;
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
              {name}
            </Typography>
            <Link to="/">
              <Button size="large" color="inherit" endIcon={<HomeIcon />}></Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="p-10">
        {error?.message}
        
        {questions.length > 0 && <Question {...questions[current]} />}

        <h1 className="text-center">
          <div>
            <Box sx={{ width: "100%" }}>
            <div>
              {current + 1} / {questions.length}
            </div>
              <LinearProgress variant="determinate" value={progress()} />
            </Box>

            <Button size="large" onClick={onPrevious} color="inherit" endIcon={<NavigateBeforeIcon />}></Button>
            <Button size="large" onClick={onNext} color="inherit" endIcon={<NavigateNextIcon />}></Button>
            <Button size="large" onClick={sayQuestion} color="inherit" endIcon={<CampaignIcon />}></Button>

          </div>
        </h1>
      </div>
    </>
  );
};

export default Exam;
