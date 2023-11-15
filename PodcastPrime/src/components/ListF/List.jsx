// import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
// import {ArrowBackIosIcon,ArrowForwardIosIcon} from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {React,useRef,useState} from 'react';
import ListItem from '../ListItemF/ListItem';

import './List.scss';

const List = ({list}) => {

  const [slideNumber, setslideNumber] = useState(0);
  const listRef = useRef();
  const handleClick = (direction)=>{
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if(direction === "left" && slideNumber > 0)
    {
        setslideNumber(slideNumber-1);
        listRef.current.style.transform = `translateX(${230+distance}px)`
    }
    if(direction === "right" && slideNumber < 4)
    {
        setslideNumber(slideNumber+1);
        listRef.current.style.transform = `translateX(${-230+distance}px)`
    }
  }

  return (
    <div className='list'>
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosIcon style={{display:`${slideNumber ===0 ?`none`:''} `}} className='sliderArrow left' onClick={()=>{handleClick("left")}}/>
        <div className="container" ref={listRef}>
            {list.content.map((item,i)=> (
            <ListItem index={i} item = {item} />
            ))}
            
        </div>
        <ArrowForwardIosIcon style={{display: `${list.content.length < 5 ? `none`:''}`}} className='sliderArrow right' onClick={()=>{handleClick("right")}}/>
      </div>
    </div>
  );
}

export default List;
