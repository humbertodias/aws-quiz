import { Link } from "react-router-dom";
import ExamProps from "../type/ExamProps";

import AssignmentIcon from "@mui/icons-material/Assignment";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import BadgeIcon from '@mui/icons-material/Badge';

import {
  Card,
  Box,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
function ExamCard(exam: ExamProps) {
  return (
    <div key={exam.id}>
      <Card sx={{ display: "flex", padding: 2, margin: 2, textAlign: "right" }}>
        <CardMedia
          component="img"
          sx={{ width: 256 }}
          image={exam.image}
          alt={exam.name}
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {exam.id}
            </Typography>
            <br></br>
            <Typography
              variant="body1"
              color="text.secondary"
              component="div"
            >
              {exam.description}
            </Typography>
          </CardContent>
          <CardActions style={{ width: "100%", justifyContent: "flex-end" }}>

            <Link
              target={"_blank"}
              to={exam.guide}
            >
              <Button variant="outlined">
                <GpsFixedIcon />
                Guide
              </Button>
            </Link>
            <Link
              target={"_blank"}
              to={exam.sample}
            >
              <Button variant="outlined">
                <ContentPasteIcon />
                Sample
              </Button>
            </Link>
            <Link
              target={"_blank"}
              to={exam.practice}
            >
              <Button variant="outlined">
                <BadgeIcon />
                Practice
              </Button>
            </Link>
            <Link to={`/exam/${exam.id}`}>
              <Button variant="outlined">
                <AssignmentIcon />
                Exam
              </Button>
            </Link>
          </CardActions>
        </Box>
      </Card>
    </div>
  );
}

export default ExamCard;
