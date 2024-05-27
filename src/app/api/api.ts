import axios from "axios";
import { API_ROUTES } from "../constants/api-routes";
import { IUser } from "../types/user.interface";
import { IGame } from "../types/game.interface";

export class Api {
  private static apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });

  public static async login(dto: any) {
    const { data } = await this.apiInstance.post(API_ROUTES.LOGIN, dto);
    return data;
  }

  public static async loginGoogle() {
    const { data } = await this.apiInstance.get(API_ROUTES.LOGIN_GOOGLE);
    return data;
  }

  public static async logout() {
    const { data } = await this.apiInstance.post(API_ROUTES.LOGOUT);
    return data;
  }
  public static async register(dto: any) {
    const { data } = await this.apiInstance.post(API_ROUTES.REGISTER, dto);
    return data;
  }

  public static async getUser(): Promise<IUser> {
    const { data } = await this.apiInstance.get<IUser>(API_ROUTES.USER);
    return data;
  }
  public static async changeUserPassword(dto: any) {
    const { data } = await this.apiInstance.post(
      API_ROUTES.USER_CHANGE_PASSWORD,
      dto
    );
    return data;
  }

  public static async forgotUserPassword(dto: any) {
    const { data } = await this.apiInstance.post(
      API_ROUTES.USER_FORGOT_PASSWORD,
      dto
    );
    return data;
  }
  public static async updateProfile(dto: any) {
    const { data } = await this.apiInstance.patch(API_ROUTES.PROFILE, dto);
    return data;
  }

  public static async uploadByDevice(photo: FormData) {
    const { data } = await this.apiInstance.post(
      API_ROUTES.UPLOAD_BY_DEVICE,
      photo,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return data;
  }

  public static async createRoom() {
    const { data } = await this.apiInstance.post(API_ROUTES.ROOM);
    return data;
  }

  public static async getRoom(link: string) {
    const { data } = await this.apiInstance.get(`${API_ROUTES.ROOM}/${link}`);
    return data;
  }

  public static async updateRoom(dto: any) {
    const { data } = await this.apiInstance.patch(
      `${API_ROUTES.ROOM}/${dto.link}`,
      { params: { level: dto.level } }
    );
    return data;
  }
  public static async createGame(dto: any) {
    const { data } = await this.apiInstance.post(API_ROUTES.GAME, dto);
    return data;
  }

  public static async getUserStatistics(): Promise<IGame[]> {
    const { data } = await this.apiInstance.get<IGame[]>(
      `${API_ROUTES.GAME}/user/statistics`
    );
    return data;
  }

  public static async getUsersGames(query: any) {
    const { data } = await this.apiInstance.get(
      `${API_ROUTES.GAME}/users/leaderboard`,
      { params: { ...query } }
    );
    return data;
  }

  public static async getGameByLink(link: string) {
    const { data } = await this.apiInstance.get(`${API_ROUTES.GAME}/${link}`);
    return data;
  }

  public static async updateGameByLink(link: string) {
    const { data } = await this.apiInstance.post(`${API_ROUTES.GAME}/${link}`);
    return data;
  }

  public static async addScore(dto: any) {
    const { data } = await this.apiInstance.post(`${API_ROUTES.SCORE}`, dto);
    return data;
  }

  public static async getScoreOfUser(link: string) {
    const { data } = await this.apiInstance.get(`${API_ROUTES.SCORE}/${link}`);
    return data;
  }

  public static async checkForResetPassword(dto: any) {
    const { data } = await this.apiInstance.get(
      `${API_ROUTES.RESET_PASSWORD}/${dto.id}/${dto.token}`
    );
    return data;
  }

  public static async resetPassword(dto: any) {
    const { data } = await this.apiInstance.post(
      `${API_ROUTES.RESET_PASSWORD}/${dto.id}/${dto.token}`,
      { newPassword: dto.newPassword }
    );
    return data;
  }
}
