import { useEffect, useState } from "react";
import "./OwnCarousel.css";
export default function OwnCarousel({ images, id }) {
  const total = images?.length;
  //   console.log(total);
  const [current, setCurrent] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images?.length > 0) {
      setCurrent(images[Number(index)]);
    }
  }, [id]);

  const handleNext = () => {
    if (Number(index) + 1 < total) {
      setCurrent(images[Number(index) + 1]);
      setIndex(Number(index) + 1);
    } else {
      setCurrent(images[0]);
      setIndex(0);
    }
  };

  const handlePrev = () => {
    if (Number(index) - 1 >= 0) {
      setCurrent(images[Number(index) - 1]);
      setIndex(Number(index) - 1);
    } else {
      setCurrent(images[total - 1]);
      setIndex(total - 1);
    }
  };

  const handleClickThumbnail = (e) => {
    setCurrent(images[e.target.id]);
    setIndex(e.target.id);
  };

  // console.log(index);
  return (
    <>
      <div>
        <div className="container-imgPrin">
          <div className="btnNp" onClick={handlePrev}>
            {"<"}
          </div>
          <img className="imgPrin" src={current} alt="" />
          <div className="btnNp" onClick={handleNext}>
            {">"}
          </div>
        </div>
        <div className="container-mini-cards">
          {images?.map((im, index) => {
            return (
              <div
                className="container-thum"
                key={index}
                onClick={handleClickThumbnail}
              >
                <img className="img-thum" src={im} alt="" id={index} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
