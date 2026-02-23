import { createContext } from 'react';

export interface TeamContextData {
    team: string[];
    addToTeam: (name: string) => void;
    removeFromTeam: (name: string) => void;
    isInTeam: (name: string) => boolean;
}

export const TeamContext = createContext<TeamContextData>({} as TeamContextData);
