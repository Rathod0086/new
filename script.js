// Form Validation
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
    } else if (!/@/.test(email)) {
        alert("Email should contain '@' symbol");
        return false;
    } else if (!/\.[a-z]{2,}$/.test(email)) {
        alert("Email should end with a valid domain, like 'gmail.com'");
        return false;
    }
    return true; 
}

document.getElementById("next").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default button behavior
    if (validate()) {
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

document.getElementById('secondForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const secondFormData = new FormData(document.getElementById('secondForm'));

    const selectedFaculty = document.getElementById("faculty").value;
    const syllabusCompletion = document.querySelector('input[name="Syllabus Completion"]:checked')?.value || "Not answered";
    const teachingQuality = document.querySelector('input[name="Teaching Quality"]:checked')?.value || "Not answered";
    const courseEngagement = document.querySelector('input[name="Course Engagement"]:checked')?.value || "Not answered";
    const communicationSkills = document.querySelector('input[name="Communication Skills"]:checked')?.value || "Not answered";
    const studentSkills = document.querySelector('input[name="Student Skills"]:checked')?.value || "Not answered";

    // Store feedback data in localStorage
    localStorage.setItem("facultyName", selectedFaculty);
    localStorage.setItem("syllabusCompletion", syllabusCompletion);
    localStorage.setItem("teachingQuality", teachingQuality);
    localStorage.setItem("courseEngagement", courseEngagement);
    localStorage.setItem("communicationSkills", communicationSkills);
    localStorage.setItem("studentSkills", studentSkills);

    fetch('https://formspree.io/f/mwpegkav', {
        method: 'POST',
        body: secondFormData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Feedback submitted successfully!');
            window.location.href = "result.html";
        } else {
            alert('Failed to submit feedback. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your feedback.');
    });
});

