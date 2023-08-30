import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

// An express server middlewear
app.use(express.json()); //---> That allows us to send any json file to client
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "",
});

app.get("/", (req, res) => {
  res.send("This is the Backend Server !");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Books has been created successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Books has been deletd successfully");
  });
}); //Param is the URL and the id is the :id

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q ="UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  
  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Books has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Listening...");
});

// let stri = "This is so Good"

// let saved_stri = stri.split(" ")
//     .map(function(word){
//         return word.split("").reverse().join("");
//     })

// console.log(saved_stri.join(" "))

// let arr = [1,2,3,4,5,6,7]

// while (arr.length > 0) {
//    arr2 =  arr.pop();
//   }

// console.log(arr2)

// let num = 12

// console.log(num % 1 === 0?"Integer":"Not an Integer")

// function rev(num){
//     return Number(num.toString().split("").reverse().join(""))
// }
// console.log(rev(343))

// function reverseKaro(num) {
//   var rev = 0;
//   while (num > 0) {
//     var rem = num % 10;
//     rev = rev * 10 + rem;
//     num = Math.floor(num / 10);
//   }
//   return rev;
// }

// console.log(reverseKaro(1234));

// function palRev(str) {
//     return str.split("").reverse().join("")
// }
// console.log(palRev("lolsdfs"))

// function alphabeticalOrder(str){
//     return str.split("").sort().join()
// }
// console.log(alphabeticalOrder("apple"))

// function capitalKaro(str){
//     let all_words = str.split(" ").map(function(word){
//        return word.charAt(0).toUpperCase() + word.substring(1)
//     })
//     return all_words.join(" ")
// }

// console.log(capitalKaro("rebaal bhai kaise ho"))

// let arr = ["b", "c", "a", "e", "e", "r", "a", "a", "a"];
// console.log("a");
// setTimeout(() => {
//   console.log(arr.sort());
// }, 3000);

// function chkRep(str) {
//   var occurence = {};
//   str.split("").forEach((elem) => {
//     if (occurence.hasOwnProperty(elem) === false) {
//       occurence[elem] = 1;
//     } else {
//       occurence[elem]++;
//     }
//   });
//   return occurence;
// }

// console.log(chkRep("apple"))

// var arr = [1, 2, 3, 4, 5, 6];

// let sum = 0;
// arr.forEach((e) => {
//   return (sum = sum + e);
// });
// console.log(sum);
// console.log(sumarize)

// let arr = ["afds", 1, "afa", "2", 1, "saf", 100, "53"];

// let sum = 0;

// arr.forEach((elem) => {
//   if (typeof elem === "number") {
//     sum = sum + elem;
//   }
// });
// console.log(sum);

// let arr = [
//   {name:"rebaal", gender:"male"},
//   {name:"someone",gender:"female"},
//   {name:"anyone",gender:"not-specified"}
// ]
// let new_arr = arr.filter((elem)=>{
//   return elem.gender === "male"
// })

// console.log(new_arr)

// let count = 0
// arr.forEach(function(elem){
//   if (elem.gender !== "male") count ++;
// })

// for (var i =1 ; i<=count; i++){
//   for(var j =0; j<arr.length;j++){
//     if(arr[j].gender !== "male"){
//       arr.splice(j,1)
//     }
//   }
// }
// console.log(arr)
