import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router";

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: '',
  }


const MovieForm = props => {
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();

    useEffect( () => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
        .then( (response) => {
            console.log(response.data);
            setItem(response.data);
        })
    },[id]);
    console.log(id);

    const handleChange = e => {
        e.preventDefault();
        setItem({
            ...item,
            [e.target.name]: e.target.value,
            stars: [e.target.value]
        });
        console.log(item);
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, item)
            .then(response => {
                console.log(response);
                setItem(initialItem);
                props.history.push("/");
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='MovieForm'>
            <h1>Movie Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Id'
                    name='id'
                    value={item.id}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Title'
                    name='title'
                    value={item.title}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Director'
                    name='director'
                    value={item.director}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Score'
                    name='metascore'
                    value={item.metascore}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    placeholder='Stars'
                    name='stars'
                    value={item.stars}
                    onChange={handleChange}
                />
                <button>Save</button>
            </form>
        </div>
    )
}

export default MovieForm;