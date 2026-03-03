import MacroprocesoManagementClient from "@/components/MacroprocesoManagementClient";
import { criteriosGim, GRUPO_LABELS_GIM } from "./data";

export default function GestionInsumosClient() {
    return (
        <MacroprocesoManagementClient
            criterios={criteriosGim}
            grupoLabels={GRUPO_LABELS_GIM}
            lsStateKey="gim_criteria_state"
            lsLeaderKey="gim_leader_info"
        />
    );
}
