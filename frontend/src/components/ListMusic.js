import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Track = () => {
  const [musicList, setMusicList] = useState([])
  const [lyrText, setLyrText] = useState("");
  const [searched, setSearched] = useState(false);

  const getDataFromBackend = async () => {
    const response = await fetch("http://localhost:5000/music/getall")
    const data = await response.json()
    console.log(data)
    setMusicList(data)
  }

  useEffect(() => {
    getDataFromBackend()
  }, [])

  const searchLyrics = async () => {
    const response = await fetch("http://localhost:5000/music/getall")
    const data = await response.json()
    setMusicList(
        data.filter(song => (
          song.lyrics.toLowerCase().includes(lyrText.toLowerCase())
        ))
    )
    setSearched(true);
    
  }

  const displayData = () => {
    return musicList.map((music) => (
      <div className="col-md-3 mt-4">
        <div className="card">
          <img className="card-img-top" src={"http://localhost:5000/" + music.image} alt="" />
          <div className="card-body">
            <h4 id="details">{music.title}</h4>
            <p id="details" className="text-muted">
              {music.artist}
            </p>
            <p id="details" className="float-end text-muted">
              {music.publisher} | {music.year}
            </p>
            <Link className="btn btn-warning w-100" to={"/playmusic/" + music._id}>
              Play Now
            </Link>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div>
      <header className="bg-dark">
        <div className="container text-center py-5">
          <p className="display-1 fw-bold text-white">Music WebApp</p>
          <p className="h4 mt-4 text-white">Search Lyrics Here 👇</p>
          <div className="input-group my-3">
            <input className="form-control" onChange={(e) => setLyrText(e.target.value)} />
            <button className="btn btn-primary" onClick={searchLyrics}>
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="container mt-5">
        <p className="text-white my-4 display-4">{
          musicList.length ?
          (lyrText.length && searched ? `Here are the songs that contain Lyrics❤ : "${lyrText}"` : '' ) 
          
          :
          ' 🙁 No song matched with searched Lyrics'
        }</p>
        <div className="row">{displayData()}</div>
      </div>
    </div>
  )
}

export default Track
