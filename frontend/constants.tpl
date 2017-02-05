{% constants.forEach(function (constant) { %}
{%= constant.value %}
{% }); values.forEach(function (value) { %}
.value('{%- value.name %}', {%= value.value %})
{% }) %}