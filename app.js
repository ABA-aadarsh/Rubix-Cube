const cubePieces=[...document.querySelectorAll(".cube-piece")]
const styleTag=document.querySelector("style")
const DUMMY=document.querySelector(".dummy")
const movesbuttons=[...document.querySelectorAll(".buttons-container button")]
const rotateButtons=document.querySelectorAll(".rotate button")
const container=document.querySelector(".container")

let frontFace=[1,2,3,4,5,6,7,8,9]
let rightFace=[10,11,12,13,14,15,16,17,18]
let backFace=[19,20,21,22,23,24,25,26,27]
let leftFace=[28,29,30,31,32,33,34,35,36]
let bottomFace=[37,38,39,40,41,42,43,44,45]
let topFace=[46,47,48,49,50,51,52,53,54]

// Visual variables
let frontStickers=[]
let rightStickers=[]
let backStickers=[]
let leftStickers=[]
let bottomStickers=[]
let topStickers=[]
for(let i=0;i<9;i++){
    frontStickers.push(document.querySelector(`.rubix-cube>.cube-piece>#f${i}`))
    leftStickers.push(document.querySelector(`.rubix-cube>.cube-piece>#l${i}`))
    topStickers.push(document.querySelector(`.rubix-cube>.cube-piece>#t${i}`))
    backStickers.push(document.querySelector(`.rubix-cube>.cube-piece>#ba${i}`))
    bottomStickers.push(document.querySelector(`.rubix-cube>.cube-piece>#bo${i}`))
    rightStickers.push(document.querySelector(`.rubix-cube>.cube-piece>#r${i}`))
}
// ............................

