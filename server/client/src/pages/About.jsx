function About() {
  return (
    <div className="max-w-7xl mx-auto h-screen mb-20">
      <div className="m-4 rounded-lg lg:p-28 p-4 sm:p-10 shadow-lg mb-10 mt-20">
        <h1 className="text-3xl lg:text-6xl font-semibold uppercase">
          About tech blog
        </h1>
        <div className="text-gray-400">
          <h1 className="text-xl uppercase font-semibold mt-10">Our Mission</h1>
          <p className="text-xs sm:text-lg py-4 ">
            At TECH BLOGS, our mission is to provide a platform for sharing
            knowledge, insights, and experiences in the field of software and
            web development. We aim to empower developers, designers, and tech
            enthusiasts to learn, grow, and collaborate in a supportive
            community environment.
          </p>
        </div>

        <div className="text-gray-400"> 
          <h1 className="text-xl uppercase font-semibold mt-6">Objectives</h1>
          <ul className="list-disc px-8 mt-5 font-medium flex flex-col gap-4">
            <li>
              <span className="font-semibold">Technical Blogs: </span>Dive into
              our collection of technical blogs covering a wide range of topics,
              including front-end and back-end development, web design,
              programming languages, frameworks, tools, best practices, and
              industry trends.
            </li>
            <li>
              <span className="font-semibold">Thoughtful Discussions: </span>{" "}
              Engage in thoughtful discussions and exchange ideas with fellow
              developers from around the world. Share your expertise, ask
              questions, and explore new perspectives on various aspects of
              software development.
            </li>
            <li>
              <span className="font-semibold">Community Interaction: </span>
              Connect with like-minded individuals and foster meaningful
              relationships within our vibrant community. Collaborate on
              projects, participate in hackathons, and attend virtual events to
              expand your network and enhance your skills.
            </li>
          </ul>
        </div>

        <div className="w-full flex mt-20 justify-end text-gray-400">
          <p>Developed by - </p>
          <span className="text-base italic font-semibold pr-10 pl-3"> Basavaraj Mannangi</span>
        </div>
      </div>
    </div>
  );
}

export default About;
