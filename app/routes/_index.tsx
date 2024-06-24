import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { TrendingMoviesResponse } from "~/@types";
import Hero from "~/components/Hero/Hero";

export const meta: MetaFunction = () => {
  return [
    { title: "Moofies" },
    { name: "description", content: "Welcome to Remix!" },
  ];
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

export default function Index() {
  const data: TrendingMoviesResponse = useLoaderData();
  console.log(data);
  return (
    <>
      <Hero />
      <div className="bg-white py-8 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-2xl text-center text-gray-800 lg:text-3xl font-bold accent-zinc-50">
              Top Trending Movies
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {data.results.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col overflow-hidden rounded-lg border bg-white"
              >
                <Link
                  to={`movie/${movie.id}/comments`}
                  className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                  prefetch="intent"
                >
                  <img
                    className="absolute inset-0  h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={`moofi-${movie.original_title}`}
                  />
                </Link>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <h2 className="mb-2 text-lg font-semibold text-gray-800">
                    <Link
                      to={`movie/${movie.id}/comments`}
                      prefetch="intent"
                      className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      {movie.title}
                    </Link>
                  </h2>
                  <p className="text-gray-500 line-clamp-3">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
