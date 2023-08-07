interface Props {
  children: React.ReactElement;
}

function Container({ children }: Props) {
  return (
    <div
      className="container"
      style={{ padding: "0 30px 30px 30px", height: 320, overflowY: "auto" }}
    >
      {children}
    </div>
  );
}

export default Container;
