const { Engine, Render, Runner, World, Bodies, Body, Events,MouseConstraint,Mouse } = Matter;

const engine = Engine.create();
const { world } = engine;

const width = window.innerWidth
const height = window.innerHeight
//audio
const music = new Audio('/audio/music.mp3')
const ambience = new Audio('/audio/ambience.mp3')
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width,
        height,
        wireframes: false,
        background:'rgba(70,50,22,0.4)' 
    }
})

Render.run(render);
Runner.run(Runner.create(), engine);
World.add(world,MouseConstraint.create(engine,{
    mouse:Mouse.create(render.canvas)
}))


//walls
const walls = Bodies.rectangle(width / 2, height, width, 22, {
        isStatic: true,
        label: "pavement"
    })

World.add(world, walls)



//raindrops
let raindrop;
const generateRainDrops = () => {
    randPositionX = Math.floor(Math.random() * width)
    raindrop = Bodies.circle(randPositionX, 0, 4, {
        isStatic: false,
        label: "raindrop",
        render: {
            sprite: {
                texture: './imgs/rain.png',
                xScale:1,
                yScale:1
            }
        }
    })
    World.add(world, raindrop)

}

// player
const umbrella = Bodies.rectangle(width/2,height/2,30,30,{
    isStatic:false
})

// World.add(world,umbrella)
// generate and check for collision 
setInterval(() => {
    generateRainDrops()
    Events.on(engine, 'collisionStart', e => {
        console.log(e)
        e.forEach(collision => {
            World.remove(world, raindrop)
        })
    })
}, 100)

window.addEventListener('focus',()=>{
    music.play()
    ambience.play()
})


   

