interface Props {
  children: React.ReactElement;
}

function Container({ children }: Props) {
  return (
    <div
      className="container"
      style={{ padding: "0 30px", height: 460, overflowY: "auto" }}
    >
      {children}
    </div>
  );
}

export default Container;
