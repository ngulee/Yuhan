import menuData from '../../mock/menuData.json';
import threePics from '../../mock/three_pic.json';


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
