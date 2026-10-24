import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { incCount } from "../store";

export default function Home() {

    const count = useSelector((state)=>state.todo.count);
    const dispatch = useDispatch();
    console.log(count)
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Navbar */}
            <nav className="flex items-center justify-between border-b bg-white px-8 py-4">
                <Link to="/" className="text-2xl font-bold">
                    UserManager 

                    <button onClick={()=>{dispatch(incCount())}}>{count}</button>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-black">
                        Home
                    </Link>

                    <Link to="/users" className="text-gray-600 hover:text-black">
                        Users
                    </Link>
                </div>
            </nav>

            {/* Main content */}
            <main className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
                <span className="mb-5 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    React Router Data Routing
                </span>

                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
                    Manage your users
                    <span className="text-blue-600"> with ease.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                    A simple user management application built with React.
                    Explore users and learn how loaders, actions, and
                    route navigation work.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/users"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        View Users →
                    </Link>

                    <a
                        href="https://reactrouter.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium hover:bg-gray-100"
                    >
                        Learn React Router
                    </a>
                </div>
            </main>

            {/* Features */}
            <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 sm:grid-cols-3">
                <Feature
                    title="Loaders"
                    description="Fetch data before rendering a route."
                />

                <Feature
                    title="Actions"
                    description="Handle form submissions and data changes."
                />

                <Feature
                    title="Navigation"
                    description="Move between routes without full page reloads."
                />
            </section>

            <footer className="border-t bg-white px-6 py-6 text-center text-sm text-gray-500">
                Built with React and React Router
            </footer>
        </div>
    );
}

function Feature({ title, description }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
            </p>
        </div>
    );
}