import menuData from '../../mock/menuData.json';
import threePics from '../../mock/three_pic.json';
import fourPics from '../../mock/four_pic.json';
import onePics from '../../mock/one_pic.json';


export const fetchHeaderNavs = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menuData)
    }, 100);
  });
}

export const fetchTreePics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(threePics)
    }, 100);
  });
}

export const fetchFourPics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fourPics)
    }, 100);
  });
}

export const fetchOnePics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(onePics)
    }, 100);
  });
}

