export const RadioButton = (props) => {
  const { buttonColor, onClickChangeCompleted, task } = props;
  return (
    <button
      className={`w-6 h-6 border border-solid border-2 border-gray rounded-full relative ${
        task.completed
          ? `after:content-['●'] after:text-xl after:absolute after:z-50 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-${buttonColor}`
          : ""
      }`}
      onClick={() => onClickChangeCompleted(task)}
    ></button>
  );
};
