import React, { useState, useEffect } from "react";
import BinCanvas from "./components/BinCanvas";
import axios from "axios";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import BoxTab from "./components/boxTab.js";
const boxes3d = [
  {
    transparent: true,
    position: [0, 0, 0],
    size: [5, 5, 5],
    color: "grey",
    id: 1,
  },
  {
    transparent: false,
    position: [0, 0, 0],
    size: [1, 1, 1],
    color: "red",
    id: 2
  },
];

function App() {
  //Data from backend
  const [data, setData] = useState([]);
  const [boxes, setBoxes] = useState([]);

  const handleBoxSubmit = (event, width, length, height, name, id) => {
    event.preventDefault();
    setBoxes((prevBoxes) => [
      ...prevBoxes,
      {
        width: width,
        length: length,
        height: height,
        name: name,
        id: id,
      },
    ]);
    console.log(boxes);
  };

  const handleBoxDelete = (id) => {
    setBoxes((prevBoxes) => prevBoxes.filter((v) => v.id !== id));
  };

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("http://127.0.0.1:5000/listusers").then(function (response) {
      // console.log(response.data);
      setData(response.data);
    });
  }

  function getDatas() {
    axios.get("http://127.0.0.1:5000/listusers").then(function (response) {
      console.log(response.data);
      setData(response.data);
    });
  }

  const [inputs, setInputs] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(inputs);

    await axios
      .post("http://127.0.0.1:5000/useradd", inputs)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      });
  };

  return (
    <Box maxHeight="100vh" height="100vh">
      {data}
      <Tabs height="100%">
        <TabList height="auto">
          <Tab>Scan Item</Tab>
          <Tab>Input Box</Tab>
          <Tab>View Results</Tab>
        </TabList>

        <TabPanels height="100%">
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel height="100%">
            <BoxTab
              props={{
                boxes: boxes,
                handleBoxSubmit: handleBoxSubmit,
                handleBoxDelete: handleBoxDelete,
              }}
            />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box>
        <BinCanvas boxes={boxes3d} />
        {/* <form onSubmit={handleSubmit}>
                    <div>Submit photo here</div>
                    <input onChange={handleChange} />
                    <button type="submit">Add</button>
                </form> */}
      </Box>
    </Box>
  );
}

export default App;
