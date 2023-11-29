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

const Result = () => {
  const { id } = useParams<string>();

  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Api.get(`/json/${id}.json`)
      .then((response) => {
        setQuestions(response.data.results);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [id]);

  const sayQuestion = (index: number) => {
    speakText(questions[index].question);
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

        <div className="p-10">
          {error?.message}

          {questions.map((q, index) => {
            return (
              <div>
                {index + 1} - {q.question}
                <Button
                  onClick={() => sayQuestion(index)}
                  color="inherit"
                  endIcon={<CampaignIcon />}
                  title="Read outloud the question"
                ></Button>
                <br />
                <br />
                <li className="text-green-900">{q.correct_answers}</li>
                <br /> <hr />
                <br />
              </div>
            );
          })}
        </div>
      </Box>
    </>
  );
};

export default Result;
