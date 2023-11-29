import { Link } from "react-router-dom";
import ExamProps from "../type/ExamProps";

function ExamCard(exam: ExamProps) {
  return (
    <div key={exam.id}>
      <Link to={`/exam/${exam.id}`}>
        <img
          src={exam.image}
          title={exam.id}
          style={{ width: 340, height: 340 }}
          className="transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 duration-300"
        />
      </Link>
    </div>
  );
}

export default ExamCard;
