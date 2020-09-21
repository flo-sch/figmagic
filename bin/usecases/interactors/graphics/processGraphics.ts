import { FRAME as Frame } from '../../../contracts/Figma';
import { Config } from '../../../contracts/Config';
import { FileList } from '../../../contracts/FileList';
import { ImageResponse } from '../../../contracts/ImageResponse';

import { getIds } from './getIds';
import { getIdString } from './getIdString';
import { getFileList } from './getFileList';

import { getFromApi } from '../../../frameworks/network/getFromApi';

import {
  ErrorProcessGraphics,
  ErrorProcessGraphicsImageError,
  ErrorProcessGraphicsNoImages
} from '../../../frameworks/errors/errors';

/**
 * @description Download all image assets from Figma page
 */
export async function processGraphics(graphicsPage: Frame[], config: Config): Promise<FileList[]> {
  if (!graphicsPage) throw new Error(ErrorProcessGraphics);

  const { token, url, outputFormatGraphics, outputScaleGraphics } = config;
  if (!token) throw new Error(ErrorProcessGraphics);
  if (graphicsPage.length === 0 || !graphicsPage[0].children) throw new Error(ErrorProcessGraphics);

  const IDS = getIds(graphicsPage);
  const SETTINGS = `&scale=${outputScaleGraphics}&format=${outputFormatGraphics}`;
  const URL = `${url}?ids=${getIdString(IDS)}${SETTINGS}`;

  const IMAGE_RESPONSE: ImageResponse = await getFromApi(token, URL, 'images');
  if (IMAGE_RESPONSE.err) throw new Error(ErrorProcessGraphicsImageError);
  if (!IMAGE_RESPONSE.images) throw new Error(ErrorProcessGraphicsNoImages);

  return getFileList(IMAGE_RESPONSE, IDS, outputFormatGraphics);
}
