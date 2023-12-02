import { Link } from "react-router-dom";
import ExamProps from "../type/ExamProps";

import AssignmentIcon from "@mui/icons-material/Assignment";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import BadgeIcon from "@mui/icons-material/Badge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Collapse,
  CardHeader,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";

import { useState } from "react";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ExamCard(exam: ExamProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div key={exam.id}>
      <Card sx={{ maxWidth: 345, margin: 1 }}>
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     R
          //   </Avatar>
          // }
          action={
            <Link to={`/exam/${exam.id}`}>
              <Button title="Exam">
                <AssignmentIcon />
                Exam
              </Button>
            </Link>
          }
          title={exam.id}
          // subheader="September 14, 2016"
        />
        <Link to={`/exam/${exam.id}`}>
        <CardMedia className="hover:scale-110 transition duration-500 cursor-pointer"
          component="img"
          height="194"
          image={exam.image}
          alt="Paella dish"
        />
        </Link>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {exam.description.substring(0, 100)}...
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link target={"_blank"} to={exam.guide}>
            <Button title="Guide">
              <GpsFixedIcon />
              Guide
            </Button>
          </Link>
          <Link target={"_blank"} to={exam.sample}>
            <Button title="Sample">
              <ContentPasteIcon />
              Sample
            </Button>
          </Link>
          <Link target={"_blank"} to={exam.practice}>
            <Button title="Practice">
              <BadgeIcon />
              Practice
            </Button>
          </Link>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>{exam.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default ExamCard;
