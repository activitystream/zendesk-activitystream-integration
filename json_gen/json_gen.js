/// <reference path="../typings/node/node.d.ts"/>
var _ = require('underscore');

var json = {
    "id": null,
    "type": null,
    "title": null,
    "position": null,
    "active": null,
    "required": null,
    "title_in_portal": null,
    "requester_email": "{{ticket.requester.email}}",
    "assignee_email": "{{ticket.assignee.email}}",
    "submitter_email": "{{ticket.submitter.email}}",
    "current_user": "{{current_user.email}}",
    "custom_fields": "{% for item in ticket.organization.custom_fields %}{{ item[0] }}:{{ item[1] }}{% endfor %}",
    "ticket_custom_fields": "{% for item in ticket.custom_fields %}{{ item[0] }}:{{ item[1] }}{% endfor %}",
    "requester_custom_fields": "{% for item in ticket.requester.custom_fields %}{{ item[0] }}:{{ item[1] }}{% endfor %}",
    "comments": "[ {% for comment in ticket.comments %} {"+
   "\\\"created_at\\\" : \\\"{{comment.created_at}}\\\","+
   "\\\"created_at_with_time\\\" : \\\"{{comment.created_at_with_time}}\\\","+
   "\\\"name\\\" : \\\"{{comment.author.name}}\\\","+
   "\\\"value\\\" : \\\"{{comment.value}}\\\","+

   "\\\"attachments\\\" : [ {% for attachment in comment.attachments %}"+
   "{ \\\"filename\\\" : \\\"{{attachment.filename}}\\\","+
   " \\\"url\\\" : \\\"{{attachment.url}}\\\" \} "+

   "{% unless forloop.last %} , {% endunless %} {% endfor %} ]"+

"} {% unless forloop.last %} , {% endunless %}"+ 
"{% endfor %} ]" ,
    "tags": null,
    "account": null,
    "ccs": "{% for cc in ticket.ccs %}{{cc.email}} {% endfor %}",
    "created_at_with_timestamp": null,
    "due_date_with_timestamp": null,
    "external_id": null,
    "group.name": null,
    "in_business_hours": null,
    "organization.name": null,
    "priority": null,
    "score": null,
    "status": null,
    "ticket_type": null,
    "updated_at_with_timestamp": null,
    "url_with_protocol": null,
    "via": null,
    "satisfaction_comment": "{{satisfaction.current_comment}}",
    "_v" : "1.3.2"
};

var jsonifier = function(sample, change) {
    var fields = [];
    for (var fieldName in sample) {
        var value = '{{ticket.'+fieldName + '}}';
        if (sample[fieldName] && typeof(sample[fieldName]) === 'string') {
            value = sample[fieldName];
        }
        if (value.charAt(0) === '[')
            fields.push("\\\"" + fieldName + "\\\" : " + value);
        else
            fields.push("\\\"" + fieldName + "\\\" : \\\"" + value +"\\\"");
    }
    fields.push("\\\"_as_event\\\" : \\\"" + change +"\\\"")
    return '{' + fields.join(',') + '}';
}
var text = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (chunk) {
    text += chunk;
});

process.stdin.on('end', function () {
    var allWithComments = function (change, props) {
        var all = JSON.parse(JSON.stringify(json));
        if (props) all = _.assign(all, props);
        return jsonifier(all, change)
    };
    var all = function (change, props) {
        var all = JSON.parse(JSON.stringify(json));
        delete all.comments;
        if (props) all = _.assign(all, props);
        return jsonifier(all, change)
    };
    console.log(_.template(text)({all : all, allWithComments : allWithComments}));

});
