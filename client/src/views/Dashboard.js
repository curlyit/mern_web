import React from "react";
import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import DarkMode from "../components/layouts/ToggleSwitchDarkMode";

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
  } = useContext(PostContext);

  const groupedPosts = posts.reduce((acc, post) => {
    const { type } = post;
    acc[type] = acc[type] || [];
    acc[type].push(post);
    return acc;
  }, {});

  useEffect(() => {
    getPosts();
    // loadDarkMode();
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
        <div className="px-[15px]">
          {Object.entries(groupedPosts).map(([type, group]) => (
            <>
              <div className="flex items-center mt-8">
                <div className="inline-block mr-2 w-3 h-10 bg-[#867878] rounded-md"></div>
                <h2 className="inline-block text-2xl font-semibold text-[#161649] ">
                  {type}
                </h2>
              </div>
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
        </div>
      </>
    );
  }

  return (
    <>
      <DarkMode body={body} />
    </>
  );
};

export default Dashboard;
