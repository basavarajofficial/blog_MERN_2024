import { Link } from "react-router-dom"

function Logo() {
  return (
    <div>
        <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-[rgba(0,152,43,1)] via-[rgb(32,12,43)] to-[rgba(0,212,255,1)] rounded-xl text-white">
          TECH
        </span>
        Blogs
      </Link>
    </div>
  )
}

export default Logo