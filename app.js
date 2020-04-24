const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const engine = Engine.create();
const {world } = engine;

const width=window.innerWidth
const height= window.innerHeight


const render = Render.create({
    element:document.body,
    engine:engine,
    options:{
        width,
        height,
        wireframes:true,
    }
})

Render.run(render);
Runner.run(Runner.create(),engine);


const walls = [
   Bodies.rectangle(width / 2, height, width, 22, {
        isStatic: true,
        label:"pavement"
    }),
 
]


World.add(world,walls)


let raindrop;
const generateRainDrops=()=>{
    randPositionX = Math.floor(Math.random() * width)
    raindrop = Bodies.circle(randPositionX, 0, 4, {
        isStatic: false,
        label: "raindrop",
        render:{
            sprite:{
                texture:'./imgs/rain.png'
            }
        }
    })
    World.add(world,raindrop)

}

// generateRainDrops()

setInterval(()=>{
    generateRainDrops()
     Events.on(engine, 'collisionStart', e => {
        e.forEach(collision=>{
            World.remove(world,raindrop)
        })
    })
},300)


    // Events.on(engine, 'collisionStart', () => {
    //     World.remove(world, raindrop)
    // })

