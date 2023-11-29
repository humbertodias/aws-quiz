import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../services/Api";
import ExamProps from "../type/ExamProps";
import ExamCard from "../components/ExamCard";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import GitHubIcon from "@mui/icons-material/GitHub";

function Home() {
  const [exams, setExams] = useState<ExamProps[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Api.get("/json/exams.json")
      .then((response) => {
        setExams(response.data.results);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <>
      <Box sx={{ flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
              AWS - Quiz
            </Typography>
            <Link
              target={"_blank"}
              to="https://github.com/humbertodias/aws-quiz"
            >
              <Button color="inherit" endIcon={<GitHubIcon />}></Button>
            </Link>
          </Toolbar>
        </AppBar>

        {error?.message}
        {exams.map((exam) => {
          return <ExamCard {...exam} key={exam.id} />;
        })}
        
      </Box>
    </>
  );
}
export default Home;
