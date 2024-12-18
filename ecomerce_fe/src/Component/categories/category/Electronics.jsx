import { useEffect, useState } from "react";

const Electronics = () => {
  const [electronics, setElectronics] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
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
          //   backgroundColor: "#f1f1"
        }}
      >
        {electronics.slice(0, 20).map((item) => (
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
              alt={item.model}
              style={{ width: "100%", height: "250px", borderRadius: "8px" }}
            />
            <h3>
              {item.brand} {item.model}
            </h3>
            <p>
              <strong>Price:</strong> {item.Price}
            </p>
            {/* <p>
              <strong>Specifications:</strong>
            </p>
            <ul>
              {Object.entries(item.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Electronics;
