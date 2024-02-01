// Function created that allows users to delete a post the dashboard page, then redirects them to an updated dashboard
const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log("clicked button");
    console.log(event.target);

    let postId = event.target.getAttribute("data-id");
    console.log(postId);
    
    const response = await fetch('/api/post/${postId}', {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.assign(`/dashboard`);
    } else {
        alert(response.statusText);
    }
};