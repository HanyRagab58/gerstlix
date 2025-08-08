import {ArizonaGames, ProjectType} from "./constants";

export interface GerstlixOptions {
    token: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
}

export type server = typeof ArizonaGames[number];
export type project = typeof ProjectType[number];
