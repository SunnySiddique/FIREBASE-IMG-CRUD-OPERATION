const Spinner = () => {
  return (
    <div style={{display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <div className="spinner-border text-primary mt-5 spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
