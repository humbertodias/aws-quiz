import AlternativeProps from "../type/AlternativeProps";

const Alternative = (props: AlternativeProps) => {
  return (
    <>
      {props.state}
      <div
        className="mt-2 p-5 shadow rounded cursor-pointer"
        style={{ backgroundColor: props.state }}
        // onClick={()=>props.onClick(props)}
      >
        {/* {String.fromCharCode(97 + props.index)}  */}
        {props.statement}
      </div>
    </>
  );
};
export default Alternative;
