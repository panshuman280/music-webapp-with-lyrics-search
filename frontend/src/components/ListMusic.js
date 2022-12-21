import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Track = () => {
  const [musicList, setMusicList] = useState([])

  const getDataFromBackend = async () => {
    const response = await fetch("http://localhost:5000/music/getall")
    const data = await response.json()
    console.log(data)
    setMusicList(data)
  }

  useEffect(() => {
    getDataFromBackend()
  }, [])

  const displayData = () => {
    return musicList.map((music) => (
      <div className="col-md-3 mt-4">
        <div className="card">
            <img id="img"className="card-img-top" src={"http://localhost:5000/" + music.image} alt="" />
          <div className="card-body">
            <h4 id="details">{music.title}</h4>
            <p id="details" className="text-muted">{music.artist}</p>
            <p id="details" className="float-end text-muted">{music.publisher} | {music.year}</p>
            <Link className="btn btn-warning w-100" to={'/playmusic/'+music._id}>Play Now</Link>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div>
      <header className="bg-dark bg-gradient">
        <div className="container text-center">
          <p className="display-1 fw-bold text-white">Music WebApp</p>
        </div>
      </header>
      <div className="search">
        <input type="text" placeholder="Search..."></input>
      </div>

      <div className="container mt-5">
        <div className="row">{displayData()}</div>
      </div>
    </div>
  )
}

export default Track
