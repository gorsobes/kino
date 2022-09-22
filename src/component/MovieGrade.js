import React, { useState,useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import {Link} from 'react-router-dom';
import './Movie.css';
import BasicExample from './VariantsExample';
import img from './no_poster.jpg';
const API_KEY = 'F3RY5H6-K5H45VV-MWT48AF-XNZJNVD';


function MovieGrade() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [counter, setCounter] = useState(1990);
    const [pagecount, setPageCount] = useState(1);
    const [value, setValue] = useState(1980);
    const [valuekp, setValuekp] = useState(10);

    function chengeSelectkp(e) {
      let kp = (e.target.value);
      switch (kp){
        case '7-10':
          setValuekp(10);
    setPageCount(1);
    break;
  case '4-7':
    setValuekp(7);
    setPageCount(1);
    break;
  case '1-4':
    setValuekp(4);
    setPageCount(1);
    break;
      default:
        setValue(1980);
      }
    }

   
    function chengeSelect(e) {
     
      let y = (e.target.value);

switch (y) {
  case '1980-90':
    setValue(1980);
    setPageCount(1);
    break;
  case '1990-2000':
    setValue(1990);
    setCounter(2000);
    setPageCount(1);
    break;
  case '2000-2010':
    setValue(2000);
    setCounter(2010);
    setPageCount(1);
    break;
    case '2010-2012':
      setValue(2010);
      setCounter(2012);
      setPageCount(1);
      break;
      
      case '2012-2014':
        setValue(2012);
        setCounter(2014);
        setPageCount(1);
        break;
        case '2014-2016':
        setValue(2014);
        setCounter(2016);
        setPageCount(1);
        break;
        case '2016-2018':
        setValue(2016);
        setCounter(2018);
        setPageCount(1);
        break;
        case '2018-2020':
        setValue(2018);
        setCounter(2020);
        setPageCount(1);
        break;
        case '2020-2022':
        setValue(2020);
        setCounter(2022);
        setPageCount(1);
        break;
  default:
    setValue(1980);
}
    }

    

    const pageClick = (inc) =>{
      if((pagecount + inc) >0 &&(pagecount + inc) <= items.pages ){
        setPageCount(pagecount + inc)
      }
       
      }
  
      function isPalindrome(line) {
        for (let i = 0; i < line.length; i++) {
          if(line[i].poster === null){
            line[i].poster = img
          } 
        }
       return line
       }
  

    useEffect(() => {
      fetch(`https://api.kinopoisk.dev/movie?field=rating.kp&search=${valuekp -3}-${valuekp}&field=year&search=${value}-${counter}&field=typeNumber&search=1-2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&&page=${pagecount}&token=${API_KEY}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
           
          },
          
          (error) => {
            
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [counter,pagecount,value,valuekp])

    if(items.message === "id not found"){
      return <BasicExample />;
   
    } 
    if(items.message === "You made more than 200 requests per day. The limits will be updated at 00: 00. To get more limits and a personal token, write to telegram @mdwit"){
      return <div><h2>Ошибка: {items.ruMessage} </h2> 
      <BasicExample />
      </div>;
    } 
    if (error) {
      return <div>Ошибка: {error.message}  </div>;
    } else if (!isLoaded) {
      return <BasicExample />;
    } else {
     
      const data = isPalindrome(items.docs);
      
      return (
        
        <div>
         
           <Container>
          
      <Row className=''>
      <div className='hr'><hr /></div>
      <Col><Link to="/" className='nav-link buttonRandom menu hovactiv'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
        <Col><Link to="/moviegrade" className='nav-link buttonRandom menu ok'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu hovactiv">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
      </Row>
      <Row className='rowfoo'>
           <Col md={{ span: 0, offset: 0 }}>
           <Pagination>
      <Pagination.First onClick={(e) => pageClick(-(pagecount - 1))}/>
      <Pagination.Prev onClick={(e) => pageClick(-1)}/>
      <Pagination.Item onClick={(e) => pageClick(-(pagecount - 1))}>{items.pages - (items.pages -1)}</Pagination.Item>
      <Pagination.Ellipsis onClick={(e) => pageClick(-10)}/>
      <Pagination.Item active>{pagecount}</Pagination.Item>
      <Pagination.Ellipsis onClick={(e) => pageClick(10)}/>
      <Pagination.Item onClick={(e) => pageClick(items.pages - pagecount)}>{items.pages}</Pagination.Item>
      <Pagination.Next onClick={(e) => pageClick(1)}/>
      <Pagination.Last onClick={(e) => pageClick(items.pages - pagecount)}/>
    </Pagination>
    <select onChange={chengeSelect} className='select'>
         <option>1980-90</option>
         <option>1990-2000</option>
         <option>2000-2010</option>
         <option>2010-2012</option>
         <option>2012-2014</option>
         <option>2014-2016</option>
         <option>2016-2018</option>
         <option>2018-2020</option>
         <option>2020-2022</option>
        
      </select>
      <p className='pselect'>
         Период:
      </p>
      <select onChange={chengeSelectkp} className='select kp'>
         <option>7-10</option>
         <option>4-7</option>
         <option>1-4</option>
       
      </select>
      <p className='pselect kpp'>
         Оценка по КП:
      </p>

            </Col>
           </Row>
           <Row>
           <Col sm={12}>

        {data.map((item,index) => (
          <div className='block' key={index}>
             <div><hr /></div>
           <h2  className='name'> {item.name || '-нет данных'}</h2>
           <p  className='description'><span>Обзор: </span>{item.description || '-нет данных'}</p>
           
           <img src={item.poster.url || item.poster } className='posterImg' alt=''/>
           <Badge bg="warning" > 
          {item.type === 'tv-series' ? 'СЕРИАЛ' : 'ФИЛЬМ'|| '-нет данных'}<br/>
         </Badge><br/> 
           <Badge bg="info"> 
          IMDB: {item.rating.imdb === null || item.rating.imdb === undefined ? 0 : item.rating.imdb.toFixed(1)}<br/>
         </Badge><br/> 
         <Badge bg="info"> 
         КИНОПОИСК: {item.rating.kp === null || item.rating.kp === undefined ? 0 : item.rating.kp.toFixed(1) }
         </Badge><br/> 
         <Badge bg="success" >Год выпуска: {item.year || '-нет данных-:('}</Badge><br/>
       
         </div>
       ))}
        </Col>
          
            </Row>
      <Row>
     
        <Col sm={12}>

       
        </Col>
       
      </Row>
      <Row>
           <Col md={{ span: 0, offset: 0 }}>
           <Pagination>
      <Pagination.First onClick={(e) => pageClick(-(pagecount - 1))}/>
      <Pagination.Prev onClick={(e) => pageClick(-1)}/>
      <Pagination.Item onClick={(e) => pageClick(-(pagecount - 1))}>{items.pages - (items.pages -1)}</Pagination.Item>
      <Pagination.Ellipsis onClick={(e) => pageClick(-10)}/>
      <Pagination.Item active>{pagecount}</Pagination.Item>
      <Pagination.Ellipsis onClick={(e) => pageClick(10)}/>
      <Pagination.Item onClick={(e) => pageClick(items.pages - pagecount)}>{items.pages}</Pagination.Item>
      <Pagination.Next onClick={(e) => pageClick(1)}/>
      <Pagination.Last onClick={(e) => pageClick(items.pages - pagecount)}/>
    </Pagination>

            </Col>
           </Row>
    
      <Row className='visit'>
      <div className='hr'><hr /></div>
      <Col><Link to="/" className='nav-link buttonRandom menu hovactiv'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
      <Col><Link to="/moviegrade" className='nav-link buttonRandom menu ok'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu hovactiv">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
      </Row>
    </Container>
        </div>
      );
    }
  }
  
  export default MovieGrade;
 