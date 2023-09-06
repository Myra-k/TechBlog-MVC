const postId = document.querySelector('input[name="post-id"]').value;
const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

<<<<<<< HEAD
  await fetch(`/api/post/${postId}`, {
=======
  await fetch(`/api/projectsRoutes/${postId}`, {
>>>>>>> 680b8cb43d43ed4a55792ddf0a912d6123b52ee6
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  document.location.replace('/profile');
};

const deleteClickHandler = async function () {
  await fetch(`/api/editPRoutes/${postId}`, {
    method: 'DELETE',
  });

  document.location.replace('/profile');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
