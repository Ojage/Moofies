import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, json, useLoaderData } from "@remix-run/react";
import { MovieD } from "~/@types";

export async function loader({ params }: LoaderFunctionArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
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
export default function MovieId() {
  const data: MovieD = useLoaderData();
  return (
    <div className="min-h-screen p-10">
      <img
        className="inset-0  h-[40vh] w-full object-cover object-center rounded-lg transition duration-200 group-hover:scale-110"
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt={`moofi-${data.original_title}`}
      />

      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-4/6  font-medium ">
          <p>
            <span className="underline">Homepage:</span>{" "}
            <Link to={data.homepage} target="_blank" rel="noreferrer">
              Link
            </Link>
          </p>
          <p>
            <span className="underline">Original language:</span>{" "}
            {data.original_language}
          </p>
          <p>
            <span className="underline">Overview:</span> {data.overview}
          </p>
          <p>
            <span className="underline">Release date:</span> {data.release_date}
          </p>
        </div>

        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
