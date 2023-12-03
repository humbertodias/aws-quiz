import AlternativeState from "./AlternativeState"

type AlternativeProps = {
    index: number,
    statement: string,
    state: AlternativeState,
    onClick: (index: number) => void 
}

export default AlternativeProps