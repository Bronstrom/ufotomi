import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
    // Month & Year state
    const today = new Date();

    return (
        <div className="navbar">
            <div className="logo">
                <NavLink to={"/"}>
                    <h2>Ufotomi</h2>
                </NavLink>
            </div>
            <div className="navpages">
                <Link to={"/"}>
                    <h3>Home</h3>
                </Link>
                <Link to={"/month"}>
                    <h3>Search Month</h3>
                </Link>
                <Link to={"/tag"}>
                    <h3>Search Tag</h3>
                </Link>
            </div>
            <Link to={"/share"}>
                <button>Share Photo</button>
            </Link>
            
        </div>
    );
}