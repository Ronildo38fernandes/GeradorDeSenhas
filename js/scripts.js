//seleção de elementos

const generetePasswordButton = document.querySelector("#generate-password")
const generetePasswordElement = document.querySelector("#generated-password")

const openClosegeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")


//funções
const getLetterLowerCase = () =>{
   return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getLetterUpperCase = () =>{
   return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getNumber = () =>{
   return Math.floor(Math.random() * 10).toString()
}

const getSymbol = () =>{
   const symbols = "{}[];:*-/+!@#$%&()<>"

   return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (getLetterLowerCase,getLetterUpperCase,getNumber,getSymbol) =>{

   let password =""

   const passwordLength = lengthInput.value;


   const generators = [];
   if(lettersInput.checked){
      generators.push(getLetterLowerCase,getLetterUpperCase)
   }
   if(numbersInput.checked){
      generators.push(getNumber)
   }
   if(symbolsInput.checked){
      generators.push(getSymbol)
   }
   console.log(generators.length)
   if(generators.length === 0){
      return;
   }

   for(i = 0 ; i < passwordLength; i = i + generators.length){
      generators.forEach(()=>{
         const randomValue = generators[Math.floor(Math.random() * generators.length)]();
         password += randomValue;
      })
   }
   password = password.slice(0,passwordLength)
   
   console.log(password)
   generetePasswordElement.style.display = "block"

   generetePasswordElement.querySelector("h4").innerText = password;
}

//eventos
generetePasswordButton.addEventListener("click",(e)=>{
   e.preventDefault()
   console.log("*-*-*-*-----------*-*-*-*")
   generatePassword(getLetterLowerCase,
      getLetterUpperCase,
      getNumber,
      getSymbol)
  
})

openClosegeneratorButton.addEventListener("click",(e)=>{
   e.preventDefault()
   generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (e)=>{
   e.preventDefault()
   const password = generetePasswordElement.querySelector("h4").innerText;
   navigator.clipboard.writeText(password).then(()=>{
      copyPasswordButton.innerText="Copiado com Sucesso"

      setTimeout(()=>{
         copyPasswordButton.innerText="Copiar"
      },1500)
   })
} )