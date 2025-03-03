let form_errors = [];
const form             = document.getElementById('contactForm');
const nameInput        = document.getElementById('name');
const emailInput       = document.getElementById('email');
const commentsTxtarea  = document.getElementById('comments');
const charCount        = document.getElementById('charCount');
const errorOutput      = document.getElementById('errorOutput');
const formErrField     = document.getElementById('form-errors');

const allowedCharRegex = /[A-Za-z\s'-]/;
const maxChars = 500;

nameInput.addEventListener('input', function() {
  const originalValue = nameInput.value;
  const sanitizedValue = originalValue
    .split('')
    .filter(ch => allowedCharRegex.test(ch))
    .join('');

  if (originalValue !== sanitizedValue) {
    nameInput.classList.add('flash');
    nameInput.setCustomValidity("Name can only contain letters, spaces, apostrophes, or hyphens.");
    nameInput.value = sanitizedValue;
    setTimeout(() => {
      nameInput.classList.remove('flash');
    }, 500);
  } else {
    nameInput.setCustomValidity("");
  }
  showFieldErrors();
});

commentsTxtarea.addEventListener('input', function() {
  const currentLength = commentsTxtarea.value.length;
  const remaining = maxChars - currentLength;
  charCount.textContent = `characters remaining: ${remaining}`;

  if (remaining < 100) {
    charCount.classList.add('warning');
  } else {
    charCount.classList.remove('warning');
  }

  if (remaining < 0) {
    commentsTxtarea.setCustomValidity("You have exceeded the maximum allowed characters.");
  } else {
    commentsTxtarea.setCustomValidity("");
  }
  showFieldErrors();
});

emailInput.addEventListener('blur', showFieldErrors);
nameInput.addEventListener('blur', showFieldErrors);
commentsTxtarea.addEventListener('blur', showFieldErrors);

function showFieldErrors() {
  let messages = [];
  
  if (!nameInput.value.trim()) {
    messages.push("Name cannot be empty.");
  } else if (!nameInput.validity.valid) {
    messages.push(`Name ("${nameInput.value}"): ${nameInput.validationMessage}`);
  }
  
  if (!emailInput.value.trim()) {
    messages.push("Email cannot be empty.");
  } else if (!emailInput.validity.valid) {
    messages.push("Invalid email format.");
  }
  
  if (!commentsTxtarea.value.trim()) {
    messages.push("Comments cannot be empty.");
  } else if (commentsTxtarea.value.length < 20) {
    messages.push("Comments must be at least 20 characters.");
  } else if (!commentsTxtarea.validity.valid) {
    messages.push(commentsTxtarea.validationMessage);
  }

  if (messages.length > 0) {
    errorOutput.innerHTML = messages.join("<br>");
    errorOutput.style.display = "block";
  } else {
    errorOutput.innerHTML = "";
    errorOutput.style.display = "none";
  }
}

form.addEventListener('submit', function(e) {
  form_errors = [];
  let messages = [];

  if (nameInput.value.trim()) {
    if (!nameInput.validity.valid) {
      messages.push(`Name ("${nameInput.value}"): ${nameInput.validationMessage}`);
      form_errors.push({
        field: 'name',
        error: nameInput.validationMessage,
        value: nameInput.value
      });
    }
  } else {
    messages.push("Name cannot be empty.");
    form_errors.push({
      field: 'name',
      error: "Name cannot be empty.",
      value: nameInput.value
    });
  }

  if (!emailInput.value.trim()) {
    messages.push("Email cannot be empty.");
    form_errors.push({
      field: 'email',
      error: "Email cannot be empty.",
      value: emailInput.value
    });
  } else if (!emailInput.validity.valid) {
    messages.push("Invalid email format.");
    form_errors.push({
      field: 'email',
      error: "Invalid email format.",
      value: emailInput.value
    });
  }

  if (!commentsTxtarea.value.trim()) {
    messages.push("Comments cannot be empty.");
    form_errors.push({
      field: 'comments',
      error: "Comments cannot be empty.",
      value: commentsTxtarea.value
    });
  } else if (commentsTxtarea.value.length < 20) {
    messages.push("Comments must be at least 20 characters.");
    form_errors.push({
      field: 'comments',
      error: "Comments must be at least 20 characters.",
      value: commentsTxtarea.value
    });
  } else if (!commentsTxtarea.validity.valid) {
    messages.push(commentsTxtarea.validationMessage);
    form_errors.push({
      field: 'comments',
      error: commentsTxtarea.validationMessage,
      value: commentsTxtarea.value
    });
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorOutput.innerHTML = messages.join("<br>");
    errorOutput.style.display = "block";
  } else {
    errorOutput.innerHTML = "";
    errorOutput.style.display = "none";
  }

  formErrField.value = JSON.stringify(form_errors);
});
