import React from "react";
import Register from "../Users/Register";
import PublicPosts from "../Posts/PublicPosts";

const backgroundStyle = {
  backgroundImage: `url(https://images.unsplash.com/photo-1607499699372-7bb722dff7e2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Homepage = () => {
  return (
    <>
      <section>
        <div className="flex items-center justify-center min-h-screen" style={backgroundStyle}>
          <Register />
        </div>
      </section>
      <section>
        <PublicPosts />
      </section>
    </>
  );
};

export default Homepage;

