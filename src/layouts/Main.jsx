// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

//  helper functions

// loader
export async function mainLoader() {
  // Example: fetch from backend
  // try {
  //   const res = await fetch("/api/users/me");
  //   if (!res.ok) throw new Error("Failed to fetch user");
  //   const data = await res.json();
  //   return { userName: data.name };
  // } catch (err) {
  //   console.error(err);
  //   return { userName: null };
  // }

  // For now, still read from localStorage
  const userName = JSON.parse(localStorage.getItem("userName"));
  return { userName };
}


const Main = () => {
  const { userName } = useLoaderData()

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  )
}
export default Main