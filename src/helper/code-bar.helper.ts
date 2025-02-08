import * as bwipjs from 'bwip-js';

export const generateCodeBar = async (data: bwipjs.RenderOptions) => {
  const buffer = await bwipjs.toBuffer(data);
  return buffer;
};
