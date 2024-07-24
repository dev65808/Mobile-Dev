// Create a Calculator
function calculator(num1,num2,operator){
    let result;
    switch(operator){
        case '+':
            result=num1+num2;
            break;
        case '-':
            result=num1-num2;
            break;
        case '*':
            result=num1*num2;
            break;
        case '/':
            result=num1/num2;
            break;
        case '%':
            result=num1%num2;
            break;
        default:
            result="Invalid Operator";
    }
    return result;
}
let num1=5;
let num2=2;

let operator='+';
let result=calculator(num1,num2,operator);
console.log("Sum: "+result);

operator='-';
result=calculator(num1,num2,operator);
console.log("Subtraction: "+result);

operator='*';
result=calculator(num1,num2,operator);
console.log("Multiplication: "+result);

operator='/';
result=calculator(num1,num2,operator);
console.log("Division: "+result);

operator='%';
result=calculator(num1,num2,operator);
console.log("Remainder: "+result);