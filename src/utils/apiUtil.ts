import { Team } from "../core/football";
import MismatchParametersError from "../errors/mismatchParametersError";

export  default {
    
    validateTeamPayload(payloadTeam: any): Team {
        if(payloadTeam.name && payloadTeam.img) {
            return payloadTeam as Team;
        }
        else {
            throw new MismatchParametersError('Expected team properties not received.');
        }
    }

};
