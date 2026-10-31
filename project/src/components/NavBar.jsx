import { Link } from "react-router-dom"


const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-6 px-10 bg-(--c2)">
            <Link to='/' className=" text-2xl font-medium">MediaSearch</Link>
            <div className="flex gap-5 text-xl items-center">
                <Link className="text-base font-medium active:scale-95 bg-(--c4) text-(--c1) rounded px-4 py-2 " to='/'>Search</Link>
                <Link className="text-base font-medium active:scale-95 bg-(--c4) text-(--c1) rounded px-4 py-2 " to='/collection'>Collection</Link>
            </div>
        </div>
  )
}

export default NavBar