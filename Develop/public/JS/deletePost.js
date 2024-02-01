// Function created allowing user to delete post from the individual post page
const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log("clicked the button");
    console.log(event.target);

    let post = window.location.pathname.split("/");
    console.log(post);

    const response = await fetch(`/api/post/${post[2]}`, {
        method: "DELETE",
    });
    if (response.ok) {
        document.location.assign(`/dashboard`);
    } else {
        alert(response.statusText);
    }
};