import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>
)
