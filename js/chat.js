// Chat Setup
const chatRoomId = "83732559";
    const savedName = localStorage.getItem('userName');

function setUserName() {
    const nameSet = localStorage.getItem('nameSet') === 'true';
    const currentName = chattable.user?.name;

    console.log({ savedName, nameSet, currentName });

    if (savedName) {
        // Only reapply the name if it's different
        if (currentName !== savedName) {
            chattable.setName(savedName);
        }
    } else {
        // Generate a new name if none exists
        const userName = chattable.user?.name || "Visitor" + Math.floor(Math.random() * 1000);
        chattable.setName(userName);
        localStorage.setItem("userName", userName);
        sendChatMessage("has logged on, welcome!");
        localStorage.setItem("nameSet", "true");
    }
}

window.addEventListener("load", () => {
    // Give chattable time to initialize
    setTimeout(setUserName, 500);
});


// Message queue setup
const messageQueue = [];
let isProcessingQueue = false;

function sendChatMessage(message, flair = "botstyle") {
    messageQueue.push({ message, flair });
    if (!isProcessingQueue) {
        processMessageQueue();
    }
}

function processMessageQueue() {
    if (messageQueue.length === 0) {
        isProcessingQueue = false;
        return;
    }

    isProcessingQueue = true;
    const { message, flair } = messageQueue.shift();

    if (typeof chattable === 'undefined' || !chattable.sendMessage) {
        console.warn("Chattable unavailable:", message);
        setTimeout(() => {
            processMessageQueue();
        }, 1000);
        return;
    }

    try {
        const userName = savedName;
        const fullMessage = `${userName} ${message}`;
        const currentFlair = chattable.user?.flair || 'none';
        // Use current flair if it's a lake fish flair or flames; otherwise, use saved flair
        const flairToRestore = currentFlair;

        chattable.setFlair(flair); // Set temporary flair (e.g., botstyle)
        const success = chattable.sendMessage(fullMessage);
        chattable.setFlair(flairToRestore); // Restore the appropriate flair

        if (success) {
            console.log(`Sent: "${fullMessage}" as ${userName} with flair ${flair}, restored to ${flairToRestore}`);
        }
    } catch (error) {
        console.error(`Chat send error: "${message}"`, error);
    }

    setTimeout(processMessageQueue, 500);
}
