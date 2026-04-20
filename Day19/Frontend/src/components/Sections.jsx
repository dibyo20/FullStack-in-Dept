import React from "react";
import Section2 from "./Section2.jsx";
import Section1 from "./Section1.jsx";

const Sections = ({data}) => {
  return (
    <div>
      <section>
        <h2>Section 1</h2>
        <Section1 />
      </section>
      <section>
        <h2>Section 2</h2>
        <Section2 data={data}/>
      </section>
    </div>
  );
};

export default Sections;
