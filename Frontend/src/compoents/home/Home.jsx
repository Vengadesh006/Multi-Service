import React from 'react'
import './Home.css'
import { Header } from '../header/Header'
import { Nav } from '../Nav/Nav'
import { Animation } from '../AnimationScroll/Animation'
import { Card } from '../Card/Card'
import { Counter } from '../counter/Counter'
import { Content } from '../content/Content'


export const Home = () => {

  return (
    <>
     
      <Header />
      <Animation />
      <Card />
      <Content />
      <Counter />
      <section className='img-show container rounded d-none d-md-block ' />
    </>
  )
}



