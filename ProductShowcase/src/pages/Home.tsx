import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PokemonListItem } from '../types/pokemon';
import { getPokemonList, getPokemonIdFromUrl, getPokemonImageUrl } from '../services/pokemonService';

function Home() {
    const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    // filtra a lista de pokémon com base no texto digitado
    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        async function fetchPokemons() {
            try {
                setLoading(true);
                const data = await getPokemonList();
                setPokemons(data.results);
            } catch (err) {
                setError('Erro ao carregar a lista de Pokémon.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemons();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-2xl font-bold text-gray-400 animate-pulse">
                    Carregando Pokémon...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 px-6 md:px-10 lg:px-16 py-8">
            <h1 className="text-4xl font-bold text-center text-white mb-8">
                Pokédex
            </h1>

            {/* input de busca */}
            <div className="max-w-md mx-auto mb-16">
                <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                {filteredPokemons.map((pokemon) => {
                    const id = getPokemonIdFromUrl(pokemon.url);
                    const imageUrl = getPokemonImageUrl(id);

                    return (
                        <Link
                            to={`/pokemon/${pokemon.name}`}
                            key={pokemon.name}
                            className="bg-gray-800 rounded-2xl p-5 flex flex-col items-center gap-2 hover:bg-gray-700 hover:scale-105 transition-all duration-200 cursor-pointer"
                        >
                            <span className="text-xs text-gray-500 self-end mr-1">
                                #{String(id).padStart(3, '0')}
                            </span>
                            <img
                                src={imageUrl}
                                alt={pokemon.name}
                                className="w-24 h-24 object-contain"
                                loading="lazy"
                            />
                            <p className="text-white font-medium capitalize text-sm">
                                {pokemon.name}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
