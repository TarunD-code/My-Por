// Program to find Circumference of Circle

const PI = 3.14159;
let radius;
let Circumference;

// below is for window pop up
/* radius = window.prompt('Enter the raidus of the circle:');
radius = Number(radius);
Circumference = 2 * PI * radius;10

console.log(Circumference);

*/

document.getElementById("Submit").onclick = function()
{
    radius= document.getElementById ("usertext").value;
    radius = Number(radius);
    Circumference = 2 * PI * radius;
    document.getElementById("output").textContent = `The Circumference of the circle is ${Circumference} cm`;


}
 
