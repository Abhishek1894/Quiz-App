
// class Question
class Question
{
    constructor(question,answer,opt1,opt2,opt3,opt4)
    {
        this._question = question;
        this._answer = answer;
        this._opt1 = opt1;
        this._opt2 = opt2;
        this._opt3 = opt3;
        this._opt4 = opt4;
    }

    get question()
    {
        return this._question;
    }

    get answer()
    {
        return this._answer;
    }

    get opt1()
    {
        return this._opt1;
    }

    get opt2()
    {
        return this._opt2;
    }

    get opt3()
    {
        return this._opt3;
    }

    get opt4()
    {
        return this._opt4;
    }
}



// array to store all 10 objects of class
let questionList = [];
let pointer = 0; // points to current question index

let points = 0; // points scored in test

const pointDisplay = document.getElementById("points");
pointDisplay.innerText = `${points}`.padStart(2,'0');

// function to suffle the array of options
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}



// code to use fetch api to get the data
const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

const fetchData = async () => 
{
    try
    {
        let response = await fetch(url);
        if(response.ok === true)
        {
            console.log("No error");
            let data = await response.json();
            let list = data.results;

            for(let i = 0; i < list.length; i++)
            {
                let element = list[i];
                let answers = element.incorrect_answers;
                answers.push(element.correct_answer)
                answers = shuffle(answers);
                let question = new Question(element.question,element.correct_answer,answers[0],answers[1],answers[2],answers[3]);
                questionList.push(question);
            }

            // disabling loading message
            const loading = document.getElementsByClassName("loading");
            console.log(loading);
            loading[0].style.display = "none";

            // showing question
            showNextQuestion();
        }
        else
        {
            console.log("Error");
            throw new Error("Some error occurred while fetching data");
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

// function to show the next element

const showNextQuestion = () => 
{
    if(pointer < questionList.length)
    {

        const nextButton = document.getElementById("next-button");
        //nextButton.setAttribute("disabled",true);
        if(pointer == (questionList.length - 1))
        {
            nextButton.innerText = "Submit";
        }

        let obj = questionList[pointer];
        const question = document.querySelector(".question");
        const options = document.getElementsByClassName("option");

        const div = document.getElementById("question-container");
        div.style.display = "flex";

        question.innerText = `${pointer + 1}. ${obj.question}`;
        options[0].innerText = obj.opt1;
        options[1].innerText = obj.opt2;
        options[2].innerText = obj.opt3;
        options[3].innerText = obj.opt4;

        // resseting the background color of options
        
        for(let i = 0; i < options.length; i++)
        {
            if(options[i].hasAttribute("id")) 
            {
                options[i].removeAttribute("id");
            }
        }

        pointer++;

        // enabling the check button
        const checkButton = document.getElementById("check-button");
        checkButton.removeAttribute("disabled");

        // diabling the next button
        nextButton.setAttribute("disabled","");

        // enabling click event on option answers
        for(let i = 0; i < options.length; i++)
        {
            options[i].style.pointerEvents = "auto";
        }

        // setting result
        const result = document.getElementsByClassName("result")[0];
        if(result.classList.contains("result-wrong"))result.classList.remove("result-wrong");
        if(result.classList.contains("result-right"))result.classList.remove("result-right");
        result.style.display = "none";
    }
}

function selectAnswer(id)
{
    const p = document.getElementsByClassName("option");

    for(let i = 0; i < p.length; i++)
    {
        if(p[i].hasAttribute("id")) p[i].removeAttribute("id");
    }

    p[id].setAttribute("id","select-answer");
}

function incrementPoints()
{
    points += 2;
    const pointDisplay = document.getElementById("points");
    pointDisplay.innerText = `${points}`.padStart(2,'0');
}

function checkAnswer(index)
{
    const p = document.getElementsByClassName("option");
    const result = document.getElementsByClassName("result")[0];

    let selected = -1

    if(p[0].hasAttribute("id"))
        selected = 0;
    else if(p[1].hasAttribute("id"))
        selected = 1;
    else if(p[2].hasAttribute("id"))
        selected = 2;
    else if(p[3].hasAttribute("id"))
        selected = 3;

    console.log(selected);
    
    if(selected == -1)
        alert("Please select answer !");
    else
    {
        let selectedText = p[selected].innerText;

        if(selectedText === questionList[index].answer)
        {
            p[selected].removeAttribute("id");
            p[selected].setAttribute("id","right-answer");

            incrementPoints();

            result.classList.add("result-right");
            result.innerText = "Right Answer";
            result.style.display = "flex";
        }
        else
        {
            p[selected].removeAttribute("id");
            p[selected].setAttribute("id","wrong-answer");
            
            result.classList.add("result-wrong");
            result.innerText = "Wrong Answer"
            result.style.display = "flex";
        }

        // disabling the check button once it is clicked
        const checkButton = document.getElementById("check-button");
        checkButton.setAttribute("disabled","");     
        
        // enabling the next button once check button is clicked
        const nextButton = document.getElementById("next-button");
        nextButton.removeAttribute("disabled");

        // disabling click even on answer options
        for(let i = 0; i < p.length; i++)
        {
            p[i].style.pointerEvents = "none";
        }
    }
}

// adding event listener to next button
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click",showNextQuestion);

const checkButton = document.getElementById("check-button");
checkButton.addEventListener("click",()=>{
    checkAnswer(pointer - 1);
});


fetchData();