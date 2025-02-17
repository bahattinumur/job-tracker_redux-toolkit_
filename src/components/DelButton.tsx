interface DelButtonProps {
  handleDelete: () => void;
}

const DelButton: React.FC<DelButtonProps> = ({ handleDelete }) => {
  return (
    <button onClick={handleDelete} className="bin-button">
      <img src="/icon1.svg" className="bin-top" alt="Bin Top" />
      <img src="/icon2.svg" className="bin-bottom" alt="Bin Bottom" />
      <img src="/icon3.svg" className="garbage" alt="Garbage" />
    </button>
  );
};

export default DelButton;

