import React from "react"
import { Dropdown } from "./components/Dropdown"
import "./styles/App.scss"

const items = [
  {
    id: 1,
    value: "Pulp Fiction",
  },
  {
    id: 2,
    value: "The Prestige",
  },
  {
    id: 3,
    value: "Blade Runner 2049",
  },
]

const App = () => {
  return (
    <div className="container">
      <Dropdown
        items={items}
        title={"Select your options"}
        multiSelect={true}
        onSelect={(value: any) => console.log(value.value)}
      />
    </div>
  )
}

export default App
