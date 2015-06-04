var _ = require('underscore');

var json = {
    "id": 34,
    "type": "subject",
    "title": "Subject",
    "description": "This is the subject field of a ticket",
    "position": 21,
    "active": true,
    "required": true,
    "title_in_portal": "Subject",
    "requester_email": "{{ticket.requester.email}}",
    "assignee_email": "{{ticket.assignee.email}}",
    "submitter_email": "{{ticket.submitter.email}}",
    "current_user": "{{current_user.email}}",
    "tags": null
};

var ticketPlaceholders = {
    "account": "ticket.account",
    "ccs": "{% for cc in ticket.ccs %}{{cc.email}} {% endfor %}",
    "created_at_with_timestamp": "ticket.created_at_with_timestamp",
    "due_date_with_timestamp": "ticket.due_date_with_timestamp",
    "external_id": "ticket.external_id",
    "group.name": "ticket.group.name",
    "id": "ticket.id",
    "in_business_hours": "ticket.in_business_hours",
    "organization.name": "ticket.organization.name",
    "priority": "ticket.priority",
    "score": "ticket.score",
    "status": "ticket.status",
    "ticket_type": "ticket.ticket_type",
    "title": "ticket.title",
    "updated_at_with_timestamp": "ticket.updated_at_with_timestamp",
    "url_with_protocol": "ticket.url_with_protocol",
    "via": "ticket.via"
};

// used this to scrape the zendesk info page
// $.getScript("http://underscorejs.org/underscore-min.js")
// var prefix = 'ticket.';
// JSON.stringify(_.chain(items).filter(function(entry) {return (entry.innerText.match(/^ticket\./));}).map(function (item) {return item.innerText;}).reduce(function(memo, item) {memo[item.toString().slice(prefix.length)] = item.toString(); return memo;}, {}).value())
var jsonifier = function(sample) {
    var fields = [];
    for (var fieldName in sample) {
    	if (fieldName.indexOf('<') !== -1) continue;
        var value = '{{ticket.'+fieldName + '}}';
        if (sample[fieldName] && typeof(sample[fieldName]) === 'string' && (sample[fieldName].slice(0,2) === '{{' || sample[fieldName].slice(0,2) === '{%')) {
            value = sample[fieldName];
        }
        fields.push("\\\"" + fieldName + "\\\" : \\\"" + value +"\\\"");
    }
    return '{' + fields.join(',') + '}';
}

console.log(jsonifier(_.extend(json, ticketPlaceholders)));
