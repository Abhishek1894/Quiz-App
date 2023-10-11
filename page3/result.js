let retrievedObject = localStorage.getItem('data');
localStorage.removeItem('data');

let userResult = JSON.parse(retrievedObject);

console.log(userResult);

function showSummary()
{
    let questionList = userResult.list;

    for(let i = 0; i < questionList.length; i++)
    {
        let div = document.createElement("div");

    }
}