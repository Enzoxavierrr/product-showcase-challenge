import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { PokemonDetails } from '../types/pokemon';
import { getPokemonDetails } from '../services/pokemonService';

// cores para cada tipo de pokémon
const typeColors: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

function PokemonDetail() {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            if (!name) return;

            try {
                setLoading(true);
                const data = await getPokemonDetails(name);
                setPokemon(data);
            } catch (err) {
                setError('Erro ao carregar os detalhes do Pokémon.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, [name]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-2xl font-bold text-gray-400 animate-pulse">
                    Carregando...
                </p>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 gap-4">
                <p className="text-xl text-red-500">{error || 'Pokémon não encontrado.'}</p>
                <Link to="/" className="text-blue-400 hover:underline">
                    ← Voltar para a Pokédex
                </Link>
            </div>
        );
    }

    const officialImage = pokemon.sprites.other['official-artwork'].front_default;

    return (
        <div className="min-h-screen bg-gray-900 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                {/* botão voltar */}
                <Link
                    to="/"
                    className="inline-block text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    ← Voltar para a Pokédex
                </Link>

                {/* card principal */}
                <div className="bg-gray-800 rounded-3xl p-8 flex flex-col items-center gap-6">
                    <span className="text-gray-500 text-lg">
                        #{String(pokemon.id).padStart(3, '0')}
                    </span>

                    {officialImage && (
                        <img
                            src={officialImage}
                            alt={pokemon.name}
                            className="w-64 h-64 object-contain"
                        />
                    )}

                    {/* nome */}
                    <h1 className="text-4xl font-bold text-white capitalize">
                        {pokemon.name}
                    </h1>

                    {/* tipos */}
                    <div className="flex gap-3">
                        {pokemon.types.map((t) => (
                            <span
                                key={t.type.name}
                                className="px-4 py-1 rounded-full text-white text-sm font-semibold capitalize"
                                style={{ backgroundColor: typeColors[t.type.name] || '#777' }}
                            >
                                {t.type.name}
                            </span>
                        ))}
                    </div>

                    {/* altura e peso */}
                    <div className="flex gap-12 mt-4">
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">Altura</p>
                            <p className="text-white text-2xl font-bold">
                                {(pokemon.height / 10).toFixed(1)} m
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">Peso</p>
                            <p className="text-white text-2xl font-bold">
                                {(pokemon.weight / 10).toFixed(1)} kg
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
