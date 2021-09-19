class Calculator{
    constructor(oncekiislemTextElement,suankiislemTextElement){
        this.oncekiislemTextElement = oncekiislemTextElement
        this.suankiislemTextElement = suankiislemTextElement
        this.clear()
    }

    clear(){
        this.suankiIslem = ''
        this.oncekiIslem = ''
        this.operation = undefined
    }
    delete(){
        this.suankiIslem = this.suankiIslem.toString().slice(0,-1)

    }
    appendNumber(number){
        if (number === '.' && this.suankiIslem.includes('.')) return
        this.suankiIslem = this.suankiIslem.toString() + number.toString()
       }

    ChooseOperation(operation){
        if(this.suankiIslem === '')return
        if(this.oncekiIslem !== ''){
            this.compute()
        }
        this.operation = operation
        this.oncekiIslem = this.suankiIslem
        this.suankiIslem = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.oncekiIslem)
        const current = parseFloat(this.suankiIslem)
        if (isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return 
        }
        this.suankiIslem = computation
        this.operation = undefined
        this.oncekiIslem = ''

    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
       this.suankiislemTextElement.innerText = this.getDisplayNumber(this.suankiIslem)
       if(this.operation != null){
         this.oncekiislemTextElement.innerText =
         `${this.getDisplayNumber(this.oncekiIslem)} ${this.operation}`
        }else{
            this.oncekiislemTextElement.innerText = ''
        }        
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const oncekiislemTextElement = document.querySelector('[data-gecmis-islem ]')
const suankiislemTextElement = document.querySelector('[data-suanki-islem ]')


const calculator = new Calculator(oncekiislemTextElement,suankiislemTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.ChooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click',button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})