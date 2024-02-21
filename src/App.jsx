import { useState } from "react";
import { useEffect } from "react";
import Tours from "./Tours.jsx";
import Loading from "./Loading.jsx";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTours(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button
            type="button"
            style={{ marginTop: "2 rem" }}
            className="btn"
            onClick={() => fetchData()}
          >
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <section>
      {tours ? (
        <main>
          <Tours tours={tours} removeTour={removeTour} />
        </main>
      ) : (
        "sorry but there are no active tour"
      )}
    </section>
  );
};
export default App;
