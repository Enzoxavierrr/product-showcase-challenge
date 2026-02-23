// interface para cada item retornado na lista de Pokémon


// endpoint: /api/v2/pokemon?limit=151
export interface PokemonListItem {
    name: string;
    url: string;
}

// interface para a resposta completa da lista
export interface PokemonListResponse {
    count: number;
    results: PokemonListItem[];
}

// interface para o tipo do Pokémon (ex: "electric", "fire")
export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

// interface para os sprites/imagens do Pokémon
export interface PokemonSprites {
    front_default: string | null;
    other: {
        'official-artwork': {
            front_default: string | null;
        };
    };
}

// interface para os detalhes completos do Pokémon
// endpoint: /api/v2/pokemon/{name}
export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    sprites: PokemonSprites;
}
