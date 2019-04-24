import React, { Component } from 'react';
import '../assets/css/photos.css';
/* get filmstrip items from database */
const api_url = 'http://localhost:3002/filmstrip';
/* get context for the images */
const img = require.context('../assets/img/filmstrip/thumbnails', true);
const image = require.context('../assets/img/filmstrip', true);

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: './_8.jpg',
      alt: ''
    }
  }
  render() {
    return (
      <div className="container">
        <div className="filmstrip">
          <h4 className="heading4">{this.props.title}</h4>
          <Thumbnails setcurrent={this.setCurrent}/>
        </div>
        <Zoom imgsrc={this.state.current} imgalt={this.state.alt}/>
      </div>
    )
  }
  setCurrent = (e) => {
    this.setState({
      current: e.currentTarget.attributes['imagesrc'].value,
      alt: e.currentTarget.attributes['imagealt'].value
    });
  }
}

class Thumbnails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.strip = this.refs;
  }

  componentDidMount() {
    fetch(api_url)
      .then(res=>res.json())
      .then(data=>this.setState({ items: data.items }))
  }

  render() {
    return (
      <div className="filmstrip-wrapper">
        <div className="btn-area-left">
        <button className="btn-left" onClick={this.scrollLeft}>&lt;</button>
        </div>
        <ul className="thumbnails" ref={ul=>this.strip=ul}>
        {
          this.state.items.map((item, index)=>
            <Thumbnail setcurrent={this.props.setcurrent} key={index} title={item.title} img={item.img} />
          )
        }
        </ul>
        <div className="btn-area-right">
          <button className="btn-right" onClick={this.scrollRight}>&gt;</button>
        </div>
      </div>
    )
  }
  scrollRight = (e) => {
    this.strip.scrollLeft += 200;
  }

  scrollLeft = (e) => {
    this.strip.scrollLeft -= 200;
  }
}

class Thumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.img
    }
  }
  render() {
    return (
      <li className="listitem" onClick={this.props.setcurrent} imagesrc={this.props.img.src} imagealt={this.props.img.desc}>
        <div className="item">
          <img src={img(this.props.img.src)} alt={this.props.img.desc} />
          <span className="itemcaption">{this.props.title}</span>
        </div>
      </li>
    )
  }
}

class Zoom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgsrc: this.props.imgsrc,
      imgalt: this.props.imgalt
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      imgsrc: props.imgsrc,
      imgalt: props.imgalt
    })
  }
  render() {
    return (
      <div className="showcase">
        <img src={image(this.state.imgsrc)} alt={this.state.imgalt} onLoad={this.fadein} />
      </div>
    )
  }
  fadein = (e) => {
    e.currentTarget.classList.remove('fadein');
    e.currentTarget.classList.add('fadein');
  }
}

export default Photos;
