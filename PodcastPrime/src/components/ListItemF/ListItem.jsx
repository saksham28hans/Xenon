import {React, useState, useEffect} from 'react';
import './ListItem.scss';
import axios from "axios";
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// import { Star } from '@material-ui/icons';
import StarIcon from '@mui/icons-material/Star';

const ListItem = ({index, item}) => {
  const [isHovered, setisHovered] = useState(false);
  const [movie, setmovie] = useState({});
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,});
  
  useEffect(() => {
    console.log(item);
   
    const getMovie = async()=>{
      try {
        
        const mov = await axiosInstance.get('podcast/find/'+item);
        setmovie(mov.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, [item]);


  

  

  const handleFavoriteClick = async (itemId) => {
    // const itemId = movie._id;
    const user_g = JSON.parse(localStorage.getItem('users'));
    const favorites = user_g.favourite;
    try {
      const res = await axiosInstance.post('users/favourite',{id:user_g._id,podcast:itemId})
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
    
   
    const itemIndex = favorites.findIndex(item => item === itemId);
    if (itemIndex === -1) {
      favorites.push(itemId)
    } else {
      // const newFavorites = [...favorites];
      favorites.splice(itemIndex, 1);
      // setFavorites(newFavorites);
    }

    user_g.favourite = favorites;
    localStorage.setItem('users',JSON.stringify(user_g));

  };




  return (
    <Link className='link' to = {'/watch'} state = {{movie : movie}}>
    <div className='listItem' 
    style={{left:isHovered && index * 225 -50 + index*2.5}}
    onMouseEnter={()=>{setisHovered(true)}} onMouseLeave={()=>{setisHovered(false)}}>
       
      <img src={movie.img} alt={movie.title} />
        

      <div className="itemInfo">
      <div class="listitemdetails">
        <nav>{movie.title}</nav>  
        <span onClick={()=>{handleFavoriteClick(movie._id)}}>{JSON.parse(localStorage.getItem('users')) && JSON.parse(localStorage.getItem('users')).favourite.includes(movie._id) ? <StarIcon /> : <StarBorderIcon />}</span>
        </div>
        {isHovered && (
         <>
         {/* <video src="" controls autoPlay={true}  loop></video> */}
        <div className="itemInfoTop">
          <span className='speaker'>{movie.speaker}</span>
          <span className='type'>{movie.type}</span>
        </div>
        <div className="desc">
         {movie.desc}
        </div>
        </>
        )}
      </div>
    </div>
    </Link>

  );
}

export default ListItem;
