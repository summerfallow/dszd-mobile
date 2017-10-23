export default {
  handle: {
    getConfigName(template, value) {
      let name = '';

      template.forEach((item) => {
        if (item.value === value) name = item.name;
      });
      return name;
    },
    getDataSource(list) {
      const newList = list.map(item => ({
        value: item.value,
        label: item.name
      }));

      return newList;
    }
  }
};
