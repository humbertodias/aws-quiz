import { Link } from "react-router-dom";
import ExamProps from "../type/ExamProps";

function ExamCard(exam: ExamProps) {
  return (
    <>
        <Link to={`/exam/${exam.id}`}>
          <img
            className="rounded-t-lg"
            src={exam.image}
            title={exam.name}
            style={{ width: 340, height: 340 }}
          />
        </Link>
    </>
  );
}

export default ExamCard;
