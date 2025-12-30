window.addEventListener("DOMContentLoaded", () => {

const goals = {
    complete: [
        "Create poetry page",
        "Create full page for goals",
        "Create full page for updates",
        "Create full page for events",
        "Create full page for guestbook",
        "Complete sitemap",
        "update a few music recs",
        "Fix chattable",
        "Get site up in a functional state"
    ],
    incomplete: [
        "Create first post on poetry page",
        "update film recs",
        "Add chattable to every page",
        "Add games and interactivity back",
        "Add credits page and info",
        "Add quizzes",
        "Add to events page"
    ]
}
const goalsContainer = document.getElementById("goalsContainer");
const completeGoalsContainer = document.getElementById("completeGoalsContainer");
const incompleteGoalsContainer = document.getElementById("incompleteGoalsContainer");

const allGoalsListHTML = [];
const completeGoalsListHTML = [];
const incompleteGoalsListHTML = [];

goals.complete.forEach(goal => {
    allGoalsListHTML.push(`<li class='complete'><p>${goal}</p></li>`);
    completeGoalsListHTML.push(`<li class='complete'><p>${goal}</p></li>`);
});

goals.incomplete.forEach(goal => {
    allGoalsListHTML.push(`<li class='incomplete'><p>${goal}</p></li>`);
    incompleteGoalsListHTML.push(`<li class='incomplete'><p>${goal}</p></li>`);
});

if (goalsContainer) goalsContainer.innerHTML = allGoalsListHTML.join("");
if (completeGoalsContainer) completeGoalsContainer.innerHTML = completeGoalsListHTML.join("");
if (incompleteGoalsContainer) incompleteGoalsContainer.innerHTML = incompleteGoalsListHTML.join("");
});