const blit=()=>{
    // visual part
    const FACES=[frontFace,rightFace,backFace,leftFace,bottomFace,topFace]
    const STICKERS=[frontStickers,rightStickers,backStickers,leftStickers,bottomStickers,topStickers]
    for(let i=0;i<6;i++){
        for(let j=0;j<9;j++){
            let color
            if(FACES[i][j]>=1 && FACES[i][j]<=9){
                color="red"
            }
            else if(FACES[i][j]>=10 && FACES[i][j]<=18){
                color="#4fd74f"
            }
            else if(FACES[i][j]>=19 && FACES[i][j]<=27){
                color="orange"
            }
            else if(FACES[i][j]>=28 && FACES[i][j]<=36){
                color="blue"
            }
            else if(FACES[i][j]>=37 && FACES[i][j]<=45){
                color="white"
            }
            else if(FACES[i][j]>=46 && FACES[i][j]<=56){
                color="yellow"
            }
            STICKERS[i][j].setAttribute("style",`background-color:${color};`)
        }
    }
}
const dummy_fill=(arr)=>{
    let s=""
    arr.forEach((a)=>{
        s+=`<div id="cube${a}" class="cube-piece">`
        s+=document.querySelector(`.rubix-cube>#cube${a}`).innerHTML
        s+="</div>"
    })
    DUMMY.innerHTML=s
}
const dummy_empty=(arr)=>{
    // ending it
    arr.forEach(a=>{
        document.querySelector(`.rubix-cube>#cube${a}`).classList.remove("hidden")
    })
    DUMMY.innerHTML=""
    DUMMY.setAttribute("style","")
}
const dummy_function=(move)=>{
    let pieces=[]
    let axis
    let angle
    if(move==="U" || move==="U!"){
        pieces=[0,1,2,3,4,5,6,7,8]
        axis="Z"
        if(move=="U"){
            angle=90
        }else{
            angle=-90
        }
    }
    else if(move==="R" || move==="R!"){
        pieces=[2,5,8,11,14,17,20,23,26]
        axis="X"
        if(move=="R"){
            angle=90
        }else{
            angle=-90
        }
    }
    else if(move==="F" || move==="F!"){
        pieces=[0,1,2,9,10,11,18,19,20]
        axis="Y"
        if(move=="F"){
            angle=90
        }else{
            angle=-90
        }
    }
    else if(move==="B" || move==="B!"){
        pieces=[6,7,8,17,16,15,26,25,24]
        axis="Y"
        if(move=="B"){
            angle=-90
        }else{
            angle=90
        }
    }
    else if(move==="L" || move==="L!"){
        pieces=[6,3,0,15,12,9,24,21,18]
        axis="X"
        if(move=="L"){
            angle=-90
        }else{
            angle=90
        }
    }
    else if(move==="D" || move==="D!"){
        pieces=[18,19,20,21,22,23,24,25,26]
        axis="Z"
        if(move=="D"){
            angle=-90
        }else{
            angle=90
        }
    }
    else if(move==="rotateLeft" || move==="rotateRight"){
        pieces=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
        axis="Z"
        if(move=="rotateLeft"){
            angle=90
        }else{
            angle=-90
        }
    }
    else if(move==="rotateUp" || move==="rotateDown"){
        pieces=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
        axis="X"
        if(move=="rotateUp"){
            angle=90
        }else{
            angle=-90
        }
    }
    dummy_fill(pieces)
    // hiding core pieces
    pieces.forEach(p=>{
        document.querySelector(`.rubix-cube>#cube${p}`).classList.add("hidden")
    })
    // dummy animation part
    DUMMY.setAttribute("style",`transform:rotate${axis}(${angle}deg);transition:0.5s linear;`)
    return pieces
}
const rotation=(spin)=>{
    if( spin=="clockwise"){
        let temp=[...frontFace]
        frontFace=rightFace
        rightFace=backFace
        backFace=leftFace
        leftFace=temp
        temp=[topFace[6],topFace[3],topFace[0],topFace[7],topFace[4],topFace[1],topFace[8],topFace[5],topFace[2]]
        topFace=temp
        temp=[bottomFace[2],bottomFace[5],bottomFace[8],bottomFace[1],bottomFace[4],bottomFace[7],bottomFace[0],bottomFace[3],bottomFace[6]]
        bottomFace=temp
    }
    else if (spin=="anticlockwise"){
        rotation("clockwise")
        rotation("clockwise")
        rotation("clockwise")
    }
    // some error over here
    else if(spin=="rotateUp"){
        _move_("R")
        _move_("L!")
        let temp=[...[frontFace[1],frontFace[4],frontFace[7]]]
        frontFace[1]=bottomFace[1]
        frontFace[4]=bottomFace[4]
        frontFace[7]=bottomFace[7]

        bottomFace[1]=backFace[7]
        bottomFace[4]=backFace[4]
        bottomFace[7]=backFace[1]

        backFace[1]=topFace[7]
        backFace[4]=topFace[4]
        backFace[7]=topFace[1]

        topFace[1]=temp[0]
        topFace[4]=temp[1]
        topFace[7]=temp[2]
    }
    else if(spin=="rotateDown"){
        _move_("R!")
        _move_("L")
        let temp=[...[frontFace[1],frontFace[4],frontFace[7]]]
        frontFace[1]=topFace[1]
        frontFace[4]=topFace[4]
        frontFace[7]=topFace[7]

        topFace[1]=backFace[7]
        topFace[4]=backFace[4]
        topFace[7]=backFace[1]

        backFace[1]=bottomFace[7]
        backFace[4]=bottomFace[4]
        backFace[7]=bottomFace[1]

        bottomFace[1]=temp[0]
        bottomFace[4]=temp[1]
        bottomFace[7]=temp[2]
    }
}
const _move_=(m)=>{
    // this is for array manipulation to record which piece is where after perfoming certain moves
    if (m=="R"){   
        let temp=[...[frontFace[2],frontFace[5],frontFace[8]]]

        frontFace[2]=bottomFace[2]
        frontFace[5]=bottomFace[5]
        frontFace[8]=bottomFace[8]

        bottomFace[2]=backFace[6]
        bottomFace[5]=backFace[3]
        bottomFace[8]=backFace[0]

        backFace[0]=topFace[8]
        backFace[3]=topFace[5]
        backFace[6]=topFace[2]

        topFace[2]=temp[0]
        topFace[5]=temp[1]
        topFace[8]=temp[2]

        temp=[...[rightFace[6],rightFace[3],rightFace[0],rightFace[7],rightFace[4],rightFace[1],rightFace[8],rightFace[5],rightFace[2]]]
        rightFace=temp
    }
    else if (m=="R!"){
        _move_("R")
        _move_("R")
        _move_("R")
    }  
    else if (m=="U"){

        let temp=[...[frontFace[0],frontFace[1],frontFace[2]]]

        frontFace[0]=rightFace[0]
        frontFace[1]=rightFace[1]
        frontFace[2]=rightFace[2]

        rightFace[0]=backFace[0]
        rightFace[1]=backFace[1]
        rightFace[2]=backFace[2]

        backFace[0]=leftFace[0]
        backFace[1]=leftFace[1]
        backFace[2]=leftFace[2]

        leftFace[0]=temp[0]
        leftFace[1]=temp[1]
        leftFace[2]=temp[2]

        temp=[...[topFace[6],topFace[3],topFace[0],topFace[7],topFace[4],topFace[1],topFace[8],topFace[5],topFace[2]]]
        topFace=[...temp]

    }
    else if (m=="U!"){
        _move_("U")
        _move_("U")
        _move_("U")
    }  
    else if (m=="B!"){
        rotation("clockwise")
        _move_("R!")
        rotation("anticlockwise")
    }  
    else if (m=="B"){
        rotation("clockwise")
        _move_("R")
        rotation("anticlockwise")
    }  
    else if (m=="F"){
        rotation("anticlockwise")
        _move_("R")
        rotation("clockwise")
    }  
    else if (m=="F!"){
        rotation("anticlockwise")
        _move_("R!")
        rotation("clockwise")
    }
    else if(m=="L"){
        rotation("anticlockwise")
        _move_("F")
        rotation("clockwise")
    }
    else if(m=="L!"){
        rotation("anticlockwise")
        _move_("F!")
        rotation("clockwise")
    }
    else if(m=="D!"){
        let temp=[...[frontFace[6],frontFace[7],frontFace[8]]]

        frontFace[6]=rightFace[6]
        frontFace[7]=rightFace[7]
        frontFace[8]=rightFace[8]

        rightFace[6]=backFace[6]
        rightFace[7]=backFace[7]
        rightFace[8]=backFace[8]

        backFace[6]=leftFace[6]
        backFace[7]=leftFace[7]
        backFace[8]=leftFace[8]

        leftFace[6]=temp[0]
        leftFace[7]=temp[1]
        leftFace[8]=temp[2]

        temp=[...[bottomFace[2],bottomFace[5],bottomFace[8],bottomFace[1],bottomFace[4],bottomFace[7],bottomFace[0],bottomFace[3],bottomFace[6]]]
        bottomFace=[...temp]
    }else if(m=="D"){
        _move_("D!")
        _move_("D!")
        _move_("D!")
    }
    else if(m==="rotateLeft"){
        rotation("clockwise")
    }
    else if(m==="rotateRight"){
        rotation("anticlockwise")
    }
    else if(m==="rotateUp"){
        rotation("rotateUp")
    }
    else if(m==="rotateDown"){
        rotation("rotateDown")
    }
}

