import { Card, HStack, Grid, GridItem } from "@chakra-ui/react"

import BoxCard from "./boxCard"

function ResultCard({ props }) {
    return (
        <Card direction={{ base: "column", sm: "row" }} variant="outline" p="4">
            <HStack overflowX="scroll" spacing={2}>
                {props.boxes.map((box) => (
                    <BoxCard
                        props={{
                            box: box,
                            handleBoxDelete: props.handleBoxDelete,
                        }}
                    />
                ))}
            </HStack>
        </Card>
    )
}

export default ResultCard
