export const Title = (props: { step: string; title: string }) => {
  return (
    <div className="p-20 flex flex-col items-center justify-center">
      <h5 className="text-xl font-normal text-green-400">{props.step}</h5>
      <h1 className="text-5xl font-sans font-thin">{props.title}</h1>
    </div>
  );
};
