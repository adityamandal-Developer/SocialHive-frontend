import React from "react";
const UserPosts = ({ posts }) => {
  return (
    <section className="relative py-24 bg-blue">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
        }}
      />
      <div className="container relative z-10 px-4 mx-auto">
        <div className="mx-auto mb-8 text-center md:max-w-5xl md:mb-16">
          <span className="inline-block px-2 text-gold py-px mb-4 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm">
            Your Posts
          </span>
          <h3 className="mb-4 text-3xl text-gold font-bold leading-tight tracking-tighter md:text-5xl text-darkCoolGray-900">
            Posts {posts?.length}
          </h3>
        </div>

        <div className="flex flex-wrap mb-12 -mx-4 md:mb-20">
          {posts?.map((post) => {
            return (
              <>
                <div className="w-full px-4 mb-8 md:w-1/2">
                  <a className="block mb-6 overflow-hidden rounded-md" href="#">
                    <img
                      className="w-full"
                      src={post?.image}
                      alt={post?.tile}
                    />
                  </a>
                  <div className="mb-4">
                    <a
                      className="inline-block px-3 py-1 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm hover:text-green-600 hover:bg-green-200"
                      href="#"
                    >
                      {post?.category?.name}
                    </a>
                  </div>
                  <p className="mb-2 font-medium text-gold text-coolGray-500">
                    {new Date(post?.createdAt).toDateString()}
                  </p>
                  <a
                    className="inline-block mb-4 text-2xl text-gold font-bold leading-tight md:text-3xl text-coolGray-800 hover:text-coolGray-900 hover:underline"
                    href="#"
                  >
                    {post?.title}
                  </a>
                  <p className="mb-6 text-lg font-medium text-gold text-coolGray-500">
                    {post?.content}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserPosts;
