let retrievedObject = localStorage.getItem('data');
let userResult = JSON.parse(retrievedObject);
localStorage.removeItem('data');

console.log(userResult);

// setting the points scored by user
const pointsScoredElement = document.getElementById("final-result");
pointsScoredElement.innerText = `You Scored ${userResult.userPoints} points`;

function showSummary()
{
    let list = userResult.list;
    const page = document.getElementById("summary");

    for(let i = 0; i < list.length; i++)
    {
        // creating question container
        let div = document.createElement("div");
        div.style.display = "flex";

        // adding class to it
        div.classList.add("result-question-container");

        // creating question p tag
        let questionP = document.createElement("p");
        questionP.classList.add("question"); // adding class

        // creating options p tag
        let opt = [];

        opt[0] = document.createElement("p");
        opt[1] = document.createElement("p");
        opt[2] = document.createElement("p");
        opt[3] = document.createElement("p");

        // adding class to options
        opt[0].classList.add("option");
        opt[1].classList.add("option");
        opt[2].classList.add("option");
        opt[3].classList.add("option");

        // filling question in question p tag
        console.log(list[i].question)
        questionP.innerText = userResult.list[i]._question;

        // filling option p tag
        opt[0].innerText = userResult.list[i]._opt1;
        opt[1].innerText = userResult.list[i]._opt2;
        opt[2].innerText = userResult.list[i]._opt3;
        opt[3].innerText = userResult.list[i]._opt4;

        // adding div to page
        page.append(div);

        // adding question p tag to div
        div.append(questionP);

        // adding options to div
        div.append(opt[0]);
        div.append(opt[1]);
        div.append(opt[2]);
        div.append(opt[3]);
    }
}

showSummary();