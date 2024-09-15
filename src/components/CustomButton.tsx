const CustomButton = ({
  onClickButton,
  children,
  disabled,
}: {
  onClickButton: Function;
  children: any;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className="text-white bg-cyan-400 font-bold p-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
      onClick={() => onClickButton()}
    >
      {children}
    </button>
  );
};

export default CustomButton