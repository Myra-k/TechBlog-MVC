document
  .querySelector('.signup-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    // Display the response message to the user
    alert(data.message);

    // Optionally, you can redirect the user to a new page after successful signup
    if (response.ok) {
      window.location.replace('/dashboard'); // Replace '/dashboard' with the desired page URL
    }
  });
