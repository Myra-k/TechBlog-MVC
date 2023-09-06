const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-content').value.trim();

  if (title && body) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const commentFormHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment-content').value.trim();
  console.log(body);

  if (body) {
    const response = await fetch(`/api/projects/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
document
  .querySelector('#comment-post-form')
  .addEventListener('submit', commentFormHandler);
