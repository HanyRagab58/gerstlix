import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { stringify as stringifyQuery } from "qs";

import {
    GerstlixOptions,
    ApiResponse,
    server as ServerId,
    server as ArzServerId,
    project as ProjectId,
} from "../utils/types";

import {
    ArizonaGames,
    ArizonaRP,
    ProjectType,
    API,
} from "../utils";

import { GerstlixError, ValidationError } from "../errors";

export class Gerstlix {
    private token: string;
    private axios: AxiosInstance;

    constructor(options: GerstlixOptions, axiosConfig: CreateAxiosDefaults = {}) {
        if (!options.token) throw new ValidationError("Token is required");
        this.token = options.token;

        this.axios = axios.create({
            ...axiosConfig,
            paramsSerializer: (params) =>
                stringifyQuery(params, { arrayFormat: "brackets" }),
        });

        this.axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    throw new GerstlixError(
                        `API Error: ${error.response.status} ${error.response.statusText}`
                    );
                } else if (error.request) {
                    throw new GerstlixError("No response from server");
                }
                throw error;
            }
        );
    }

    private validateServer(server: number, arzOnly = false) {
        if (typeof server !== "number") {
            throw new ValidationError("Server must be a number");
        }
        const list = arzOnly ? ArizonaRP : ArizonaGames;
        if (!list.includes(server as any)) {
            throw new ValidationError(`Server ${server} is not in the approved list`);
        }
    }

    private validateProject(project: string) {
        if (typeof project !== "string") {
            throw new ValidationError("Project must be a string");
        }
        if (!ProjectType.includes(project as any)) {
            throw new ValidationError(
                `Invalid project. Use one of: ${ProjectType.join(", ")}`
            );
        }
    }

    private async request<T>(
        endpoint: string,
        params: Record<string, any>
    ): Promise<ApiResponse<T>> {
        const response = await this.axios.get<ApiResponse<T>>(
            `${API}/${endpoint}/`,
            { params: { token: this.token, ...params } }
        );
        return response.data;
    }

    getInfo(server: ServerId) {
        this.validateServer(server);
        return this.request("server.getInfo", { server });
    }

    getGhettoMap(server: ServerId) {
        this.validateServer(server);
        return this.request("game.getGhettoMap", { server });
    }

    getMembers(server: ArzServerId, fractionId: number) {
        this.validateServer(server, true);
        if (typeof fractionId !== "number") {
            throw new ValidationError("fractionId must be a number");
        }
        return this.request("game.getMembers", { server, fraction: fractionId });
    }

    getOldPlayers(server: ServerId) {
        this.validateServer(server);
        return this.request("game.getOldPlayers", { server });
    }

    getRichPlayers(server: ServerId) {
        this.validateServer(server);
        return this.request("game.getRichPlayers", { server });
    }

    getDeputy(server: ServerId, fractionId: number) {
        this.validateServer(server);
        if (typeof fractionId !== "number") {
            throw new ValidationError("fractionId must be a number");
        }
        return this.request("server.getDeputy", { server, fraction: fractionId });
    }

    getDeputyList(server: ServerId) {
        this.validateServer(server);
        return this.request("server.getDeputyList", { server });
    }

    getLeader(server: ServerId, fractionId: number) {
        this.validateServer(server);
        if (typeof fractionId !== "number") {
            throw new ValidationError("fractionId must be a number");
        }
        return this.request("server.getLeader", { server, fraction: fractionId });
    }

    getLeadersList(server: ServerId) {
        this.validateServer(server);
        return this.request("server.getLeadersList", { server });
    }

    getMinister(server: ServerId, fractionId: number) {
        this.validateServer(server);
        if (typeof fractionId !== "number") {
            throw new ValidationError("fractionId must be a number");
        }
        return this.request("server.getMinister", { server, fraction: fractionId });
    }

    getMinistersList(server: ServerId) {
        this.validateServer(server);
        return this.request("server.getMinistersList", { server });
    }

    getRecordFraction(server: ServerId, fractionId: number) {
        this.validateServer(server);
        if (typeof fractionId !== "number") {
            throw new ValidationError("fractionId must be a number");
        }
        return this.request("server.getRecord", { server, fraction: fractionId });
    }

    getRecords(server: ServerId) {
        this.validateServer(server);
        return this.request("server.getRecords", { server });
    }

    getStatus(project: ProjectId) {
        this.validateProject(project);
        return this.request("server.getStatus", {});
    }

    getPlayer(server: ServerId, player: string) {
        this.validateServer(server);
        if (typeof player !== "string") {
            throw new ValidationError("Player must be a string");
        }
        return this.request("game.getPlayer", { server, player });
    }

    getAdminsList(server: ServerId) {
        this.validateServer(server);
        return this.request("server.getAdminsList", { server });
    }

    geoIp(ip: string) {
        if (typeof ip !== "string" || !ip) throw new ValidationError("IP is required");
        return this.request("utils.geoIp", { ip });
    }
}