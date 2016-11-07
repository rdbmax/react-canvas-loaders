import React from 'react'
import { storiesOf } from '@kadira/storybook'
import LoaderParticles from '../loader-particles'
import LoaderWaves from '../loader-waves'
import LoaderCircles from '../loader-circles'

import LoaderSphere from '../loader-sphere'


storiesOf('LoaderParticles', module)
  .add('default loader', () => <LoaderParticles />)
  .add('colored loader', () => <LoaderParticles colorParticles='red' />)
  .add('sized loader', () => <LoaderParticles loaderSize={ 400 } />)
  .add('sized loader particles', () => <LoaderParticles particleSize={ 20 } />)
  .add('custom particles number', () => <LoaderParticles particlesQuantity={ 15 } />)
  .add('custom velocity', () => <LoaderParticles loaderVelocity={ 1 } />)
  .add('all properties', () =>
    <LoaderParticles
      colorParticles='grey'
      loaderSize={ 600 }
      particleSize={ 13 }
      particlesQuantity={ 200 } />)

storiesOf('LoaderWaves', module)
  .add('default loader', () => <LoaderWaves />)
  .add('custom colors', () => <LoaderWaves waveColor='green' borderColor='red' />)
  .add('sized canvas', () => <LoaderWaves size={ 50 } />)
  .add('sized waves', () => <LoaderWaves waveSize={ 0.6 } />)
  .add('sized border', () => <LoaderWaves borderSize={ 30 } />)
  .add('cool wave', () =>
    <LoaderWaves
      size={ 100 }
      borderSize={ 10 }
      waveSize={ 0.3 }
      borderColor='#AAAAAA'
      waveColor='#DDDDDD' />)

storiesOf('LoaderCircles', module)
  .add('defaut loader', () => <LoaderCircles />)
  .add('custom color', () => <LoaderCircles colorCircles='rgba(43, 156, 137, 0.5)' />)
  .add('custom quantity', () => <LoaderCircles circlesQuantity={ 5 } />)
  .add('custom size', () => <LoaderCircles loaderSize={ 200 } />)

storiesOf('LoaderSphere', module)
  .add('defaut loader', () => <LoaderSphere loaderWidth={ 300 } loaderHeight={ 300 } />)
