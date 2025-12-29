const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = null;
let resultShown = false;

// Screen update function
function updateScreen() {

    // যখন অপারেটর চাপা হয়েছে → expression দেখাবে
    if (operator && previousInput) {
        screen.textContent =
            `${previousInput} ${operator} ${currentInput || ""}`;
    }

    // অন্য সময় শুধু current value দেখাবে
    else {
        screen.textContent = currentInput || "0";
    }
}

// Button click handler
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // Clear (C)
        if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = null;
            resultShown = false;
            updateScreen();
            return;
        }

        // If result already shown → new number press করলে reset হবে
        if (resultShown && !["÷","×","−","+","="].includes(value)) {
            currentInput = "";
            resultShown = false;
        }

        // Plus / minus toggle
        if (value === "±") {
            currentInput = String(-(Number(currentInput || 0)));
            updateScreen();
            return;
        }

        // Percentage
        if (value === "%") {
            currentInput = String(Number(currentInput || 0) / 100);
            updateScreen();
            return;
        }

        // Operator buttons
        if (["÷","×","−","+"].includes(value)) {

            // যদি আগেই calculation pending থাকে → আগে হিসাব করো
            if (previousInput && operator && currentInput) {

                const a = Number(previousInput);
                const b = Number(currentInput);

                switch (operator) {
                    case "÷": currentInput = a / b; break;
                    case "×": currentInput = a * b; break;
                    case "−": currentInput = a - b; break;
                    case "+": currentInput = a + b; break;
                }
            }

            previousInput = currentInput;
            operator = value;
            currentInput = "";
            resultShown = false;
            updateScreen();
            return;
        }

        // Decimal point
        if (value === ".") {
            if (!currentInput.includes(".")) {
                currentInput += ".";
                updateScreen();
            }
            return;
        }

        // Equal (=)
        if (value === "=") {

            if (!previousInput || !operator || !currentInput) return;

            const a = Number(previousInput);
            const b = Number(currentInput);

            switch (operator) {
                case "÷": currentInput = a / b; break;
                case "×": currentInput = a * b; break;
                case "−": currentInput = a - b; break;
                case "+": currentInput = a + b; break;
            }

            // রেজাল্ট দেখাও
            previousInput = "";
            operator = null;
            resultShown = true;

            updateScreen();
            return;
        }

        // Number buttons
        currentInput += value;
        updateScreen();
    });
});
