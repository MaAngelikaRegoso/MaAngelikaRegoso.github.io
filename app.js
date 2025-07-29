(function () {
    const pastDisplay = document.querySelector('.past-display');
    const presentDisplay = document.querySelector('.present-display');
    const buttons = document.querySelectorAll('button');

    let expression = '';
    let cursorPosition = 0;

    function updateDisplay() {
        pastDisplay.value =
            expression.slice(0, cursorPosition) + '|' + expression.slice(cursorPosition);
        presentDisplay.value = expression;
    }

    function insertAtCursor(value) {
        expression =
            expression.slice(0, cursorPosition) + value + expression.slice(cursorPosition);
        cursorPosition += value.length;
    }

    function deleteAtCursor() {
        if (cursorPosition > 0) {
            expression =
                expression.slice(0, cursorPosition - 1) + expression.slice(cursorPosition);
            cursorPosition--;
        }
    }

    function moveCursorLeft() {
        if (cursorPosition > 0) 
            cursorPosition--;
    }

    function moveCursorRight() {
        if (cursorPosition < expression.length) 
            cursorPosition++;
    }

    function clearAll() {
        expression = '';
        cursorPosition = 0;
    }

    function calculateResult() {
        try {
            const result = eval(expression);
            pastDisplay.value = expression + ' =';
            presentDisplay.value = result;
            expression = String(result);
            cursorPosition = expression.length;
        } catch (e) {
            pastDisplay.value = expression;
            presentDisplay.value = 'Error';
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = button.value;

            if (!isNaN(value) || "+-*/.".includes(value)) {
                insertAtCursor(value);
            } else if (value === 'DEL') {
                deleteAtCursor();
            } else if (value === 'CLR') {
                clearAll();
            } else if (value === '←') {
                moveCursorLeft();
            } else if (value === '→') {
                moveCursorRight();
            } else if (value === '=') {
                calculateResult();
                return; 
            }

            updateDisplay();
        });
    });

    updateDisplay(); 
})();
