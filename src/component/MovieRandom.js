import React, { useState,useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom';
import img from './no_poster.jpg';
import './Movie.css';
import BasicExample from './VariantsExample';
const API_KEY = 'F3RY5H6-K5H45VV-MWT48AF-XNZJNVD';


function MovieRandom() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [counter, setCounter] = useState(320);
   
    let min = 298;
    let max = 5998;
    const rand = Math.round(min + Math.random() * (max - min));
    const handleClick=()=> {
      setCounter(rand);
      
    }
    

    useEffect(() => {
      fetch(`https://api.kinopoisk.dev/movie?token=${API_KEY}&search=${counter}&field=id`)
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
    }, [counter])
    
    if(items.message === "id not found"){
      return (<>
      <div>
         
         <Container>
         <Row className=''>
      <div className='hr'><hr /></div>
     
        <Col><Link to="/" className='nav-link buttonRandom menu ok'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
        <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu hovactiv">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
      </Row>
    <Row>
      <Col sm={4} className='block'>
      <img key={counter} src={img} className='posterImg randoms' alt='poster'/>
      </Col>
      <Col sm={8}>
      <h2>-нет данных</h2> 
      <p className='description desrandoms'><span>Обзор: </span>-нет данных</p>
       <Badge className='desrandoms' bg="warning">Слоган: -нет данных</Badge><br/>
    <Badge bg="info" className='desrandoms'> 
        IMDB:0<br/>
       КИНОПОИСК: 0
       </Badge><br/>
       <Badge className='desrandoms' bg="success">Год выпуска: -нет данных</Badge><br/>
       <button onClick={handleClick} className='button15'>НАЖМИ ДЛЯ СЛУЧАЙНОГО ПОИСКА</button>
      </Col>
    </Row>
    <Row className='visit'>
    <div className='hr'><hr /></div>
    <Col><Link to="/" className='nav-link buttonRandom menu ok'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
    <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu hovactiv">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
    </Row>
  </Container>
      </div>
      </>
      )
    } 
    if(items.message === "You made more than 200 requests per day. The limits will be updated at 00: 00. To get more limits and a personal token, write to telegram @mdwit"){
      return <div><h2>Ошибка: {items.ruMessage} </h2> <BasicExample /></div>;
    } 
    if (error) {
      return <div>Ошибка: {error.message}  </div>;
    } else if (!isLoaded) {
      return <BasicExample />;
    } else {
     
      if(items.poster === null){
        items.poster = img
      }

      const imbd = items.rating.imdb === null || items.rating.imdb === undefined ? 0 : items.rating.imdb.toFixed(1)
      const kp = items.rating.kp === null || items.rating.kp === undefined ? 0 : items.rating.kp.toFixed(1)

      return (
        
        <div>
         
           <Container>
           <Row className=''>
      <div className='hr'><hr /></div>
     
        <Col><Link to="/" className='nav-link buttonRandom menu ok'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
        <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu hovactiv">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
      </Row>
      <Row>
        <Col sm={4} className='block'>
        <img key={items.id} src={items.poster.url || items.poster} className='posterImg randoms' alt='poster'/>
        </Col>
        <Col sm={8}>
        <h2>{items.name}</h2> 
        <p className='description desrandoms'><span>Обзор: </span>{items.description || '-нет данных'}</p>
        <Badge bg="warning" className='desrandoms'> 
          {items.type === 'tv-series' ? 'СЕРИАЛ' : 'ФИЛЬМ'|| '-нет данных'}<br/>
         </Badge><br/> 
         <Badge className='desrandoms' bg="secondary">{items.slogan || '-нет данных'}</Badge><br/>
      <Badge bg="info" className='desrandoms'> 
          IMDB: {imbd }<br/>
         КИНОПОИСК: {kp}
         </Badge><br/>
         <Badge className='desrandoms' bg="success">Год выпуска: {items.year}</Badge><br/>
         <button onClick={handleClick} className='button15'>НАЖМИ ДЛЯ СЛУЧАЙНОГО ПОИСКА</button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 12, offset: 0 }}>
        <Accordion defaultActiveKey="" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>В главных ролях</Accordion.Header>
        <Accordion.Body>
        {items.persons.map(item => (
           
           <Alert key={item.id  + item.enProfession || rand} variant='secondary' className='grid-container'>
          {item.name || '-----------'}
         </Alert>  
       ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </Col>
      </Row>
      <Row className='visit'>
      <div className='hr'><hr /></div>
     
        <Col><Link to="/" className='nav-link buttonRandom menu ok'>СЛУЧАЙНЫЙ ПОИСК</Link></Col>
        <Col><Link to="/moviegrade" className='nav-link buttonRandom menu hovactiv'>ПОИСК ПО ОЦЕНКИ</Link></Col>
        <Col><Link to="/movieyear" className="nav-link buttonRandom menu hovactiv">ПОИСК ПО ГОДУ</Link></Col>
        <div className='hr'><hr /></div>
      </Row>
    </Container>
        </div>
      );
    }
  }
  
  export default MovieRandom;
 