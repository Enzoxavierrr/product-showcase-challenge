import api from './api';
import type { PokemonListResponse, PokemonDetails } from '../types/pokemon';

// tempo de validade do cache da lista (1 hora em milissegundos)
const CACHE_DURATION = 60 * 60 * 1000;

// busca a lista de Pokémon, usando cache do localStorage
export async function getPokemonList(): Promise<PokemonListResponse> {
    const cacheKey = 'pokemon-list-cache';
    const cacheTimeKey = 'pokemon-list-cache-time';

    // verifica se há cache válido
    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    if (cached && cachedTime) {
        const elapsed = Date.now() - Number(cachedTime);
        if (elapsed < CACHE_DURATION) {
            return JSON.parse(cached) as PokemonListResponse;
        }
    }

    // sem cache ou expirado, busca da API
    const response = await api.get<PokemonListResponse>('/pokemon', {
        params: { limit: 151 },
    });

    // salva no cache
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    localStorage.setItem(cacheTimeKey, String(Date.now()));

    return response.data;
}

// busca detalhes de um Pokémon, usando cache do localStorage
export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
    const cacheKey = `pokemon-detail-${name}`;

    // verifica se há cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        return JSON.parse(cached) as PokemonDetails;
    }

    // sem cache, busca da API
    const response = await api.get<PokemonDetails>(`/pokemon/${name}`);

    // salva no cache (detalhes não expiram, dados de pokémon não mudam)
    localStorage.setItem(cacheKey, JSON.stringify(response.data));

    return response.data;
}

// extrai o ID do Pokémon a partir da URL que é retornada pela lista,
// no caso o número que esta no final da url
export function getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
}

// monta a URL da imagem oficial a partir do seu ID
// essa é a solução para o problema de a lista não retornar imagens.
export function getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
