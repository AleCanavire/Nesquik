import { useState, useRef } from 'react'

function usePlayerActions() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const trailerDuration = useRef();

  const actionButton = () => {
    if (isEnded) {
      setIsPlaying(true);
      setIsEnded(false);
    }else{
      setIsMuted(prevState => !prevState);
    }
  }
  const hidePlayer = (e, trailerDuration) => {
    const currentTime = Math.trunc(e.playedSeconds);
    const hideTrailer = trailerDuration - 12;
    currentTime === 3 && setShowTrailer(true);
    currentTime === hideTrailer && setShowTrailer(false);
  }

  const endedTrailer = () => {
    setIsPlaying(false)
    setIsEnded(true);
  }

  return {
    isMuted, isPlaying, setIsPlaying, actionButton, hidePlayer,
    showTrailer, trailerDuration, isEnded, endedTrailer
  }
}

export default usePlayerActions