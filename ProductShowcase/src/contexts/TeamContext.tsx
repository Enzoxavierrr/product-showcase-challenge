import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { TeamContext } from './teamContextDef';
export type { TeamContextData } from './teamContextDef';
export { TeamContext } from './teamContextDef';

// limite máximo de pokémon no time
const MAX_TEAM_SIZE = 6;

interface TeamProviderProps {
    children: ReactNode;
}

export function TeamProvider({ children }: TeamProviderProps) {
    const [team, setTeam] = useState<string[]>(() => {
        // recupera o time do localStorage ao iniciar
        const saved = localStorage.getItem('pokemon-team');
        return saved ? JSON.parse(saved) : [];
    });

    // salva no localStorage sempre que o time mudar
    useEffect(() => {
        localStorage.setItem('pokemon-team', JSON.stringify(team));
    }, [team]);

    function addToTeam(name: string) {
        if (team.length >= MAX_TEAM_SIZE) {
            alert(`Seu time já tem ${MAX_TEAM_SIZE} Pokémon! Remova um antes de adicionar outro.`);
            return;
        }

        if (!team.includes(name)) {
            setTeam((prev) => [...prev, name]);
        }
    }

    function removeFromTeam(name: string) {
        setTeam((prev) => prev.filter((p) => p !== name));
    }

    function isInTeam(name: string): boolean {
        return team.includes(name);
    }

    return (
        <TeamContext.Provider value={{ team, addToTeam, removeFromTeam, isInTeam }}>
            {children}
        </TeamContext.Provider>
    );
}
