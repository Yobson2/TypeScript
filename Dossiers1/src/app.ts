//Les Alias
type User={nom:string, [text:string]:string}
type dateString=string

const compteur=document.querySelector('#compteur') as HTMLDivElement;
let i=0;
const inscrement=(e:Event)=>{
    e.preventDefault();
    i++;
    const spanElement = compteur?.querySelector('span') as HTMLSpanElement;
    if(spanElement){
        spanElement.innerText=i.toString();
    }
    
}

compteur.addEventListener('click', inscrement);

//Les generics
//Consiste à parametrer mes elements (ex: les types et autres)
// en gros en capture le type de l'element passé en paramtres
function  identity<ArgType>(arg:ArgType):ArgType{
    return arg
}

// function testArr<ArrType>(arg:ArrType[]):ArrType{
//    return arg[2];
// }

// const a=identity(3);
// const testok:Array<string | number>=["foo", "bar",2];
// const arr:string[] = [];
// const user:User={nom:"yoboue",profit:"yyoyo"}
// const date:dateString="string";

// console.log('mes resultats:',user);



// Les classes

class GenericNumber {
  public a=12;
}

const atl= new GenericNumber();
console.log(atl.a)


// les interfaces 

interface Point {
    x: number;
    y: number;
    
}

function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
  }

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);



// les types supplementaires

