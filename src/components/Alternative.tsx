import AlternativeProps from "../type/AlternativeProps";

const Alternative = (props: AlternativeProps) => {
  return (
      <div
        className="mt-2 p-3 shadow rounded cursor-pointer transition-colors"
        style={{ backgroundColor: props.state }}
        onClick={()=>props.onClick(props.index)}
      >
        {String.fromCharCode(97 + props.index)} 
        {props.statement}
      </div>
  );
};
export default Alternative;
