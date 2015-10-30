/// <reference path="../typings/node/node.d.ts"/>
var _ = require('underscore');

var json = {
    "id": null,
    "type": null,
    "title": null,
    "description": null,
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
    "comments": "{{ticket.comments_formatted}}",
    "tags": null
};

var ticketPlaceholders = {
    "account": null,
    "ccs": "{% for cc in ticket.ccs %}{{cc.email}} {% endfor %}",
    "created_at_with_timestamp": null,
    "due_date_with_timestamp": null,
    "external_id": null,
    "group.name": null,
    "id": null,
    "in_business_hours": null,
    "organization.name": null,
    "priority": null,
    "score": null,
    "status": null,
    "ticket_type": null,
    "title": null,
    "updated_at_with_timestamp": null,
    "url_with_protocol": null,
    "via": null,
    "satisfaction_score": "{{satisfaction.current_rating}}",
    "satisfaction_comment": "{{satisfaction.current_comment}}"
};

// used this to scrape the zendesk info page
// $.getScript("http://underscorejs.org/underscore-min.js")
// var prefix = 'ticket.';
// JSON.stringify(_.chain(items).filter(function(entry) {return (entry.innerText.match(/^ticket\./));}).map(function (item) {return item.innerText;}).reduce(function(memo, item) {memo[item.toString().slice(prefix.length)] = item.toString(); return memo;}, {}).value())
var jsonifier = function(sample, change) {
    var fields = [];
    for (var fieldName in sample) {
        var value = '{{ticket.'+fieldName + '}}';
        if (sample[fieldName] && typeof(sample[fieldName]) === 'string') {
            value = sample[fieldName];
        }
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
    var all = function (change) {return jsonifier(_.extend(json, ticketPlaceholders), change)};
    console.log(_.template(text)({all : all}));

});
