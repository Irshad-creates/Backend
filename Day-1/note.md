>>To run any js file in terminal :
node <filename>

>>def of packages:
ek ayesa code jo humne nhi likha koi aur devloper ne likha aur publically available kiya taki koi hi use kr sake

>>site for pacakages: npmjs.com


>>installing package :

npm init -y 
npm i <packageName>

>> to use 
create a new varible and call the package with 'reqiure()'


<<<<<<  SERVER >>>>>>

>>>def:
    server ek ayesi machine jisko problem kiya gaya hai ke user ke koi bhi request ka reponse de sake

>>>how to create server :

>install express by : npm i express 

const express = require("express") -- stores express as in a variable 
const app = express() -- server ka instance create ho chuka hai
app.listen(3000) -- server ko start karta hai