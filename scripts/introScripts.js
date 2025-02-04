// Check if the user is visiting for the first time
function checkFirstVisit() {
    if (document.cookie.split(';').some((item) => item.trim().startsWith('visited='))) {
        return true; // User has visited before
    } else {
        document.cookie = "visited=true; max-age=31536000; path=/"; // 1 year expiry
        return true; // First-time visit
    }
}

const isFirstTime = checkFirstVisit();

if (isFirstTime) {
    const textContainer = document.getElementById('text');
    console.log("Text container loaded:", textContainer);

    const genesisLines = [
        "In the beginning God created the heaven and the earth.",
        "And the earth was without form, and void; and darkness was upon the face of the deep.",
        "And the Spirit of God moved upon the face of the waters.",
        "And God said,"
    ];

    let delay = 2000; // Initial delay of 3 seconds

    genesisLines.forEach((line, index) => {
        setTimeout(() => {
            console.log("Displaying line:", line);
            textContainer.style.opacity = 0;
            textContainer.innerText = line;
            gsap.to(textContainer, { opacity: 1, duration: 2, ease: "power2.inOut" });
        }, delay);

        setTimeout(() => {
            gsap.to(textContainer, { opacity: 0, duration: 2, ease: "power2.inOut" });
        }, delay + 4000);

        delay += 6000; // 5 seconds for fade in/out + 1 second delay -- CHANGE THIS TO 6000 AFTER TESTING
    });

    setTimeout(() => {
        textContainer.innerText = "Let there be Light";
        gsap.to(textContainer, { opacity: 1, duration: 2, ease: "power2.inOut" });
        setTimeout(() => {
            document.getElementById('light-burst').classList.remove('hidden');
            gsap.to("#light-burst", { opacity: 1, duration: 2 });
        }, 2000);

        setTimeout(() => {
            console.log("Redirecting to homepage...");
            window.location.href = '/main/reportingPlanets.html';
        }, 9000);
    }, delay);
    let lastRippleTime = 0;
        const rippleDelay = 50; // Delay in milliseconds

        document.addEventListener("mousemove", function (e) {
            const now = Date.now();
            if (now - lastRippleTime < rippleDelay) return;
            lastRippleTime = now;
            
            const ripple = document.createElement("div");
            ripple.classList.add("ripple");
            document.body.appendChild(ripple);
            
            ripple.style.left = `${e.clientX - 10}px`;
            ripple.style.top = `${e.clientY - 10}px`;
            
            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        });
}