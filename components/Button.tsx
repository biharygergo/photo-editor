export const Button = (props: {
  text: string;
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`px-4 py-2 bg-gray-200 rounded disabled:opacity-50 transition-all ${
        props.disabled ? "cursor-default" : "hover:bg-green-400 hover:shadow-md"
      } ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
