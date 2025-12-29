window.addEventListener("DOMContentLoaded", () => {

const goals = {
    complete: [
        "Create poetry page",
        "Create full page for goals",
        "Create full page for updates",
        "Create full page for events",
        "Create full page for guestbook",
        "Complete sitemap",
        "update a few music recs"
    ],
    incomplete: [
        "Fix chattable",
        "Get site up in a functional state",
        "Create first post on poetry page",
        "update film recs",
        "Add quizzes",
        "Add games and interactivity back",
        "Add credits page and info",
        "Add quizzes",
        "Add to events page"
    ]
}
const goalsContainer = document.getElementById("goalsContainer");
const goalsListHTML = [];

goals.complete.forEach(goal => {
    goalsListHTML.push(`<li class='complete'><p>${goal}</p></li>`);
});

goals.incomplete.forEach(goal => {
    goalsListHTML.push(`<li class='incomplete'><p>${goal}</p></li>`);
});

goalsContainer.innerHTML = goalsListHTML.join("");
});