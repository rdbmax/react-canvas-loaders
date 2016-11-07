import React from 'react'
import { storiesOf } from '@kadira/storybook'
import LoaderParticles from '../loader-particles'
import LoaderWaves from '../loader-waves'
import LoaderCircle from '../loader-circle'

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

storiesOf('LoaderCircle', module)
  .add('defaut loader', () => <LoaderCircle />)
