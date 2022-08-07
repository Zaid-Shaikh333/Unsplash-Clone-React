import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_ID } from '../Secret';

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const category_url = `https://api.unsplash.com/topics?client_id=${CLIENT_ID}`;

    useEffect(() => {
        fetch(category_url)
            .then(res => res.json())
            .then(data => setCategories(data))

        //console.log('UseEffect called');
    }, [])

    return (
        <>
            <ul>
                <Link to='/' className='category-links'>
                <li>Explore</li>
                </Link>
                {
                    categories.length > 0 &&
                    categories.map((category) => (
                        <Link to={`/category/${category.id}`} key={category.id} className='category-links'>
                            <li>{category.title}</li>
                        </Link>
                    ))
                }
            </ul>
        </>
    )
}