const Normalize = {
  toConstantCase: function(str) {
    return str.toUpperCase().replace(/(\s|\-)/g, '_');
  },

  toDisplayName: function(str) {
    const parts = str.split('-');
    // replace first letter of each part
    return parts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ');
  },
  
  toSlug: function(str) {
    return str.toLowerCase().replace(/\s/g, '-');
  }
}

export default Normalize;