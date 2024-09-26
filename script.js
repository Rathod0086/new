function validate() {
    let fname = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if (fname === "") {
        alert("Please, enter your name");
        return false; 
    } else if (!isNaN(fname)) {
        alert("Please, enter characters only");
        return false;
    } else if (fname.length < 2) {
        alert("Please, enter more than one character");
        return false;
    }

        if (email === "") {
            alert("Please, enter your email");
            return false;
        } else if (/[A-Z]/.test(email)) {
            alert("Email should be in lowercase");
            return false;
        } else if (!/[0-9]/.test(email)) {
            alert("Email should contain some numeric values");
            return false;
        } else if (!/@/.test(email)) {
            alert("Email should contain '@' symbol");
            return false;
        } else if (!/\.[a-z]{2,}$/.test(email)) {
            alert("Email should end with a valid domain, like 'gmail.com'");
            return false;
        }
        return true; // Email passed all validation checks
}

// Flip Card Logic
document.getElementById("next").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default button behavior
    if (validate()) { // Call validate before flipping
        // Submit the first form using Formspree
        const firstForm = document.getElementById("firstForm");
        const formData = new FormData(firstForm);

        fetch('https://formspree.io/f/mwpegkav', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // If successful, flip the card
                document.getElementById("flip-card").classList.add("flip");
            } else {
                alert('Failed to submit feedback. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your feedback.');
        });
    }
});

// Handle the second form submission logic
document.getElementById('secondForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const secondFormData = new FormData(document.getElementById('secondForm'));

    fetch('https://formspree.io/f/mwpegkav', {
        method: 'POST',
        body: secondFormData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("flip-card").classList.remove("flip");
            alert('Feedback submitted successfully!');
        } else {
            alert('Failed to submit feedback. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your feedback.');
    });
});
