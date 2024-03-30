import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Job Tracker</h2>

      <nav>
        <NavLink to={"/"}>Job list</NavLink>
        <NavLink to={"/add"}>Add a New Job</NavLink>
      </nav>
    </header>
  );
};

export default Header;
