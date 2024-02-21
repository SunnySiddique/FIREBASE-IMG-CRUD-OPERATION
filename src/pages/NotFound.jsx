import NotFounds from "../assets/images/404.jpg";

const NotFound = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={NotFounds} alt="Page not found" />
      </div>
    </>
  );
};

export default NotFound;
