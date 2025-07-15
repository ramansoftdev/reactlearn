const MainContent = () => {
  return (
    <>
      {/* <WhatIsReact /> */}
      <WhyReact />
    </>
  );
};

const WhatIsReact = () => {
  return (
    <>
      <h2> fun facs about react!!</h2>
      <ul>
        <li>react was released in 2013</li>
        <li>maintained by meta(facebook)</li>
        <li>react is declarative and composable</li>
        <li>its a library</li>
      </ul>
    </>
  );
};

const WhyReact = () => {
  return (
    <>
      <h3> why i am learning React!</h3>

      <ol>
        <li> want to be appy for maximu number of startup jobs</li>
        <li>
          {" "}
          needed a tool that will enable me to implement most self projects
        </li>
        <li> optionally open to start my own venture 😎 !</li>
      </ol>
    </>
  );
};

export default MainContent;
