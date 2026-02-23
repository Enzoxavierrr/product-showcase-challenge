import api from './api';
import type { PokemonListResponse, PokemonDetails } from '../types/pokemon';

// busca a toda a lista de Pokémon, no caso com 151
export async function getPokemonList(): Promise<PokemonListResponse> {
    const response = await api.get<PokemonListResponse>('/pokemon', {
        params: { limit: 151 },
    });
    return response.data;
}

// busca todos detalhes de um Pokémon pelo seu nome
export async function getPokemonDetails(name: string): Promise<PokemonDetails> {
    const response = await api.get<PokemonDetails>(`/pokemon/${name}`);
    return response.data;
}

// extrai o ID do Pokémon a partir da URL que é retornada pela lista,
// no caso o número que esta no final da url
export function getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]); // 
}

// monta a URL da imagem oficial a partir do seu ID
// essa é a solução para o problema de a lista não retornar imagens.
export function getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
