import { NavLink } from "react-router-dom";
// import Electronics from "./category/Electronics";
import { useState } from "react";

const Navoptions = () => {
  const [state, setState] = useState("");
  const arr = [
    { id: 1, path: "/electronics", label: "Electronics" },
    { id: 2, path: "/clothes", label: "Clothes" },
    { id: 3, path: "/sports", label: "Sports & Outdoors" },
    { id: 4, path: "/beauty", label: "Health & Beauty" }
  ];

  const handleclick = (data) => {
    console.log(state);
    setState(data);
    if (data === "Electronics") {
      <NavLink to="/electronics" />;
    } else if (data === "Clothes") {
      <NavLink to="/clothes" />;
    }
  };
  return (
    <>
      <div className="c-card">
        {arr.map((val) => (
          <div key={val.id}>
            <NavLink
              to={val.path}
              className="tab"
              onClick={() => handleclick(val.path)}
            >
              {val.label}
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navoptions;
