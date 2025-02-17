const Loader: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="spinner">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
