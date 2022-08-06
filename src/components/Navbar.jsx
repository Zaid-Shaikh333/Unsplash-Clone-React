import './css/home.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        if(e.key === "Enter" && query.length > 0)
        {
            navigate(`/query/${query}`)
        }
    }

    return(
        <>
            <div className="navbar">
                <ul>
                    <li>
                        <input placeholder="Search Free high-resolution Images" className='search-input'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={(e) => handleSearch(e)}
                        />
                    </li>
                    <li>Explore</li>
                    <li>Advertise</li>
                    <li>Blog</li>
                    <li>Login/Sign up</li>
                </ul>
            </div>
        </>
    )
}