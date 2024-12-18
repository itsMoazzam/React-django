import { useState } from "react";
import { Carousel } from "react-bootstrap";

const images = [
  "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-14-model-unselect-gallery-2-202303_GEO_US?wid=5120&hei=2880&fmt=webp&qlt=70&.v=NjB6M3BqTGRudDZtakJrUG5tT2pHTGdzSmpObkZCM3MrNmJ5SkhESlNDak01bFZZM0E3ZWhua1Y4cWFLVUtGUDhLcXQxZ1h0QThIT2dnUm5qbGk5OUJkSERIUjY1Wk1Od3FtNjF6NFZLVXRPVnMvK0xjdWJSTGNZak9kenU3ZVZmY1BIbXdKdTZHQkJxQjU1d2E5aWtn&traceId=1",
  "https://via.placeholder.com/1500x500/FF8A33",
  "https://via.placeholder.com/1500x500/FF8466",
  "https://via.placeholder.com/1500x500/555555",
  "https://via.placeholder.com/1500x500/808080"
];
const Banner = () => {
  const [pause, setpause] = useState(false);
  return (
    <div className="banner">
      <Carousel
        indicators={false}
        controls={true}
        interval={3000}
        pause={pause ? "hover" : "false"}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div
              className="carousel-bg"
              style={{
                backgroundImage: `url(${image})`,
                height: "500px",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="banner-content">
                <h2>Big Discounts on New Arrivals!</h2>
                <p>Shop now and get up to 50% off on your favorite products.</p>
                <button
                  onMouseEnter={() => setpause(true)}
                  onMouseLeave={() => setpause(false)}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
