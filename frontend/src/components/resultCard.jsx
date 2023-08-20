import { Card, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

import BoxCard from "./boxCard"
import ItemCard from "./itemCard"

function ResultCard({ props }) {
    return (
        <Card direction={{ base: "column", sm: "row" }} variant="outline" p="4">
            <HStack overflowX="scroll" spacing={2}>
                <BoxCard
                    props={{
                        box: props.box,
                    }}
                />
                {props.items.map((item) => (
                    <ItemCard
                        props={{
                            item: item,
                        }}
                    />
                ))}
            </HStack>
        </Card>
    )
}

export default ResultCard
