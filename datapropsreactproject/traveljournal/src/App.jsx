import Header from "./components/Header";
import Entry from "./components/Entry";
import travelData from "./data";

function App() {
  const entryElements = travelData.map((data) => {
    return (
      <Entry
        key={data.id}
        {...data}
      />
    );
  });

  return (
    <>
      <Header />
      {entryElements}
    </>
  );
}

export default App;
