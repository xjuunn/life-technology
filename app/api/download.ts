const base = "/downloads";

export type Platform = "android" | "ios" | "windows" | "macos" | "linux";

export interface DownloadLinkItem {
  id: number;
  platform: Platform;
  name: "lifeapp" | string;
  version: null | number | string;
  downloadUrl: string;
  description: null | string;
  fileSize: null | string;
  sortOrder: number;
}

/**
 * 获取app下载链接
 * @param platform 平台信息
 */
export function links(platform: Platform) {
  return api.get<{ downloads: DownloadLinkItem[] }>(base, { platform });
}

/**
 * 记录下载次数
 * @param id 下载链接ID
 */
export function increaseDownloadsNumber(id: number) {
  return api.post<{ message: string, downloadUrl: string }>(base + `/${id}/track`);
}