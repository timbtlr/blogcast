module.exports = 
<% constants.forEach(function(constant) { %>${indent} ${constant.value}<%= _.last(constants) === constant ? '' : '\n' %><% }) %>
