// Check if the user is visiting for the first time using localStorage
function checkFirstVisit() {
    if (document.cookie.includes("visited=true")) return true;
    
    document.cookie = "visited=true; max-age=31536000; path=/"; // Store cookie for 1 year
    return false; // First-time visit
}

const isFirstTime = checkFirstVisit();

if (isFirstTime) {
    document.addEventListener("DOMContentLoaded", async () => {
        const textContainer = document.getElementById("text");
        if (!textContainer) {
            console.warn("Text container not found");
            return;
        }

        console.log("Text container loaded:", textContainer);

        const genesisLines = [
            "In the beginning God created the heaven and the earth.",
            "And the earth was without form, and void; and darkness was upon the face of the deep.",
            "And the Spirit of God moved upon the face of the waters.",
            "And God said,"
        ];

        async function fadeText(line, delay) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            console.log("Displaying line:", line);
            
            gsap.to(textContainer, { opacity: 0, duration: 2, ease: "power2.inOut" });
            await new Promise((resolve) => setTimeout(resolve, 2000));

            textContainer.innerText = line;
            gsap.to(textContainer, { opacity: 1, duration: 2, ease: "power2.inOut" });

            await new Promise((resolve) => setTimeout(resolve, 4000));
        }

        let delay = 1000;
        for (const line of genesisLines) {
            await fadeText(line, delay);
            delay += 1000;
        }

        // Final phrase
        textContainer.innerText = "Let there be Light";
        gsap.to(textContainer, { opacity: 1, duration: 2, ease: "power2.inOut" });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const lightBurst = document.getElementById("light-burst");
        if (lightBurst) {
            lightBurst.classList.remove("hidden");
            gsap.to("#light-burst", { opacity: 1, duration: 2 });
        }

        await new Promise((resolve) => setTimeout(resolve, 7000));
        console.log("Redirecting to homepage...");
        window.location.href = "/reportingPlanets.html";
    });

    // Optimized ripple effect using requestAnimationFrame
    let lastRippleTime = 0;
    document.addEventListener("mousemove", (e) => {
        const now = performance.now();
        if (now - lastRippleTime < 50) return;
        lastRippleTime = now;

        requestAnimationFrame(() => {
            const ripple = document.createElement("div");
            ripple.classList.add("ripple");
            document.body.appendChild(ripple);

            ripple.style.left = `${e.clientX - 10}px`;
            ripple.style.top = `${e.clientY - 10}px`;

            ripple.addEventListener("animationend", () => ripple.remove());
        });
    });
}
