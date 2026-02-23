import { useContext } from 'react';
import { TeamContext } from '../contexts/teamContextDef';

// hook personalizado para usar o contexto do time
export function useTeam() {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam deve ser usado dentro de um TeamProvider');
    }
    return context;
}
