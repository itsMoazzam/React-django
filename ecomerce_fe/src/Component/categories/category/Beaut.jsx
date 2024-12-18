import { useEffect, useState } from "react";

const Beaut = () => {
  const [electronics, setElectronics] = useState([]);

  useEffect(() => {
    fetch("../../../../Electronics.json")
      .then((response) => response.json())
      .then((data) => setElectronics(data))
      .catch((error) => console.error("Error fetching electronics:", error));
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          margin: "18px"
        }}
      >
        {electronics.slice(59, 85).map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              width: "300px",
              backgroundColor: "white"
            }}
          >
            <img
              src={item.image}
              alt={item.type}
              style={{ width: "100%", height: "250px", borderRadius: "8px" }}
            />
            <h3>{item.brand}</h3>

            <p>
              <strong>Price:</strong> {item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Beaut;
