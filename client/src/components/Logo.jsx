import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

function Logo() {
  return (
    <div>
        <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex gap-1 align-middle"
      >
        {/* <span className="px-2 py-1 bg-gradient-to-r from-[rgba(0,152,43,1)] via-[rgb(32,12,43)] to-[rgba(0,212,255,1)] rounded-xl text-white">
          TECH
        </span> */}
        <img src={logo} alt="logo" className="h-10 w-10 rounded-full"  />
        <span>
          Blogs
        </span>
      </Link>
    </div>
  )
}

export default Logo

export function PageLogo() {
  return (
    <div className="flex">
        <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex gap-1 justify-items-center justify-self-center"
      >
        {/* <span className="px-2 py-1 bg-gradient-to-r from-[rgba(0,152,43,1)] via-[rgb(32,12,43)] to-[rgba(0,212,255,1)] rounded-xl text-white">
          TECH
        </span> */}
        <img src={logo} alt="logo" className="h-20 w-20"  />
        <span className="font-bold text-4xl">
          Blogs
        </span>
      </Link>
    </div>
  )
}

