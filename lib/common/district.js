const District = {
  getNameByCode(data, codes) {
    const result = [];
    let code = codes;

    if(!codes) return;

    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      result[0] = p.label;

      if (p.value === code) {
        return result[0];
      } else {
        if (!p.children) continue;
        for (let j = 0; j < p.children.length; j++) {
          const c = p.children[j];
          result[1] = c.label;

          if (c.value === code) {
            return result[1];
          } else {
            if (!c.children) continue;
            for (let k = 0; k < c.children.length; k++) {
              const a = c.children[k];
              result[2] = a.label;

              if (a.value === code) {
                return result[2];
              }
            }
          }
        }
      }
    }

    return '';
  },
  // 根据编号获取
  getAllCode(data, code) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      result[0] = p.value;

      if (p.value === code) {
        return [result[0], '', ''];
      } else {
        if (!p.children) continue;
        for (let j = 0; j < p.children.length; j++) {
          const c = p.children[j];
          result[1] = c.value;

          if (c.value === code) {
            return [result[0], result[1], ''];
          } else {
            if (!c.children) continue;
            for (let k = 0; k < c.children.length; k++) {
              const a = c.children[k];
              result[2] = a.value;

              if (a.value === code) {
                return [result[0], result[1], result[2]];
              }
            }
          }
        }
      }
    }

    return null;
  }
}

export default District;
