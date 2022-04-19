export const NumberFormControl = (props: {
  id: string;
  value: number;
  setValue: (value: number) => void;
}) => {
  return (
    <input
      id={props.id}
      type="number"
      value={props.value}
      onChange={(e) => props.setValue(+e.target.value)}
      className="rounded border border-green-400 py-2 px-4"
    ></input>
  );
};

export const FormLabel = (props: { for: string; text: string }) => {
  return (
    <label htmlFor={props.for} className="font-light mb-2">
      {props.text}
    </label>
  );
};

export const FormGroup = (props: { children: React.ReactNode[] }) => (
  <div className="pb-3 flex flex-col">{props.children}</div>
);
