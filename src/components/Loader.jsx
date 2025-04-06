import "./Loader.css"
import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

function Loader() {
  return (
<Player
src='https://lottie.host/d44036d7-b1d5-49d5-b56f-35e887bb9c02/tOWqnT35MK.json'
className="player"
loop
autoplay
style={{ height: '300px', width: '300px' }}
/>
  )
}

export default Loader
