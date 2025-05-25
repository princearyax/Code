const bcrypt = require("bcrypt");


//two function genSalt and hash, saltRound - like difficulty (how long it take), low number- fast

// const hashPassword = async (pw)=>{
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// }

const hashPassword = async (pw)=>{
    const hash = await bcrypt.hash(pw, 10);
    // console.log(salt);
    console.log(hash);
}

const login = async (pw, hashedPassword)=>{
    //compare(plainPassWord, itsHashToCompare) return true/false
    const result = await bcrypt.compare(pw, hashedPassword);
    if(result){
        console.log("Successful match, Logged In");
    }else{
        console.log("Try again");
    }
}

hashPassword("lolo");
login("lolo","$2b$10$R1WcVrgv4RDpM3q9HwUCReV0POHd5.wdHoadbkY.DI3y1/RJLJw1i");