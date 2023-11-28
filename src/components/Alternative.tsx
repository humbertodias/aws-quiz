import AlternativeProps from "../type/AlternativeProps";

const Alternative = (props: AlternativeProps) => {
  return (
    <a href="javascript: void(0)">
      <div
        className="mt-2 p-2 border-0 hover:bg-gray-800 hover:text-white"
        onClick={() => props.onClick(props.statement)}
      >
        {String.fromCharCode(97 + props.index)}) {props.statement}
      </div>
    </a>
  );
};
export default Alternative;
