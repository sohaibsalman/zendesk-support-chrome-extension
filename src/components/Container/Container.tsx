interface Props {
  children: React.ReactElement;
}

function Container({ children }: Props) {
  return (
    <div
      className="container"
      style={{ padding: "0 20px", height: 335, overflowY: "auto" }}
    >
      {children}
    </div>
  );
}

export default Container;
