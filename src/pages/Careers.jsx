import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import careersData from "../data/careers";

function Careers() {
  const navigate =
    useNavigate();

  const [careers] =
    useState(careersData);

  const [page,
    setPage] =
    useState(0);

  const slides = [];

  for (
    let i = 0;
    i < careers.length;
    i += 8
  ) {
    slides.push(
      careers.slice(
        i,
        i + 8
      )
    );
  }

  const chooseCareer =
    (career) => {
      localStorage.setItem(
        "selected_career",
        career
      );

      navigate(
        "/journey"
      );
    };

  return (
    <div className="screen">

      <div className="careers-card">

        <h1
          className="careers-title"
        >
          Choose Your Career 🚀
        </h1>

        <div
          className="careers-grid"
        >

          {slides.length > 0 &&
            slides[page].map(
              (career) => (
                <button
                  key={career.id}
                  className="career-btn"
                  onClick={() =>
                    chooseCareer(
                      career.name
                    )
                  }
                >
                  <span
                    style={{
                      fontSize:
                        "2rem",
                    }}
                  >
                    {
                      career.icon
                    }
                  </span>

                  <span>
                    {
                      career.name
                    }
                  </span>
                </button>
              )
            )}

        </div>

        {slides.length > 1 && (

          <div
            className="slider-buttons"
          >

            <button
              className="slide-btn"
              disabled={
                page === 0
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
            >
              ⬅ Previous
            </button>

            <span>
              {page + 1}
              {" / "}
              {
                slides.length
              }
            </span>

            <button
              className="slide-btn"
              disabled={
                page ===
                slides.length - 1
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
            >
              Next ➡
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Careers;