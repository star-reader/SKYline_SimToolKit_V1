type EnrouteSource = {
    id: string,
    source: any
}

type EnrouteLayer = {
    layer: any,
    isBeforeId?: string
}

type EnrouteStyle = {
    basic:[],
    navdata: string[], // encrypted
    amm: string[], //encrypted,
    sources: EnrouteSource[]
}