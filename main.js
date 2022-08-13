// pega os elementos do html e atribui a variavel
const carCanvas=document.getElementById("carCanvas");
const scoreValue=document.getElementById("scoreValue");
carCanvas.width=200;

// cria o contexto do canvas, a estrada e o carro principal
const carCtx = carCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50,"KEYS");

// carros iniciais do jogo
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2,getRandomColor()),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2,getRandomColor()),
];

// animacao do jogo
animate();

function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    // update the max speed every second
    if(time%1000 < 20){
        car.updateMaxSpeed(0.3);
    }

    // update the score
    if(time%1000 < 20){
        if(car.damaged == false){
            scoreValue.innerText = Number(scoreValue.innerText)+1;
        }
    }

    // every second, add a new traffic car
    if(time%1000 < 20){
        if(car.damaged == false){
            crateRandomCar(); // add um novo carro no jogo
        }
    }

    if(car.maxSpeed >= 10){
        if(time%600 < 20){
            if(car.damaged == false){
                crateRandomCar();
            }
        }
    }


    carCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-car.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    car.draw(carCtx,true);

    carCtx.restore();
    requestAnimationFrame(animate);
}

// cria um novo carro aleatorio no jogo
function crateRandomCar(){
    // get a random lane
    const lane=Math.floor(Math.random()*3);
    // get a random position y
    const y= car.y + Math.random()*100*(-1) + car.height*(-1) + carCanvas.height*(-1);
    traffic.push(new Car(road.getLaneCenter(lane),y,30,50,"DUMMY",2,getRandomColor()));
}