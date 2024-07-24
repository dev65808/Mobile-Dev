// Find Factorial of a number
let num=4;
let fact=1;
if(num==0 || num==1){
    fact=1;
}
else{
    for(let i=2;i<=num;i++){
        fact*=i;
    }
}
console.log("Factorial of "+num+" is "+fact);