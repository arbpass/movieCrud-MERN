import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    const [movieData, setMovieData] = useState([]);

    const getData = async (e) => {

        try {
            const res = await fetch('home', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await res.json();

            if (res.status === 404 || !data) {
                alert("error");
            }
            else {
                setMovieData(data);
                console.log("data got");
            }

        } catch (error) {
            console.log("error is: " + error.message);
        }
    }


    useEffect(() => {
        getData();
    }, [])


    //delete a movie
    const deleteMovie= async(id)=> {
        try {
            const res2 = await fetch(`delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const deleteData = await res2.json();

            if (res2.status === 404 || !deleteData) {
                alert("error");
            }
            else {
                alert("data deleted");
                getData();
            }

        } catch (error) {
            console.log("error is: " + error.message);
        }
    }

    return (
        <>
            <div className='home'>
                <div class="wrap">
                    <Link to='/addItem'><button class="button">Add Movie</button></Link>
                </div>
                <div className='cardContainer'>

                    {movieData.map(element => (
                        <div className='card'>
                            <img className='cardImg' src={element.imgUrl} />
                            <div className='cardDetails'>
                                <h4>{element.name} - {element.year}</h4>
                                <h5 style={{ marginTop: '10px' }}>{element.producer}</h5>
                                {element.actors.map(ele=> (
                                    <span style={{ marginTop: '3px' }}>{ele}, </span>
                                ))}
                                <br/>
                                <Link to={`edit/${element._id}`}><button className='cardBtn' id='cardEdit'>Edit</button></Link>
                                <button className='cardBtn' onClick={()=>deleteMovie(element._id)} id='cardDelete'>Delete</button>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}

export default Home