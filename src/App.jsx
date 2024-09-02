import { useEffect, useState } from 'react'

import Stories from 'react-insta-stories'
import Confetti from 'react-confetti'

import image1 from './assets/1.gif'
import image2 from './assets/2.gif'
import image3 from './assets/3.gif'
import image4 from './assets/4.gif'
import image5 from './assets/5.gif'

import './App.css'

const duration = 7500
// header
const header = {
  heading: 'wat am i doing',
  profileImage:
    'https://img-05.stickers.cloud/packs/4c591eae-2985-4839-88be-57d884eadcad/webp/067b8d14-437c-48c3-86b5-d5909fbefe24.webp'
}

const storyContent = {
  width: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  margin: 'auto'
}

const App = () => {
  const initialStories = [
    {
      url: image1,
      type: 'image',
      header: header,
      duration: 9000
    },
    {
      url: image2,
      type: 'image',
      header: header
    },
    {
      url: image3,
      type: 'image',
      header: header
    },
    {
      url: image4,
      type: 'image',
      header: header
    },
    {
      url: image5,
      type: 'image',
      header: header
    }
  ]
  const [stories, setStories] = useState(initialStories)

  const [showConfetti, setShowConfetti] = useState(false)
  const [isConfetting, setIsConfetting] = useState(false)

  const handleClick = () => {
    setIsConfetting(!isConfetting)
    setShowConfetti(!showConfetti)
  }

  // rainbox header text
  const rainbowText = ({
    minSize,
    maxSize,
    selector,
    align,
    rainbow,
    speed,
    rainbowSpeed,
    frequency
  }) => {
    const wordContainers = document.querySelectorAll(selector)

    wordContainers.forEach((wordContainer) => {
      const phaseOffset = 180 + Math.random() * 180

      const word = wordContainer.innerText
      wordContainer.style.alignItems = align

      const spanify = (word) => {
        let HTMLString = ''
        word.split('').forEach((l) => {
          l === ' '
            ? (HTMLString += `<span>&nbsp;</span>`)
            : (HTMLString += `<span>${l}</span>`)
        })
        return HTMLString
      }

      wordContainer.innerHTML = spanify(word)

      const letters = [].slice.call(wordContainer.querySelectorAll('span'))

      const loop = (ms) => {
        requestAnimationFrame(loop)
        letters.forEach((l, i) => {
          let fontSize = parseInt(
            Math.sin(phaseOffset + ms / (360 * speed) + i / frequency) *
              (maxSize - minSize) +
              maxSize,
            10
          )
          l.style.fontSize = `${fontSize}px`
          if (rainbow) {
            l.style.color = `hsl(${ms / rainbowSpeed + i * 20}, 50%, 50%)`
            l.style.textShadow = ` 0 0 12px hsl(${
              ms / rainbowSpeed + i * 20
            }, 50%, 50%)`
          }
        })
      }

      loop(0)
    })
  }
  useEffect(() => {
    rainbowText({
      selector: '.wavy-text', // css selector of word container
      minSize: 24, // in pixels
      maxSize: 40, // in pixels
      align: 'flex-end', // align items for letters in flexbox
      rainbow: true, // enables hue change
      speed: 1, // 1 is 2PI in rad., 0.5 is PI in rad. etc
      rainbowSpeed: 3, // speed of hue color change,
      frequency: -1.5 // frequency of sine
    })
  }, [])

  useEffect(() => {
    document.body.addEventListener(
      'touchstart',
      function (e) {
        e.stopPropagation()
      },
      { capture: true, passive: false }
    )
  }, [])

  return (
    <>
      {showConfetti && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          <Confetti width={390} height={1080} numberOfPieces={250} />
        </div>
      )}
      <div className='header'>
        <div className='wavy-body'>
          <div className='wavy-text'>CoNgRaTuLaTiOnS</div>
          <div className='wavy-text'>On</div>
        </div>
      </div>
      <div className='wavy-text'>PrObAtIoN't</div>
      <div className='confetti-body'>
        <div
          className={isConfetting ? 'confetti-clicked' : 'confetti-text'}
          onClick={handleClick}
        >
          🎉🎉🎉
        </div>
        <p
          style={{
            margin: -5,
            fontFamily: 'Consolas',
            fontStyle: 'italic'
          }}
        >
          {isConfetting ? 'you were warned' : 'dont click ☝️'}
        </p>
      </div>
      <div className='body'>
        {/* the stories looking thing goes here */}
        <h2
          style={{
            fontFamily: 'Comic Sans MS',
            alignSelf: 'flex-start',
            fontSize: '1.5em',
            textAlign: 'left'
          }}
        >
          Bitbucket Wrapped
        </h2>

        <div>
          <Stories
            stories={stories}
            defaultInterval={duration}
            // width={'100%'}
            // height={'100vh'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            storyStyles={storyContent}
            loop={true}
            keyboardNavigation={true}
            isPaused={() => {}}
            currentIndex={(index) => {
              console.log('Current Index: ', index)
            }}
            onStoryStart={() => {}}
            onStoryEnd={() => {}}
            onAllStoriesEnd={() => {}}
            onPrevious={() => {}}
            // preventDefault={true}
          />

          <div style={{ width: '100%' }}>
            <p style={{ color: '#242424' }}>lololol my css is amazing</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
