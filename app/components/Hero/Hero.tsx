import { useEffect, useState } from "react";
import { useLoaderData, json } from "@remix-run/react";
import { TrendingMoviesResponse } from "~/@types";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

// Settings for the slider
const settings = {
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
};

export async function loader() {
  const url = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWEzMDcyZDI4ZDliYTViMmZlODZiODljZmUyMzU5YSIsIm5iZiI6MTcxOTE1MjY0MS43Mjg0NTUsInN1YiI6IjY2Nzc0ZTViOGM4MGJhM2NjOWIwOThmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.veBNwUom8iDQ6Asz4biSjEAbcII2EFEVcQ4jEW8miAw",
      },
    }
  );
  return json(await url.json());
}

export default function Hero() {
  const data: TrendingMoviesResponse = useLoaderData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let slideInterval: NodeJS.Timeout | null = null;
    if (settings.autoplay) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.results.length);
      }, settings.autoplaySpeed);
    }
    return () => {
      if (slideInterval) clearInterval(slideInterval);
    };
  }, [data.results.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.results.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + data.results.length) % data.results.length
    );
  };

  return (
    <div className="relative h-screen">
      {data.results.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-${
            settings.speed
          } ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="flex justify-between">
            <div className="absolute bottom-0 left-0 container mx-auto px-4 pb-24 text-left text-white w-1/2">
              <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg mb-8">{movie.overview}</p>
              <a
                href={`/movie/${movie.id}`}
                className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                View Details
              </a>
            </div>
            
            <div className="flex items-center absolute bottom-20 right-20">
              <div className="">
                <button
                  onClick={goToPrevSlide}
                  className="text-white bg-black bg-opacity-50 hover:bg-opacity-75 p-3 rounded-l-lg"
                >
                  <FaAngleLeft />
                </button>
              </div>
              <div className=" inset-y-0 right-0 flex items-center">
                <button
                  onClick={goToNextSlide}
                  className="text-white bg-black bg-opacity-50 hover:bg-opacity-75 p-3 rounded-r-lg"
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
