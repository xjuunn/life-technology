const base = "/livekit/live";

// 直播房间类型
export enum LiveRoomType {
  'liveroom', // 直播间
  'voiceroom', // 语聊房
}

export interface LiveListRequest {
  type?: LiveRoomType;
  page?: number;
  pageSize?: number;
}

export function list(data?: LiveListRequest) {
  return appApi.get(base + '/list', data);
}