const MOVE=(move)=>{
    let temp=dummy_function(move)
    _move_(move)
    blit()
    setTimeout(()=>{
        dummy_empty(temp)
    },550)
}

// initialization part
blit()
let go=true //variable go will help to prevent animation glitch by keeping time interval
const algorithms={
    yPerm:["R" ,"U" ,"R!" ,"U!" ,"R!" ,"F" ,"R", "R" ,"U!" ,"R!" ,"U!" ,"R" ,"U" ,"R!" ,"F!"],
    favMove:["R","U","R!","U!","R","U","R!","U!","R","U","R!","U!","R","U","R!","U!","R","U","R!","U!","R","U","R!","U!"]
}
// ..................



// listening to the event for performing moves
window.addEventListener("keyup",(e)=>{
    e.preventDefault()

    // e.g: (u)=>Up(U) (shift+u)=>Up Prime(U!)
    // need to create a time function so that user can't rapidly press key and mess up interface->done
    if(go==true){
        if(e.key=="u"){
            MOVE("U")
            go=false
        }
        else if(e.key=="U"){
            MOVE("U!")
            go=false
        }
        else if(e.key=="r"){
            MOVE("R")
            go=false
        }
        else if(e.key=="R"){
            MOVE("R!")
            go=false
        }
        else if(e.key=="f"){
            MOVE("F")
            go=false
        }
        else if(e.key=="F"){
            MOVE("F!")
            go=false
        }
        else if(e.key=="b"){
            MOVE("B")
            go=false
        }
        else if(e.key=="B"){
            MOVE("B!")
            go=false
        }
        else if(e.key=="l"){
            MOVE("L")
            go=false
        }
        else if(e.key=="L"){
            MOVE("L!")
            go=false
        }
        else if(e.key=="d"){
            MOVE("D")
            go=false
        }
        else if(e.key=="D"){
            MOVE("D!")
            go=false
        }
        else if(e.key=="ArrowRight"){
            MOVE("rotateRight")
            go=false
        }
        else if(e.key=="ArrowLeft"){
            MOVE("rotateLeft")
            go=false
        }
        else if(e.key==="ArrowUp"){
            MOVE("rotateUp")
            go=false
        }
        else if(e.key==="ArrowDown"){
            MOVE("rotateDown")
            go=false
        }
        else{
            go=true
        }

        if(go==false){
            setTimeout(()=>{
                go=true
            },560)
        }
    }
})
movesbuttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        if(go===true){
            const m=btn.innerHTML
            MOVE(m)
            go=false
            setTimeout(()=>{
                go=true
            },560)
        }
    })
})
rotateButtons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        if(go===true){
            const m=btn.id
            MOVE(m)
            go=false
            setTimeout(()=>{
                go=true
            },560)
        }
    })
})
// algorithms
const algo=(name)=>{
    let movesList=algorithms[name]
    console.log(movesList)
    let i=0

    const s=setInterval(()=>{
        MOVE(movesList[i])
        i+=1
    },620)

    setTimeout(()=>{
        clearInterval(s)
    },movesList.length*630+10)
}
