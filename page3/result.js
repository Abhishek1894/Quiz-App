let retrievedObject = localStorage.getItem('data');
localStorage.removeItem('data');

let userResult = JSON.parse(retrievedObject);

console.log(userResult);