import React from "react";
import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  //context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  const groupedPosts = posts.reduce((acc, post) => {
    const { type } = post;
    acc[type] = acc[type] || [];
    acc[type].push(post);
    return acc;
  }, {});

  useEffect(() => {
    getPosts();
  }, [posts]);

  let body = null;

  if (postsLoading) {
    body = <div className="spinner-container"></div>;
  } else if (posts.length === 0) {
    body = (
      <>
        <div className="text-center mx-5 my-5">
          <div as="h1">Hi {username}</div>
          <div>
            <div>Welcome to React Web</div>
            <div>Click the button below to track fashion trend!</div>
            <button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              Fashion.
            </button>
          </div>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className="">
          {Object.entries(groupedPosts).map(([type, group]) => (
            <>
              <h2 className="text-xl font-semibold ml-2">{type}</h2>
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto mb-4"
                key={type}
              >
                {group.map((post) => (
                  <div key={post._id} className="my-2">
                    <SinglePost post={post} />
                  </div>
                ))}
              </div>
            </>
          ))}
          {/* {posts.map((post) => (
            <div key={post._id} className="my-2">
              <SinglePost post={post} />
            </div>
          ))} */}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mx-5">{body}</div>
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
    </>
  );
};

export default Dashboard;
