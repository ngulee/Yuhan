export const getFormattedMenu = (sourceNavs = [], formatedNavs = [], level = 0) => {
  if (level > 1) return formatedNavs;
  sourceNavs.forEach((sourceNav) => {
    const { taxonomyName, parentTaxonomyPath = '', children } = sourceNav;
    const options = {
      taxonomyName,
      parentTaxonomyPath
    };
    if(level === 1) {
      Object.assign(options, {
        children
      })
    }
    formatedNavs.push(options);
    return getFormattedMenu(children, formatedNavs, level + 1)
  })

  return formatedNavs;
}

export const getMenuItemChildren = (sourceNavs, parentTaxonomyPath) => {
  const { children } = sourceNavs;
  return children.find((item) => item.parentTaxonomyPath === parentTaxonomyPath);
}

export const filtersSubmenu = (submen = []) => {
  return submen.filter(item => item.children.length > 0);
}

export const childrenDivideIntoGroups = (children, groupCount = 10) => {
  const result = [];

  for(let i = 0; i < children.length; i++) {
    // let rowCount = i % groupCount;
    let columnCount = Math.floor(i / groupCount);
    
    if (!result[columnCount]) {
      result[columnCount] = []
    }
    result[columnCount].push(children[i]);
  }

  return result;
}