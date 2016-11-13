# react-canvas-loaders


This project provides loader components for your react application.
Our loaders use the HTML5 Canvas as technology.

For the moment, just one loader is avalaible.



## Install

You can install the module via npm :

`npm i -S react-canvas-loaders`


## Loaders


### loader-particles

#### import

```
import LoaderParticles from 'react-canvas-loaders/dist/loader-particles'

...

<LoaderParticles />
```

#### Props

All props are optional

- `colorParticles`
`type: string`
`default: multiColor`

- `loaderSize`
`type: number`
`default: 200`

- `particleSize`
`type: number`
`default: 5`

- `particlesQuantity`
`type: number`
`default: 50`

- `loaderVelocity`
`type: number`
`default: 5`


### loader-waves

#### import

```
import LoaderWaves from 'react-canvas-loaders/dist/loader-waves'

...

<LoaderWaves />
```

#### Props

All props are optional

- `waveColor`
`type: string`
`default: black`

- `waveSize`
`type: number`
`default: 0.2`

- `borderColor`
`type: string`
`default: black`

- `borderSize`
`type: number`
`default: 10`

- `size`
`type: number`
`default: 300`

### loader-circles

#### import

```
import LoaderCircles from 'react-canvas-loaders/dist/loader-circles'

...

<LoaderCircles />
```

#### Props

All props are optional

- `colorCircles`
`type: string`
`default: rgba(0, 0, 0, 0.5)`

- `circlesQuantity`
`type: number`
`default: 3`

- `loaderSize`
`type: number`
`default: 100`

### loader-spheres

#### import

```
import LoaderSpheres from 'react-canvas-loaders/dist/loader-spheres'

...

<LoaderSpheres />
```
