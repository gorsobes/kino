import React, { useState,useEffect } from 'react';
import BasicExample from './VariantsExample';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import {Link} from 'react-router-dom';
import img from './no_poster.jpg';
import './Movie.css';
const API_KEY = 'F3RY5H6-K5H45VV-MWT48AF-XNZJNVD';
let inputRef = React.createRef();  

function MovieYear() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [counter, setCounter] = useState(2022);
    const [pagecount, setPageCount] = useState(1);
   
   
    const handleChange = (e) => {
      e.preventDefault(); 
      let n = inputRef.current.value;
      if(isNaN(parseFloat(n)) && !isFinite(n)){
        alert('ВВЕДИТЕ ЧИСЛА || c 1950 по 2025')
        
      }
     if(n < 1949 || n > 2026){
      alert('ВВЕДИТЕ ЧИСЛА || c 1950 по 2025')
     }

      
      if(!isNaN(parseFloat(n)) && isFinite(n) && n >= 1950 && n <= 2025){
        setCounter(n); 
        setPageCount(1);
      }
     
    };

    
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
      fetch(`https://api.kinopoisk.dev/movie?token=${API_KEY}&search=${counter}&field=year&page=${pagecount}`)
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
    }, [counter,pagecount])

    if(items.message === "id not found"){

      setCounter(counter)
      
    } 
    if(items.message === "You made more than 200 requests per day. The limits will be updated at 00: 00. To get more limits and a personal token, write to telegram @mdwit"){
      return <div><h2>Ошибка: {items.ruMessage} </h2>
      <BasicExample /> </div>;
    } 
    if (error) {
      return <div>Ошибка: {error.message}  </div>;
    } else if (!isLoaded) {
      return <BasicExample />;
    } else {
     

      let linefilter =  items.docs.filter(el => el.name !== null && el.poster !== null) 
      if(linefilter.length === 0){
        return (
        
          <div>
           
             <Container>
             <Row className=''>
      <div className='hr'><hr /></div>
      <Col><Link to="/" className='nav-link buttonRandom menu hovactiv'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
      <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu ok">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
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
             <Row>
           
           <Col md={{ span:3, offset: 0 }}>
           <Form className="search-form" >
           <input type="text" ref={inputRef} placeholder="2022" />  
        <button variant="outline-secondary" onClick={handleChange} id="button-addon2">  
          ГОД 
        </button>  
      </Form>

           </Col>
            </Row>
        <Row>
       
          <Col sm={12}>
  
         
            <div  className='block'>
            <div><hr /></div>
            <h2> -нет данных</h2> 
            <p className='description'><span>Обзор: </span> -нет данных</p>
             <img key={items.id} src={img} className='posterImg' alt=''/>
              
            
          
           <Badge bg="info"> 
            IMDB: 0<br/>
         
           </Badge><br/> 
           <Badge bg="info"> 
          
           КИНОПОИСК: 0 
           </Badge><br/> 
           <Badge bg="success">Год выпуска: -нет данных</Badge><br/>
          
           </div>
         
          </Col>
         
        </Row>
       
        <Row>
        <div className='hr'><hr /></div>
        <Col><Link to="/" className='nav-link buttonRandom menu hovactiv'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
        <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu ok">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
        </Row>
      </Container>
          </div>
        );
      }
     const data = isPalindrome(linefilter);
      
      return (
        
        <div>
         
           <Container>
          
      <Row className=''>
      <div className='hr'><hr /></div>
      <Col><Link to="/" className='nav-link buttonRandom menu hovactiv'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
      <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu ok">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
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
           <Row>
           
           <Col md={{ span:3, offset: 0 }}>
           <Form className="search-form" >
           <input type="text" ref={inputRef} placeholder="2022"/>  
        <button variant="outline-secondary" onClick={handleChange} id="button-addon2">  
          ГОД 
        </button>  
      </Form>

           </Col>
            </Row>
      <Row>
     
        <Col sm={12}>

        {data.map((item,index) => (
          <div  className='block' key={index}>
             <div><hr /></div>
           <h2 className='name'> {item.name || '-нет данных'}</h2>
           <p className='description'><span>Обзор: </span>{item.description || '-нет данных'}</p>
           <img key={item.id} src={item.poster.url || item.poster } className='posterImg' alt=''/>
           <Badge bg="warning"> 
          {item.type === 'tv-series' ? 'СЕРИАЛ' : 'ФИЛЬМ'|| '-нет данных'}<br/>
         </Badge><br/> 
           <Badge bg="info"> 
         

          IMDB: {item.rating.imdb === null || item.rating.imdb === undefined ? 0 : item.rating.imdb.toFixed(1)}<br/>
         </Badge><br/> 
         <Badge bg="info"> 
         КИНОПОИСК: {item.rating.kp === null || item.rating.kp === undefined ? 0 : item.rating.kp.toFixed(1) }
         </Badge><br/> 
         <Badge bg="success">Год выпуска: {item.year || '-нет данных-:('}</Badge><br/>
       
         </div>
       ))}
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
      <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu ok">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
      </Row>
    </Container>
        </div>
      );
    }
  }
  
  export default MovieYear;
 