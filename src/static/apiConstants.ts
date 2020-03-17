
/** HTTP Status responses */
export enum HTTP_STATUS {
    OK = 200,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500

}

/**Path Param for fetching all teams data */
export const TEAMS_PATH_PARAM = "/teams";

/** Path Param for fetching one team's data */
export const TEAM_NAME_PATH_PARAM = "team_name";
