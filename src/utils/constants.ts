export const ArizonaRP = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;
export const ArizonaMobile = [101, 102, 103] as const;
export const RodinaRP = [201, 202, 203, 204, 205, 206, 207] as const;
export const RodinaMobile = [301] as const;

export const ArizonaGames = [
    ...ArizonaRP,
    ...ArizonaMobile,
    ...RodinaRP,
    ...RodinaMobile,
] as const;

export const ProjectType = ["arz", "marz", "rrp"] as const;

export const API = "https://api2.gerstlix.com/v1";
